import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
    const { nombre, telefono, mensaje } = (await req.json()) as {
        nombre: string;
        telefono: string;
        mensaje: string;
    };

    if (!nombre || !telefono || !mensaje) {
        return NextResponse.json(
            { error: "Faltan campos requeridos (nombre, teléfono, mensaje)" },
            { status: 400 }
        );
    }

    const supabase = getSupabase();
    const { error } = await supabase.from("mensajes_contacto").insert({
        nombre,
        telefono,
        mensaje,
    });

    if (error) {
        console.error("Error al guardar mensaje de contacto:", error);
        return NextResponse.json(
            { error: "No se pudo enviar el mensaje. Intentá de nuevo." },
            { status: 500 }
        );
    }

    return NextResponse.json({ ok: true });
}