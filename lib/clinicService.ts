import { getServiceSupabase } from "./supabaseClient";
import { getSupabase } from "./supabaseClient";

// Tipos
export interface Clinic {
    id: string;
    name: string;
    phone: string | null;
    whatsapp: string | null;
    address: string | null;
    map_lat: number | null;
    map_lng: number | null;
    logo_url: string | null;
    primary_color: string | null;
    cancellation_policy: string | null;
    // business_hours: { [day: string]: [number, number] } - ej: {"1": [9,19]}
    business_hours: Record<string, [number, number]> | null;
}

export interface Service {
    id: string;
    clinic_id: string;
    name: string;
    price: number | null;
    duration_minutes: number | null;
    description: string | null;
    order: number;
}

export interface Insurance {
    id: string;
    clinic_id: string;
    name: string;
    coverage_notes: string | null;
}

export interface TeamMember {
    id: string;
    clinic_id: string;
    name: string;
    specialty: string | null;
    photo_url: string | null;
    bio: string | null;
    order: number;
}

export interface FAQ {
    id: string;
    clinic_id: string;
    question: string;
    answer: string;
    order: number;
}

export interface BeforeAfterCase {
    id: string;
    clinic_id: string;
    before_url: string;
    after_url: string;
    title: string | null;
    description: string | null;
    order: number;
}

// Helper para obtener el perfil único de la clínica (desde backend)
export async function getClinic(): Promise<Clinic | null> {
    const supabase = getServiceSupabase();
    const { data } = await supabase
        .from("clinic")
        .select("*")
        .limit(1)
        .single();

    return data as Clinic | null;
}

// Helpers para el frontend (usan cliente anon)
export async function getPublicClinic(): Promise<Clinic | null> {
    const supabase = getSupabase();
    const { data } = await supabase
        .from("clinic")
        .select("*")
        .limit(1)
        .single();

    return data as Clinic | null;
}

export async function getServices(): Promise<Service[]> {
    const supabase = getSupabase();
    const { data } = await supabase
        .from("clinic_services")
        .select("*")
        .order("order");

    return (data as Service[]) || [];
}

export async function getInsurances(): Promise<Insurance[]> {
    const supabase = getSupabase();
    const { data } = await supabase
        .from("clinic_insurance")
        .select("*");

    return (data as Insurance[]) || [];
}

export async function getTeam(): Promise<TeamMember[]> {
    const supabase = getSupabase();
    const { data } = await supabase
        .from("clinic_team")
        .select("*")
        .order("order");

    return (data as TeamMember[]) || [];
}

export async function getFAQs(): Promise<FAQ[]> {
    const supabase = getSupabase();
    const { data } = await supabase
        .from("clinic_faqs")
        .select("*")
        .order("order");

    return (data as FAQ[]) || [];
}

export async function getBeforeAfterCases(): Promise<BeforeAfterCase[]> {
    const supabase = getSupabase();
    const { data } = await supabase
        .from("clinic_before_after")
        .select("*")
        .order("order");

    return (data as BeforeAfterCase[]) || [];
}

// Helper para calcular horarios disponibles desde business_hours
// Convención: día 1 = Lunes, día 7 = Domingo
export function getBusinessHoursForDay(hours: Record<string, [number, number]> | null, dayOfWeek: number): [number, number] | null {
    if (!hours) return null;
    return hours[dayOfWeek.toString()] || null;
}

export function isDayOpen(hours: Record<string, [number, number]> | null, dayOfWeek: number): boolean {
    return getBusinessHoursForDay(hours, dayOfWeek) !== null;
}

// Días de la semana en español
// Convención: 1 = Lunes, 7 = Domingo
export const DAYS_ES: Record<number, string> = {
    1: "Lun",
    2: "Mar",
    3: "Mié",
    4: "Jue",
    5: "Vie",
    6: "Sáb",
    7: "Dom"
};
