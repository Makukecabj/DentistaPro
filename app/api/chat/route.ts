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
    const ocupados = new Set((turnos ?? []).map((t) => t.hora.slice(0, 5)));
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

// Sistema de respuestas por pasos (fallback cuando no hay IA disponible)
const PASOS: Record<number, { pregunta: string; campo: string }> = {
  0: { pregunta: "¡Hola! Soy el asistente de Estudio Dental Aguirre. ¿Querés reservar un turno?", campo: "inicio" },
  1: { pregunta: "¿Qué día te gustaría venir? (ej: 2026-07-10)", campo: "fecha" },
  2: { pregunta: "¿Qué horario preferís? (ej: 10:30)", campo: "hora" },
  3: { pregunta: "¿Me decís tu nombre completo?", campo: "nombre" },
  4: { pregunta: "¿Y tu teléfono? (ej: 5491123456789)", campo: "telefono" },
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const userMessage = messages[messages.length - 1]?.content || "";

    const hasGroqKey = !!process.env.GROQ_API_KEY;
    const hasOpenAIKey = !!process.env.OPENAI_API_KEY;

    // Debug: si el usuario escribe "estado", mostramos configuración sin exponer claves
    if (userMessage.trim().toLowerCase() === "estado") {
      return NextResponse.json({
        reply: `Configuración actual: Groq=${hasGroqKey ? "sí" : "no"}, OpenAI=${hasOpenAIKey ? "sí" : "no"}.`,
      });
    }

    // --- MODO CON IA (Groq o OpenAI) ---
    const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
    if (apiKey) {
      try {
        const isGroq = !!process.env.GROQ_API_KEY;
        const client = new OpenAI({
          apiKey: apiKey,
          baseURL: isGroq ? "https://api.groq.com/openai/v1" : undefined,
        });

        const completion = await client.chat.completions.create({
          model: isGroq ? "llama-3.1-8b-instant" : "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `Sos el asistente virtual de "Estudio Dental Aguirre", un consultorio odontológico. Siempre hablá en español argentino, de forma amable, clara y profesional. Tu trabajo es ayudar a los pacientes a reservar turnos, no a dar diagnósticos, tratamientos ni precios.

Flujo obligatorio:
1) Detectar intención de turno. Cuando el paciente quiera sacar un turno, pedile primero el día que quiere venir.
2) Si el día que menciona es ambiguo (ej. "el martes" sin fecha), confirmá la fecha exacta antes de seguir (ej. "¿el martes 9 de julio?").
3) Antes de mencionar cualquier horario, consultá SIEMPRE la disponibilidad real del día elegido, sin inventar horarios.
4) Mostrale entre 3 y 5 horarios disponibles reales. Nunca inventes horarios.
5) Cuando el paciente elija un horario, pedile solo su nombre completo.
6) Después pedile el teléfono con código de país.
7) Antes de confirmar el turno, volvé a consultar la disponibilidad de ESE día y ESE horario puntual.
8) Si en ese momento ya no está libre, avisale con naturalidad y ofrecele los horarios disponibles más cercanos de ese mismo día.
9) Solo si tenés confirmados DÍA, HORA, NOMBRE Y TELÉFONO, y después de la última verificación de disponibilidad, confirmá el turno.
10) Si falta alguno de esos datos, pedilo explícitamente, de a uno o dos datos por mensaje, sin hacer un formulario largo de golpe.

Reglas:
- No asumas ni inventes datos faltantes.
- No menciones horarios que no hayan salido de la consulta real.
- Si un horario específico no está disponible, aclaralo y ofrecé opciones reales cercanas.
- Si preguntan por dolor, síntomas, diagnósticos o precios de tratamientos, respondé brevemente que eso se evalúa en el consultorio y ofrecé coordinar el turno para consultarlo en persona. No des precios ni diagnósticos en el chat.
- Si consultar_horarios_disponibles o guardar_turno fallan o devuelven un error, no lo disimules ni digas que el turno quedó guardado si no es seguro. Avisá que hubo un problema técnico y ofrecé el contacto por WhatsApp como alternativa.
- Usá un tono argentino natural, sin sonar a guion leído ni robótico.
- Una vez confirmado el turno, indicá que lo van a contactar por WhatsApp para cualquier cambio.`,
            },
            ...messages.map((m) => ({
              role: m.role as "user" | "assistant",
              content: m.content,
            })),
          ],
          temperature: 0.7,
          max_tokens: 300,
        });

        const reply = completion.choices[0]?.message?.content;
        if (reply) {
          return NextResponse.json({ reply });
        }
      } catch (e) {
        const errorMsg = e instanceof Error ? e.message : "Error desconocido";
        console.error("Error con IA, usando fallback:", errorMsg);
        return NextResponse.json({
          reply: `La IA no respondió correctamente. Error: ${errorMsg}`,
        });
      }
    }

    // --- MODO FALLBACK (sin IA) ---
    const userMessages = messages.filter((m) => m.role === "user");
    const paso = Math.min(userMessages.length, 5);

    if (paso === 0) {
      return NextResponse.json({ reply: PASOS[0].pregunta });
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
      return NextResponse.json({
        reply: "¡Turno confirmado! Te va a llegar la confirmación. Si necesitás reprogramar, escribinos por acá.",
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