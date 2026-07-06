import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getServiceSupabase } from "@/lib/supabaseClient";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

// Horarios laborales fijos del consultorio (de lunes a viernes)
const LABORAL_DAYS = [1, 2, 3, 4, 5]; // 1=lunes, 5=viernes
const HORA_INICIO = 9; // 9:00
const HORA_FIN = 19; // 19:00
const DURACION_TURNO_MIN = 30; // minutos
const HORARIOS_PREDEFINIDOS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30",
];

async function consultarHorariosDisponibles(fecha: string): Promise<string[]> {
  const supabase = getServiceSupabase();

  // Obtener los turnos ya ocupados (no cancelados) para esa fecha
  const { data: turnos } = await supabase
    .from("turnos")
    .select("hora")
    .eq("fecha", fecha)
    .neq("estado", "cancelado");

  const ocupados = new Set((turnos ?? []).map((t) => t.hora.slice(0, 5)));
  return HORARIOS_PREDEFINIDOS.filter((h) => !ocupados.has(h));
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

  if (error) {
    console.error("Error al guardar turno:", error);
    throw new Error("No se pudo guardar el turno");
  }

  return { ok: true };
}

const SYSTEM_PROMPT = `Sos el asistente virtual de "Estudio Dental Aguirre", un consultorio odontológico.

Tu función es ayudar a los pacientes a reservar turnos de forma conversacional.
Siempre hablá en español argentino, de forma amable y profesional.

REGLAS:
1. Saludá al paciente y preguntale cómo podés ayudarlo.
2. Si quiere reservar un turno, preguntale qué día le gustaría.
3. Usá la función "consultar_horarios_disponibles" para ver qué horarios hay libres ese día.
4. Mostrale los horarios disponibles al paciente para que elija.
5. Una vez que elige horario, pedile nombre y teléfono para confirmar.
6. Usá la función "guardar_turno" para registrar la reserva.
7. Confirmale que el turno quedó agendado.
8. Si el día no es laboral (solo lunes a viernes, 9 a 19hs), decile amablemente y ofrecé otro día.
9. Si el paciente pregunta por servicios, mencionales que ofrecen: limpieza dental, blanqueamiento, ortodoncia e implantes.
10. Si no hay horarios disponibles para un día, ofrecé otra fecha.`;

const TOOLS: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "consultar_horarios_disponibles",
      description: "Consulta los horarios disponibles para una fecha específica. Solo se atiende de lunes a viernes de 9 a 19hs.",
      parameters: {
        type: "object",
        properties: {
          fecha: {
            type: "string",
            description: "Fecha en formato YYYY-MM-DD (ej: 2026-07-08)",
          },
        },
        required: ["fecha"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "guardar_turno",
      description: "Guarda un turno confirmado en el sistema. El paciente ya debe haber elegido fecha y horario.",
      parameters: {
        type: "object",
        properties: {
          nombre: {
            type: "string",
            description: "Nombre y apellido del paciente",
          },
          telefono: {
            type: "string",
            description: "Teléfono del paciente con código de país (ej: 5491123456789)",
          },
          fecha: {
            type: "string",
            description: "Fecha del turno en formato YYYY-MM-DD",
          },
          hora: {
            type: "string",
            description: "Hora del turno en formato HH:MM (ej: 10:30)",
          },
          servicio: {
            type: "string",
            description: "Servicio solicitado (opcional)",
          },
        },
        required: ["nombre", "telefono", "fecha", "hora"],
        additionalProperties: false,
      },
    },
  },
];

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as {
    messages: { role: "user" | "assistant"; content: string }[];
  };

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { reply: "El asistente no está configurado todavía. Si soy el dueño del consultorio, necesito agregar la OPENAI_API_KEY en .env.local" },
      { status: 200 }
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      ],
      tools: TOOLS,
      tool_choice: "auto",
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseMessage = completion.choices[0]?.message;

    // Si la IA quiere ejecutar una función
    if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
      const toolCall = responseMessage.tool_calls[0] as OpenAI.Chat.Completions.ChatCompletionMessageToolCall;
      const functionName = toolCall.function.name;
      const functionArgs = JSON.parse(toolCall.function.arguments);

      let functionResult: string;

      if (functionName === "consultar_horarios_disponibles") {
        const horarios = await consultarHorariosDisponibles(functionArgs.fecha);
        functionResult = JSON.stringify({
          fecha: functionArgs.fecha,
          disponibles: horarios,
          mensaje: horarios.length > 0
            ? `Horarios disponibles para ${functionArgs.fecha}: ${horarios.join(", ")}.`
            : `No quedan horarios disponibles para ${functionArgs.fecha}. Ofrece otra fecha.`,
        });
      } else if (functionName === "guardar_turno") {
        await guardarTurno(functionArgs);
        functionResult = JSON.stringify({
          ok: true,
          mensaje: `Turno confirmado para ${functionArgs.nombre} el ${functionArgs.fecha} a las ${functionArgs.hora}.`,
        });
      } else {
        functionResult = JSON.stringify({ error: "Función desconocida" });
      }

      // Llamada de vuelta a la IA con el resultado de la función
      const secondCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
          responseMessage,
          {
            role: "tool",
            content: functionResult,
            tool_call_id: toolCall.id,
          },
        ],
        tools: TOOLS,
        temperature: 0.7,
        max_tokens: 500,
      });

      const reply = secondCompletion.choices[0]?.message?.content ?? "Disculpá, no entendí. ¿Podés repetirlo?";
      return NextResponse.json({ reply });
    }

    const reply = responseMessage?.content ?? "Disculpá, no entendí. ¿Podés repetirlo?";
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error en chat:", error);
    return NextResponse.json(
      { reply: "Uy, hubo un error. Probá de nuevo en un momento." },
      { status: 200 }
    );
  }
}