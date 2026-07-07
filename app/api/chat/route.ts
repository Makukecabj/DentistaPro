import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getServiceSupabase } from "@/lib/supabaseClient";

// Horarios disponibles - configurables desde .env o usan valores por defecto
const DIAS_ATENCION = (process.env.DIAS_ATENCION || "1,2,3,4,5").split(",").map(Number);
const HORA_INICIO = parseInt(process.env.HORA_INICIO || "9");
const HORA_FIN = parseInt(process.env.HORA_FIN || "19");
const DURACION_TURNOS = parseInt(process.env.DURACION_TURNOS || "30");

function generarHorarios(): string[] {
  const horarios: string[] = [];
  for (let h = HORA_INICIO; h < HORA_FIN; h++) {
    for (let m = 0; m < 60; m += DURACION_TURNOS) {
      const hora = h.toString().padStart(2, "0");
      const min = m.toString().padStart(2, "0");
      horarios.push(`${hora}:${min}`);
    }
  }
  return horarios;
}

const HORARIOS = generarHorarios();

async function consultarHorarios(fecha: string): Promise<string[]> {
  try {
    const supabase = getServiceSupabase();
    const { data: turnos } = await supabase
      .from("turnos")
      .select("hora")
      .eq("fecha", fecha)
      .neq("estado", "cancelado");
    const ocupados = new Set((turnos ?? []).map((t) => String(t.hora).slice(0, 5)));
    return HORARIOS.filter((h) => !ocupados.has(h));
  } catch {
    return HORARIOS;
  }
}

async function guardarTurno(params: {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  servicio?: string;
}) {
  const supabase = getServiceSupabase();
  const { error } = await supabase.from("turnos").insert({
    nombre: params.nombre,
    telefono: params.telefono,
    fecha: params.fecha,
    hora: params.hora,
    servicio: params.servicio ?? null,
    estado: "pendiente",
  });
  if (error) throw new Error("No se pudo guardar el turno");
  return { ok: true };
}

// ----- Helpers de parseo para el fallback -----
function extraerDatos(mensajes: { role: string; content: string }[]) {
  const userMsgs = mensajes.filter((m) => m.role === "user").map((m) => m.content);
  const texto = userMsgs.join(" | ");
  const fecha = texto.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? null;
  const hora = texto.match(/\b([01]\d|2[0-3]):[0-5]\d\b/)?.[0] ?? null;
  const telefono = texto.match(/(?:\+?\d[\d\s()-]{7,}\d)/)?.[0]?.replace(/[\s()-]/g, "") ?? null;
  const nombre = userMsgs.find((m) => m.toLowerCase().includes(" ") && m.length > 3 && !/\d{4}-\d{2}-\d{2}/.test(m) && !/\d{2}:\d{2}/.test(m) && !/(turno|hola|si|no|quiero|gracias|confirm)/i.test(m)) ?? null;
  return { fecha, hora, telefono, nombre };
}

// ----- Definición de tools para function calling -----
const TOOLS: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "consultar_horarios_disponibles",
      description:
        "Consulta los horarios reales disponibles para una fecha dada (formato AAAA-MM-DD). Devuelve una lista de horarios libres.",
      parameters: {
        type: "object",
        properties: {
          fecha: { type: "string", description: "Fecha en formato AAAA-MM-DD" },
        },
        required: ["fecha"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "guardar_turno",
      description:
        "Guarda un turno en la base de datos con los datos del paciente. Usar solo cuando se tengan DIA, HORA, NOMBRE y TELÉFONO confirmados.",
      parameters: {
        type: "object",
        properties: {
          nombre: { type: "string" },
          telefono: { type: "string" },
          fecha: { type: "string", description: "Fecha en formato AAAA-MM-DD" },
          hora: { type: "string", description: "Hora en formato HH:MM" },
          servicio: { type: "string" },
        },
        required: ["nombre", "telefono", "fecha", "hora"],
      },
    },
  },
];

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const userMessage = messages[messages.length - 1]?.content || "";

    // --- MODO CON IA (Groq o OpenAI) con function calling ---
    const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
    if (apiKey) {
      try {
        const isGroq = !!process.env.GROQ_API_KEY;
        const client = new OpenAI({
          apiKey: apiKey,
          baseURL: isGroq ? "https://api.groq.com/openai/v1" : undefined,
        });

        const systemPrompt = `Sos el asistente virtual de "Estudio Dental Aguirre", un consultorio odontológico. Siempre hablá en español argentino, de forma amable, clara y profesional. Tu trabajo es ayudar a los pacientes a reservar turnos.

Flujo obligatorio:
1) Detectar intención de turno. Pedí primero el día que quiere venir.
2) Si el día es ambiguo, confirmá la fecha exacta antes de seguir.
3) Antes de mencionar horarios, llamá SIEMPRE a consultar_horarios_disponibles para la fecha elegida.
4) Mostrale entre 3 y 5 horarios disponibles reales. Nunca inventes horarios.
5) Cuando elija un horario, pedí su nombre completo.
6) Después pedí el teléfono con código de país.
7) Antes de confirmar, volvé a consultar la disponibilidad de ESE día y ESE horario.
8) Pedí el teléfono con código de país DESPUÉS del nombre y ANTES de cualquier guardado.
9) Solo llamá a guardar_turno cuando tengas confirmados DÍA, HORA, NOMBRE y TELÉFONO completos. Nunca lo llames con el teléfono vacío.
10) Solo si guardar_turno confirma, avisá que el turno quedó reservado y que lo van a contactar por WhatsApp.

Reglas:
- No asumas ni inventes datos faltantes.
- Si consultar_horarios_disponibles o guardar_turno fallan, no lo disimules. Avisá que hubo un problema técnico y ofrecé el contacto por WhatsApp.
- No des diagnósticos ni precios en el chat; derivá al consultorio.`;

        const completion = await client.chat.completions.create({
          model: isGroq ? "llama-3.1-8b-instant" : "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
          ],
          tools: TOOLS,
          tool_choice: "auto",
          temperature: 0.7,
          max_tokens: 400,
        });

        let choice = completion.choices[0];
        let replyMsg = choice?.message;

        // Manejar tool calls: ejecutar funciones y volver a pedir confirmación al modelo
        if (replyMsg?.tool_calls && replyMsg.tool_calls.length > 0) {
          const toolMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            { role: "system", content: systemPrompt },
            ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
            replyMsg,
          ];

          for (const call of replyMsg.tool_calls) {
            const args = JSON.parse(call.function.arguments || "{}");
            let result: unknown;
            try {
              if (call.function.name === "consultar_horarios_disponibles") {
                const disp = await consultarHorarios(args.fecha);
                result = { horarios_disponibles: disp };
              } else if (call.function.name === "guardar_turno") {
                if (!args.telefono || !args.nombre || !args.fecha || !args.hora) {
                  result = { error: "Faltan datos del paciente (nombre, telefono, fecha u hora). Pedí el teléfono antes de guardar." };
                } else {
                  await guardarTurno(args);
                  result = { ok: true, confirmado: true };
                }
              } else {
                result = { error: "función desconocida" };
              }
            } catch (err) {
              result = { error: err instanceof Error ? err.message : "Error al ejecutar" };
            }
            toolMessages.push({
              role: "tool",
              tool_call_id: call.id,
              content: JSON.stringify(result),
            });
          }

          const second = await client.chat.completions.create({
            model: isGroq ? "llama-3.1-8b-instant" : "gpt-4o-mini",
            messages: toolMessages,
            temperature: 0.7,
            max_tokens: 400,
          });
          replyMsg = second.choices[0]?.message;
        }

        const reply = replyMsg?.content;
        if (reply) {
          return NextResponse.json({ reply });
        }
      } catch (e) {
        const errorMsg = e instanceof Error ? e.message : "Error desconocido";
        console.error("Error con IA, usando fallback:", errorMsg);
        // cae al fallback abajo
      }
    }

    // --- MODO FALLBACK (sin IA o tras error de IA) ---
    const userMessagesAll = messages.filter((m) => m.role === "user").map((m) => ({ role: "user", content: m.content }));
    const paso = Math.min(userMessagesAll.length, 5);

    if (paso === 0) {
      return NextResponse.json({
        reply: "¡Hola! Soy el asistente de Estudio Dental Aguirre. ¿Querés reservar un turno?",
      });
    }

    if (paso === 1) {
      const fecha = userMessage.match(/\d{4}-\d{2}-\d{2}/)?.[0];
      if (fecha) {
        const disponibles = await consultarHorarios(fecha);
        if (disponibles.length === 0) {
          return NextResponse.json({
            reply: `No quedan horarios disponibles para ${fecha}. ¿Podés elegir otro día?`,
          });
        }
        return NextResponse.json({
          reply: `Para ${fecha} tengo estos horarios: ${disponibles.join(", ")}. ¿Cuál preferís?`,
        });
      }
      return NextResponse.json({
        reply: "¿Me decís la fecha en formato año-mes-día? Por ejemplo: 2026-07-10",
      });
    }

    if (paso === 2) {
      return NextResponse.json({ reply: "Perfecto. ¿Me decís tu nombre completo?" });
    }

    if (paso === 3) {
      return NextResponse.json({ reply: "Gracias. ¿Y tu teléfono con código de país? (ej: 5491123456789)" });
    }

    if (paso >= 4) {
      const datos = extraerDatos(userMessagesAll);
      if (datos.fecha && datos.hora && datos.nombre && datos.telefono) {
        try {
          const disponibles = await consultarHorarios(datos.fecha);
          if (!disponibles.includes(datos.hora)) {
            return NextResponse.json({
              reply: `Lo siento, el horario ${datos.hora} ya no está disponible para ${datos.fecha}. Los horarios libres son: ${disponibles.join(", ")}. ¿Cuál preferís?`,
            });
          }
          await guardarTurno({
            nombre: datos.nombre.trim(),
            telefono: datos.telefono,
            fecha: datos.fecha,
            hora: datos.hora,
          });
          return NextResponse.json({
            reply: `¡Turno confirmado! ${datos.nombre}, te anoté para el ${datos.fecha} a las ${datos.hora}. Te vamos a contactar por WhatsApp para confirmar. ¡Gracias!`,
          });
        } catch {
          return NextResponse.json({
            reply:
              "Hubo un problema técnico para guardar tu turno. Escribinos por WhatsApp y lo resolvemos al toque.",
          });
        }
      }
      return NextResponse.json({
        reply:
          "Necesito todos tus datos (fecha, hora, nombre y teléfono) para confirmar. ¿Me los pasás? También podés escribirnos por WhatsApp.",
      });
    }

    return NextResponse.json({ reply: "No entendí. ¿Podés repetirlo?" });
  } catch (error) {
    console.error("Error en chat:", error);
    const errorMsg = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { reply: `Error del servidor: ${errorMsg}. Probá de nuevo.` },
      { status: 200 }
    );
  }
}
