import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getServiceSupabase } from "@/lib/supabaseClient";
import { getClinic, Clinic, DAYS_ES } from "@/lib/clinicService";
import { getOccupiedSlots, createCalendarEvent, isCalendarConfigured } from "@/lib/googleCalendar";

// ---------- Config ----------

const HORA_INICIO_DEFAULT = parseInt(process.env.HORA_INICIO || "9");
const HORA_FIN_DEFAULT = parseInt(process.env.HORA_FIN || "19");
const DURACION_TURNOS_DEFAULT = parseInt(process.env.DURACION_TURNOS || "30");

function generarHorarios(inicio = HORA_INICIO_DEFAULT, fin = HORA_FIN_DEFAULT, duracion = DURACION_TURNOS_DEFAULT): string[] {
  const horarios: string[] = [];
  for (let h = inicio; h < fin; h++) {
    for (let m = 0; m < 60; m += duracion) {
      horarios.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
    }
  }
  return horarios;
}

function getHorariosParaFecha(fecha: string, clinic: Clinic | null, ahora?: Date): string[] {
  if (!clinic?.business_hours) return generarHorarios();
  const diaSemana = new Date(fecha).getDay();
  const diaMapeado = diaSemana === 0 ? 7 : diaSemana;
  const horarioDelDia = clinic.business_hours[diaMapeado.toString()];
  if (!horarioDelDia) return [];
  const horarios = generarHorarios(horarioDelDia[0], horarioDelDia[1]);
  if (ahora && fecha === ahora.toISOString().slice(0, 10)) {
    const minutosActuales = ahora.getHours() * 60 + ahora.getMinutes();
    return horarios.filter((h) => {
      const [hh, mm] = h.split(":").map(Number);
      return hh * 60 + mm > minutosActuales;
    });
  }
  return horarios;
}

async function consultarHorarios(fecha: string, clinic: Clinic | null, ahora?: Date): Promise<string[]> {
  const allSlots = getHorariosParaFecha(fecha, clinic, ahora);
  const ocupados = new Set<string>();

  // Check Supabase
  try {
    const supabase = getServiceSupabase();
    const { data: turnos } = await supabase
      .from("turnos")
      .select("hora")
      .eq("fecha", fecha)
      .neq("estado", "cancelado");
    for (const t of (turnos ?? [])) {
      ocupados.add(String(t.hora).slice(0, 5));
    }
  } catch { /* ignore */ }

  // Check Google Calendar
  if (isCalendarConfigured()) {
    try {
      const calendarOccupied = await getOccupiedSlots(fecha);
      for (const slot of calendarOccupied) {
        ocupados.add(slot);
      }
    } catch { /* ignore */ }
  }

  return allSlots.filter((h) => !ocupados.has(h));
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
}

// ---------- Booking State ----------

type BookingState = {
  fecha: string | null;
  hora: string | null;
  nombre: string | null;
  telefono: string | null;
};

// ---------- AI Client ----------

function getAIClient(): OpenAI | null {
  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({
    apiKey,
    baseURL: process.env.GROQ_API_KEY ? "https://api.groq.com/openai/v1" : undefined,
  });
}

// ---------- Entity Extraction via IA ----------

function buildExtractionPrompt(history: string, today: string, ahora: string): string {
  return `Hoy es ${today}. Son las ${ahora}.

Extraé del historial del paciente los datos para reservar un turno odontológico.
Usá los valores más RECIENTES. Si el paciente corrige algo, tomá el último que dijo.
Respondé SOLO un JSON con estos campos (null si no encontrás):
- "fecha": en formato YYYY-MM-DD. Convertí fechas relativas (mañana, pasado mañana, el lunes, etc.) y meses en español (ej: "julio" → 07)
- "hora": en formato HH:MM (24hs). Convertí "2 de la tarde" → "14:00", "las 10" → "10:00"
- "nombre": nombre completo del paciente
- "telefono": con código de país, solo dígitos, sin espacios ni guiones

Historial del paciente:
"""
${history}
"""`;
}

function extractEntitiesFallback(text: string): Partial<BookingState> {
  return {
    fecha: text.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? null,
    hora: text.match(/\b([01]\d|2[0-3]):[0-5]\d\b/)?.[0] ?? null,
    nombre: null,
    telefono: text.match(/(?:\+?\d[\d\s()-]{7,}\d)/)?.[0]?.replace(/[\s()-]/g, "") ?? null,
  };
}

async function extractEntities(userMessages: string[], clinic: Clinic | null): Promise<Partial<BookingState>> {
  const client = getAIClient();
  const history = userMessages.join("\n");
  if (!client) return extractEntitiesFallback(history);

  const ahora = new Date();
  const today = ahora.toISOString().slice(0, 10);
  const ahoraStr = ahora.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false });

  try {
    const completion = await client.chat.completions.create({
      model: process.env.GROQ_API_KEY ? "llama-3.1-8b-instant" : "gpt-4o-mini",
      messages: [
        { role: "system", content: "Sos un extractor de datos. Respondé solo JSON válido." },
        { role: "user", content: buildExtractionPrompt(history, today, ahoraStr) },
      ],
      response_format: { type: "json_object" },
      temperature: 0,
      max_tokens: 200,
    });

    const raw = completion.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw);

    return {
      fecha: typeof parsed.fecha === "string" ? parsed.fecha : null,
      hora: typeof parsed.hora === "string" ? parsed.hora : null,
      nombre: typeof parsed.nombre === "string" ? parsed.nombre : null,
      telefono: typeof parsed.telefono === "string" ? parsed.telefono.replace(/\D/g, "") : null,
    };
  } catch {
    return extractEntitiesFallback(history);
  }
}

// ---------- Response Generation via IA ----------

function buildSystemPrompt(
  clinic: Clinic | null,
  state: BookingState,
  disponibles: string[],
  context: string,
): string {
  const ahora = new Date();
  const ahoraStr = ahora.toLocaleDateString("es-AR", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
  const nombre = clinic?.name || "Estudio Dental Aguirre";
  const telefono = clinic?.phone || "+54 11 6410-6698";
  const whatsapp = clinic?.whatsapp || "5491164106698";
  const direccion = clinic?.address || "Av. Cabildo 2450, Belgrano, CABA";
  const cancelPolicy = clinic?.cancellation_policy || "24 hs de anticipación";

  const diasAtencion = clinic?.business_hours
    ? Object.entries(clinic.business_hours)
        .filter(([_, v]) => v)
        .map(([d]) => DAYS_ES[parseInt(d)])
        .join(", ")
    : "Lun a Vie";

  return `Son las ${ahoraStr}. Sos ${nombre}, Belgrano, CABA.

DATOS:
• Tel: ${telefono} / WhatsApp: ${whatsapp}
• ${diasAtencion}
• Cancelación: ${cancelPolicy}
• Dirección: ${direccion}

VOS: español argentino, cálido, amistoso, sin vueltas. Respondé en 1-2 oraciones.

Si preguntan por diagnósticos o precios exactos: "mejor consultalo con el Dr. Aguirre".

${state.fecha ? `RESERVA: ${state.fecha} ${state.hora || "—"} / ${state.nombre || "—"} / ${state.telefono || "—"}` : "No hay datos de reserva aún."}

${disponibles.length > 0 ? `LIBRES: ${disponibles.slice(0, 8).join(", ")}` : ""}

CONTEXTO: ${context}

Si falta algo, preguntalo corto. Si está todo, confirmá.`;
}

async function generateResponse(
  clinic: Clinic | null,
  state: BookingState,
  disponibles: string[],
  context: string,
  fallback: string,
): Promise<string> {
  const client = getAIClient();
  if (!client) return fallback;

  try {
    const completion = await client.chat.completions.create({
      model: process.env.GROQ_API_KEY ? "llama-3.1-8b-instant" : "gpt-4o-mini",
      messages: [
        { role: "system", content: buildSystemPrompt(clinic, state, disponibles, context) },
      ],
      temperature: 0.7,
      max_tokens: 180,
    });
    return completion.choices[0]?.message?.content?.trim() || fallback;
  } catch {
    return fallback;
  }
}

// ---------- POST ----------

export async function POST(req: NextRequest) {
  const clinic = await getClinic();
  const ahora = new Date();

  try {
    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const userMessages = messages.filter((m) => m.role === "user").map((m) => m.content);

    if (userMessages.length === 0) {
      return NextResponse.json({
        reply: await generateResponse(
          clinic,
          { fecha: null, hora: null, nombre: null, telefono: null },
          [],
          "Primer mensaje. Saludá y ofrecé ayuda para reservar un turno.",
          "¡Hola! Soy el asistente del Dr. Martín Aguirre. ¿Necesitás un turno? Decime qué día te gustaría venir.",
        ),
      });
    }

    const extracted = await extractEntities(userMessages, clinic);
    const state: BookingState = {
      fecha: extracted.fecha || null,
      hora: extracted.hora || null,
      nombre: extracted.nombre || null,
      telefono: extracted.telefono || null,
    };

    let disponibles: string[] = [];
    if (state.fecha) {
      disponibles = await consultarHorarios(state.fecha, clinic, ahora);
    }

    // Singing / preguntas generales sin datos de turno aún
    const sinDatos = !state.fecha && !state.hora && !state.nombre && !state.telefono;
    if (sinDatos && userMessages.length === 1) {
      return NextResponse.json({
        reply: await generateResponse(
          clinic,
          state,
          [],
          "El paciente saludó pero no pidió turno explícitamente. Ofrecé ayuda amablemente y preguntá qué día le gustaría venir.",
          "¡Hola! ¿En qué puedo ayudarte? Si querés reservar un turno, decime qué día te viene bien.",
        ),
      });
    }

    if (!state.fecha) {
      return NextResponse.json({
        reply: await generateResponse(
          clinic,
          state,
          [],
          "No se encontró una fecha. Preguntá qué día le gustaría venir.",
          "¿Qué día te gustaría venir? Decime una fecha, por ejemplo: 2026-07-15",
        ),
      });
    }

    if (disponibles.length === 0) {
      return NextResponse.json({
        reply: await generateResponse(
          clinic,
          state,
          [],
          `No hay turnos para ${state.fecha} (cierra o sin disponibilidad). Sugerí otro día amablemente.`,
          `No tengo turnos disponibles para ${state.fecha}. ¿Podés otro día?`,
        ),
      });
    }

    if (!state.hora) {
      return NextResponse.json({
        reply: await generateResponse(
          clinic,
          state,
          disponibles,
          `Mostrá los horarios disponibles para ${state.fecha} y preguntá cuál prefiere.`,
          `Para ${state.fecha} tengo estos horarios: ${disponibles.slice(0, 8).join(", ")}. ¿Cuál te queda mejor?`,
        ),
      });
    }

    if (!disponibles.includes(state.hora)) {
      return NextResponse.json({
        reply: await generateResponse(
          clinic,
          state,
          disponibles,
          `Las ${state.hora} no está disponible para ${state.fecha}. Ofrecé los disponibles.`,
          `Las ${state.hora} no está libre para ${state.fecha}. Los horarios disponibles son: ${disponibles.slice(0, 8).join(", ")}. ¿Cuál preferís?`,
        ),
      });
    }

    if (!state.nombre) {
      return NextResponse.json({
        reply: await generateResponse(
          clinic,
          state,
          disponibles,
          `Ya tenemos fecha (${state.fecha}) y hora (${state.hora}). Pedí el nombre completo.`,
          `Perfecto, te anoto para el ${state.fecha} a las ${state.hora}. ¿Me decís tu nombre completo?`,
        ),
      });
    }

    if (!state.telefono) {
      return NextResponse.json({
        reply: await generateResponse(
          clinic,
          state,
          disponibles,
          `Tenemos fecha, hora y nombre (${state.nombre}). Pedí el teléfono con código de país.`,
          `Gracias ${state.nombre}. ¿Me pasás tu teléfono con código de país para confirmar? (ej: 5491164106698)`,
        ),
      });
    }

    // All fields present → save
    try {
      await guardarTurno({
        nombre: state.nombre,
        telefono: state.telefono,
        fecha: state.fecha,
        hora: state.hora,
      });

      // Also create Google Calendar event (non-blocking)
      if (isCalendarConfigured()) {
        createCalendarEvent({
          nombre: state.nombre,
          telefono: state.telefono,
          fecha: state.fecha,
          hora: state.hora,
        }).catch(() => {});
      }

      return NextResponse.json({
        reply: await generateResponse(
          clinic,
          state,
          disponibles,
          "Todos los datos están completos. Confirmá el turno con un mensaje cálido, incluyendo fecha, hora y que lo contactan por WhatsApp.",
          `¡Turno confirmado ${state.nombre}! Te anoté para el ${state.fecha} a las ${state.hora}. Te vamos a contactar por WhatsApp para confirmar. ¡Gracias por confiar en el Dr. Aguirre!`,
        ),
      });
    } catch {
      return NextResponse.json({
        reply: await generateResponse(
          clinic,
          state,
          disponibles,
          "Error al guardar el turno. Derivá al paciente a WhatsApp.",
          "Hubo un problema técnico. Escribinos por WhatsApp al +54 11 6410-6698 y te ayudamos.",
        ),
      });
    }
  } catch (error) {
    console.error("Error en chat:", error);
    return NextResponse.json(
      { reply: "Uy, ocurrió un error. Probá de nuevo en un momento." },
      { status: 200 },
    );
  }
}
