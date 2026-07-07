import { NextResponse } from "next/server";
import { getServices, getInsurances, getTeam, getFAQs, getBeforeAfterCases, getPublicClinic } from "@/lib/clinicService";

export async function GET() {
    try {
        const [services, insurances, team, faqs, beforeAfter, clinic] = await Promise.all([
            getServices(),
            getInsurances(),
            getTeam(),
            getFAQs(),
            getBeforeAfterCases(),
            getPublicClinic()
        ]);

        return NextResponse.json({
            services,
            insurances,
            team,
            faqs,
            beforeAfter,
            clinic
        });
    } catch (error) {
        console.error("Error fetching public data:", error);
        return NextResponse.json(
            { error: "Error al cargar datos" },
            { status: 500 }
        );
    }
}