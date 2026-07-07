import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getServiceSupabase } from "@/lib/supabaseClient";
import { getClinic, Clinic, DAYS_ES } from "@/lib/clinicService";

// Horarios por defecto (usados solo si no hay datos de clínica)
const HORA_INICIO_DEFAULT = parseInt(process.env.HORA_INICIO || "9");
const HORA_FIN_DEFAULT = parseInt(process.env.HORA_FIN || "19");
const DURACION_TURNOS_DEFAULT = parseInt(process.env.DURACION_TURNOS || "30");

// Genera horarios según parámetros
function generarHorarios(inicio = HORA_INICIO_DEFAULT, fin = HORA_FIN_DEFAULT, duracion = DURACION_TURNOS_DEFAULT): string[] {
  const horarios: string[] = [];
  for (let h = inicio; h < fin; h++) {
    for (let m = 0; m < 60; m += duracion) {
      const hora = h.toString().padStart(2, "0");
      const min = m.toString().padStart(2, "0");
      horarios.push(`${hora}:${min}`);
    }
  }
  return horarios;
}

// Obtiene horarios según día de la semana, usando business_hours de la clínica
function getHorariosParaFecha(fecha: string, clinic: Clinic | null): string[] {
  if (!clinic?.business_hours) {
    return generarHorarios();
  }

  const fechaObj = new Date(fecha);
  const diaSemana = fechaObj.getDay(); // 0=Dom, 1=Lun, ... 6=Sáb

  // Convertir a nuestro formato: 1=Lun ... 7=Dom
  const diaMapeado = diaSemana === 0 ? 7 : diaSemana;

  const horarioDelDia = clinic.business_hours[diaMapeado.toString()];
  if (!horarioDelDia) return [];

  return generarHorarios(horarioDelDia[0], horarioDelDia[1]);
}

async function consultarHorarios(fecha: string, clinic: Clinic | null): Promise<string[]> {
  try {
    const supabase = getServiceSupabase();
    const { data: turnos } = await supabase
      .from("turnos")
      .select("hora")
      .eq("fecha", fecha)
      .neq("estado", "cancelado");
    const ocupados = new Set((turnos ?? []).map((t) => String(t.hora).slice(0, 5)));
    const horariosDisponibles = getHorariosParaFecha(fecha, clinic);
    return horariosDisponibles.filter((h) => !ocupados.has(h));
  } catch {
    return getHorariosParaFecha(fecha, clinic);
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

// ----- Parseo de un campo concreto desde un texto -----
function parseFecha(texto: string): string | null {
  return texto.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? null;
}
function parseHora(texto: string): string | null {
  return texto.match(/\b([01]\d|2[0-3]):[0-5]\d\b/)?.[0] ?? null;
}
function parseTelefono(texto: string): string | null {
  const m = texto.match(/(?:\+?\d[\d\s()-]{7,}\d)/)?.[0];
  return m ? m.replace(/[\s()-]/g, "") : null;
}
function parseNombre(texto: string): string | null {
  const limpio = texto.trim();
  if (/\d{4}-\d{2}-\d{2}/.test(limpio)) return null;
  if (/\b([01]\d|2[0-3]):[0-5]\d\b/.test(limpio)) return null;
  if (/\d[\d\s()-]{7,}\d/.test(limpio) && limpio.replace(/\D/g, "").length >= 8) return null;
  if (/(turno|reserv|agendar|sacar|pedir|hola|si|no|gracias|confirm|whatsapp|quiero|consulta|horario|dia|fecha|cuando)/i.test(limpio)) return null;
  const palabras = limpio.split(/\s+/).filter(Boolean);
  if (palabras.length >= 2 && limpio.length >= 4) return limpio;
  return null;
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

// Construye system prompt dinámico desde los datos de la clínica
function buildSystemPrompt(clinic: Clinic | null): string {
  const nombre = clinic?.name || "Estudio Dental";
  const telefono = clinic?.phone || "No especificado";
  const whatsapp = clinic?.whatsapp || "No especificado";
  const direccion = clinic?.address || "No especificada";
  const cancelPolicy = clinic?.cancellation_policy || "24hs de anticipación";
  const emergency = clinic?.business_hours?.hasOwnProperty("7") || clinic?.business_hours?.hasOwnProperty("1") || false;

  // Parsear business_hours para mostrar
  const diasAtencion = clinic?.business_hours
    ? Object.entries(clinic.business_hours)
      .filter(([_, value]) => value)
      .map(([day]) => DAYS_ES[parseInt(day)])
      .join(", ")
    : "Lun-Vie";

  return `Sos el asistente virtual de ${nombre}, en Argentina. 
    
HORARIOS: Atención los días ${diasAtencion}.
TELÉFONO: ${telefono}
WHATSAPP: ${whatsapp}
DIRECCIÓN: ${direccion}
POLÍTICA DE CANCELACIÓN: ${cancelPolicy}

Responde en español argentino, corto, amable y natural. No des diagnósticos ni precios específicos.`;
}

async function redactar(prompt: string, fallback: string, clinic: Clinic | null): Promise<string> {
  const client = getAIClient();
  if (!client) return fallback;
  try {
    const completion = await client.chat.completions.create({
      model: process.env.GROQ_API_KEY ? "llama-3.1-8b-instant" : "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: buildSystemPrompt(clinic),
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
  // Obtener datos de la clínica al inicio (contexto dinámico)
  const clinic = await getClinic();

  try {
    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const userTexts = messages.filter((m) => m.role === "user").map((m) => m.content);

    if (userTexts.length === 0) {
      return NextResponse.json({
        reply: await redactar(
          "Saludá y ofrecé ayuda para reservar un turno.",
          `¡Hola! Soy el asistente del Dr. Martín Aguirre. ¿Necesitás un turno?`,
          clinic
        ),
      });
    }

    const ultimo = userTexts[userTexts.length - 1] ?? "";

    // Paso 1: saludo / intención -> pedir fecha
    if (userTexts.length === 1) {
      return NextResponse.json({
        reply: await redactar(
          "Ofrecé ayuda para reservar un turno y pedí la fecha en formato AAAA-MM-DD.",
          `¡Hola! Soy el asistente del Dr. Martín Aguirre. ¿Qué día te gustaría venir? Escribilo en formato año-mes-día, por ejemplo: 2026-07-10`,
          clinic
        ),
      });
    }

    const fecha = parseFecha(ultimo) ?? parseFecha(userTexts.join(" | "));
    if (!fecha) {
      return NextResponse.json({
        reply: await redactar(
          "No se entendió la fecha. Pedila en formato AAAA-MM-DD.",
          "¿Me decís la fecha en formato año-mes-día? Por ejemplo: 2026-07-10",
          clinic
        ),
      });
    }

    // Paso 2: ya tenemos fecha -> mostrar disponibilidad y pedir hora
    const horaDelMensaje = parseHora(ultimo);
    if (userTexts.length === 2 || !horaDelMensaje) {
      const disponibles = await consultarHorarios(fecha, clinic);
      if (disponibles.length === 0) {
        return NextResponse.json({
          reply: await redactar(
            `No hay horarios para ${fecha}. Sugerí otro día.`,
            `No quedan horarios disponibles para ${fecha}. ¿Podés elegir otro día?`,
            clinic
          ),
        });
      }
      const muestra = disponibles.slice(0, 6).join(", ");
      return NextResponse.json({
        reply: await redactar(
          `Mostrá estos horarios disponibles para ${fecha}: ${muestra}. Preguntá cuál prefiere.`,
          `Para ${fecha} tengo estos horarios: ${muestra}. ¿Cuál preferís?`,
          clinic
        ),
      });
    }

    const hora = horaDelMensaje!;

    // Paso 3: pedir nombre
    if (userTexts.length === 3) {
      return NextResponse.json({
        reply: await redactar("Pedí el nombre completo del paciente.", "Perfecto. ¿Me decís tu nombre completo?", clinic),
      });
    }

    const nombre = parseNombre(ultimo) ?? parseNombre(userTexts.join(" | "));
    if (!nombre) {
      return NextResponse.json({
        reply: await redactar("No se entendió el nombre. Pedí el nombre completo.", "¿Me decís tu nombre completo, por favor?", clinic),
      });
    }

    // Paso 4: pedir teléfono
    if (userTexts.length === 4) {
      return NextResponse.json({
        reply: await redactar(
          "Pedí el teléfono con código de país.",
          "Gracias. ¿Y tu teléfono con código de país? (ej: 5491123456789)",
          clinic
        ),
      });
    }

    const telefono = parseTelefono(ultimo) ?? parseTelefono(userTexts.join(" | "));
    if (!telefono) {
      return NextResponse.json({
        reply: await redactar("No se entendió el teléfono. Pedí el teléfono con código de país.", "¿Me pasás tu teléfono con código de país? (ej: 5491123456789)", clinic),
      });
    }

    // Paso 5: verificar disponibilidad y guardar
    const disponibles = await consultarHorarios(fecha, clinic);
    if (!disponibles.includes(hora)) {
      const muestra = disponibles.slice(0, 6).join(", ");
      return NextResponse.json({
        reply: await redactar(
          `El horario ${hora} ya no está libre el ${fecha}. Ofrecé estos: ${muestra}.`,
          `Lo siento, el horario ${hora} ya no está disponible para ${fecha}. Los horarios libres son: ${muestra}. ¿Cuál preferís?`,
          clinic
        ),
      });
    }

    try {
      await guardarTurno({ nombre, telefono, fecha, hora });
      return NextResponse.json({
        reply: await redactar(
          `Confirmá el turno de ${nombre} el ${fecha} a las ${hora}. Avisá que lo contactan por WhatsApp.`,
          `¡Turno confirmado! ${nombre}, te anoté para el ${fecha} a las ${hora}. Te vamos a contactar por WhatsApp para confirmar. ¡Gracias!`,
          clinic
        ),
      });
    } catch {
      return NextResponse.json({
        reply: await redactar(
          "Hubo error al guardar. Derivá a WhatsApp.",
          "Hubo un problema técnico para guardar tu turno. Escribinos por WhatsApp y lo resolvemos al toque.",
          clinic
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