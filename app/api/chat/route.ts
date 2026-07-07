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

// ----- Parseo de campos desde todo el historial del usuario -----
function extraerDatos(userTexts: string[]) {
  const texto = userTexts.join(" | ");
  const fecha = texto.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? null;
  const hora = texto.match(/\b([01]\d|2[0-3]):[0-5]\d\b/)?.[0] ?? null;
  const telefono = texto.match(/(?:\+?\d[\d\s()-]{7,}\d)/)?.[0]?.replace(/[\s()-]/g, "") ?? null;
  // Nombre: el mensaje de usuario más largo que no sea fecha/hora/teléfono y tenga al menos 2 palabras
  let nombre: string | null = null;
  for (const t of userTexts) {
    const limpio = t.trim();
    const esFecha = /\d{4}-\d{2}-\d{2}/.test(limpio);
    const esHora = /\b([01]\d|2[0-3]):[0-5]\d\b/.test(limpio);
    const esTelefono = /\d[\d\s()-]{7,}\d/.test(limpio) && limpio.replace(/\D/g, "").length >= 8;
    const palabras = limpio.split(/\s+/).filter(Boolean);
    if (!esFecha && !esHora && !esTelefono && palabras.length >= 2 && limpio.length >= 4) {
      nombre = limpio;
      break;
    }
  }
  return { fecha, hora, telefono, nombre };
}

// Cliente IA (opcional). Si no hay key, el flujo funciona igual con textos prefijados.
function getAIClient(): OpenAI | null {
  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({
    apiKey,
    baseURL: process.env.GROQ_API_KEY ? "https://api.groq.com/openai/v1" : undefined,
  });
}

async function redactar(prompt: string, fallback: string): Promise<string> {
  const client = getAIClient();
  if (!client) return fallback;
  try {
    const completion = await client.chat.completions.create({
      model: process.env.GROQ_API_KEY ? "llama-3.1-8b-instant" : "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Sos el asistente virtual de Estudio Dental Aguirre, en Argentina. Responde en español argentino, corto, amable y natural. No des diagnósticos ni precios.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });
    return completion.choices[0]?.message?.content?.trim() || fallback;
  } catch {
    return fallback;
  }
}

// ----- Flujo determinístico server-side -----
type Campos = { fecha: string | null; hora: string | null; nombre: string | null; telefono: string | null };

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const userTexts = messages.filter((m) => m.role === "user").map((m) => m.content);
    const ultimo = userTexts[userTexts.length - 1] ?? "";

    // Detectar intención de turno (si el usuario pregunta por turno al menos una vez)
    const quiereTurno = userTexts.some((t) =>
      /(turno|reserv|agendar|sacar|pedir|cuando|horario|atender)/i.test(t)
    );

    if (userTexts.length === 0) {
      return NextResponse.json({
        reply: await redactar(
          "Saludá y ofrecé ayuda para reservar un turno.",
          "¡Hola! Soy el asistente de Estudio Dental Aguirre. ¿Querés reservar un turno?"
        ),
      });
    }

    if (!quiereTurno) {
      return NextResponse.json({
        reply: await redactar(
          `El paciente escribió: "${ultimo}". Derivá a reservar turno o contacto por WhatsApp sin dar diagnóstico.`,
          "Te puedo ayudar a reservar un turno. ¿Querés que miremos los horarios disponibles? También podés escribirnos por WhatsApp."
        ),
      });
    }

    const campos: Campos = extraerDatos(userTexts);

    // 1) Falta fecha
    if (!campos.fecha) {
      return NextResponse.json({
        reply: await redactar(
          "Pedí la fecha del turno en formato AAAA-MM-DD.",
          "¿Qué día te gustaría venir? Escribilo en formato año-mes-día, por ejemplo: 2026-07-10"
        ),
      });
    }

    // 2) Tenemos fecha pero falta hora -> consultar disponibilidad real
    if (!campos.hora) {
      const disponibles = await consultarHorarios(campos.fecha);
      if (disponibles.length === 0) {
        return NextResponse.json({
          reply: await redactar(
            `No hay horarios para ${campos.fecha}. Sugerí otro día.`,
            `No quedan horarios disponibles para ${campos.fecha}. ¿Podés elegir otro día?`
          ),
        });
      }
      const muestra = disponibles.slice(0, 6).join(", ");
      return NextResponse.json({
        reply: await redactar(
          `Mostrá estos horarios disponibles para ${campos.fecha}: ${muestra}. Preguntá cuál prefiere.`,
          `Para ${campos.fecha} tengo estos horarios: ${muestra}. ¿Cuál preferís?`
        ),
      });
    }

    // 3) Falta nombre
    if (!campos.nombre) {
      return NextResponse.json({
        reply: await redactar("Pedí el nombre completo del paciente.", "Perfecto. ¿Me decís tu nombre completo?"),
      });
    }

    // 4) Falta teléfono
    if (!campos.telefono) {
      return NextResponse.json({
        reply: await redactar(
          "Pedí el teléfono con código de país.",
          "Gracias. ¿Y tu teléfono con código de país? (ej: 5491123456789)"
        ),
      });
    }

    // 5) Tenemos todo -> verificar disponibilidad y guardar
    const disponibles = await consultarHorarios(campos.fecha);
    if (!disponibles.includes(campos.hora)) {
      const muestra = disponibles.slice(0, 6).join(", ");
      return NextResponse.json({
        reply: await redactar(
          `El horario ${campos.hora} ya no está libre el ${campos.fecha}. Ofrecé estos: ${muestra}.`,
          `Lo siento, el horario ${campos.hora} ya no está disponible para ${campos.fecha}. Los horarios libres son: ${muestra}. ¿Cuál preferís?`
        ),
      });
    }

    try {
      await guardarTurno({
        nombre: campos.nombre,
        telefono: campos.telefono,
        fecha: campos.fecha,
        hora: campos.hora,
      });
      return NextResponse.json({
        reply: await redactar(
          `Confirmá el turno de ${campos.nombre} el ${campos.fecha} a las ${campos.hora}. Avisá que lo contactan por WhatsApp.`,
          `¡Turno confirmado! ${campos.nombre}, te anoté para el ${campos.fecha} a las ${campos.hora}. Te vamos a contactar por WhatsApp para confirmar. ¡Gracias!`
        ),
      });
    } catch {
      return NextResponse.json({
        reply: await redactar(
          "Hubo error al guardar. Derivá a WhatsApp.",
          "Hubo un problema técnico para guardar tu turno. Escribinos por WhatsApp y lo resolvemos al toque."
        ),
      });
    }
  } catch (error) {
    console.error("Error en chat:", error);
    const errorMsg = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { reply: `Error del servidor: ${errorMsg}. Probá de nuevo.` },
      { status: 200 }
    );
  }
}
