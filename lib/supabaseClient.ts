import { createClient } from "@supabase/supabase-js";

// Cliente público (usa anon key) — se puede usar en componentes "use client"
// para inserts públicos (formulario de contacto, etc.)
export function getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

    if (!supabaseUrl || !supabaseAnonKey) {
        // Devolver un cliente dummy para que el build no falle
        // cuando las variables de entorno no están configuradas
        return createClient("https://placeholder.supabase.co", "placeholder-key");
    }

    return createClient(supabaseUrl, supabaseAnonKey);
}

// Cliente de servidor (usa service_role key) — solo se usa en API routes.
// Tiene permisos totales para leer y modificar cualquier tabla.
export function getServiceSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

    if (!supabaseUrl || !serviceRoleKey) {
        // Devolver un cliente dummy para que el build no falle
        return createClient("https://placeholder.supabase.co", "placeholder-key");
    }

    return createClient(supabaseUrl, serviceRoleKey);
}