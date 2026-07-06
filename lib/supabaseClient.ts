import { createClient } from "@supabase/supabase-js";

// Estas dos variables son públicas a propósito: la seguridad real la da
// Row Level Security (RLS) en Supabase, no el secreto de estas keys.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Cliente público (usa anon key) — se puede usar en componentes "use client"
// Solo permite operaciones habilitadas por RLS (insertar turnos, enviar mensajes)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente de servidor (usa service_role key) — solo se usa en API routes
// Tiene permisos totales para leer y modificar cualquier tabla
export function getServiceSupabase() {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
    return createClient(supabaseUrl, serviceRoleKey);
}