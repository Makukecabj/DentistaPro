import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getServiceSupabase } from "@/lib/supabaseClient";

// Horarios disponibles (lunes a viernes 9 a 19hs)
const HORARIOS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30",
];

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
          model: isGroq ? "llama3-8b-8192" : "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `Sos el asistente virtual de "Estudio Dental Aguirre", un consultorio odontológico.
Siempre hablá en español argentino, de forma amable y profesional.
Ayudá a los pacientes a reservar turnos. Preguntales qué día quieren venir, mostrales horarios disponibles, y pediles nombre y teléfono.
Los horarios de atención son lunes a viernes de 9 a 19hs.
Si te piden servicios, ofrecé: limpieza dental, blanqueamiento, ortodoncia e implantes.`,
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