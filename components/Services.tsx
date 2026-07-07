"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";
import { Service, getPublicClinic } from "@/lib/clinicService";

// Iconos para servicios comunes
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  limpieza: (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M15 2L9.5 8.5M15 2l-3.5 13-4-6.5-6.5 4L15 2z" />
    </svg>
  ),
  blanqueamiento: (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 2v4M10 14v4M2 10h4M14 10h4M4.93 4.93l2.83 2.83M12.24 12.24l2.83 2.83M4.93 15.07l2.83-2.83M12.24 7.76l2.83-2.83" />
    </svg>
  ),
  ortodoncia: (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="16" height="8" rx="2" />
      <path d="M6 6V4M10 6V4M14 6V4M6 14v2M10 14v2M14 14v2" />
    </svg>
  ),
  implantes: (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 2v5M10 7c-2 0-4 1-4 3v3c0 2 1.5 3 4 3s4-1 4 3V10c0-2-2-3-4-3z" />
    </svg>
  ),
};

function getServiceIcon(name: string): React.ReactNode {
  const key = name.toLowerCase();
  return SERVICE_ICONS[key] || (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="10" r="8" />
    </svg>
  );
}

// Servicios estáticos de fallback (cuando Supabase no está configurado)
const FALLBACK_SERVICES: Service[] = [
  { id: "1", clinic_id: "", name: "Limpieza dental", price: 15000, duration_minutes: 30, description: "Profilaxis completa", order: 1 },
  { id: "2", clinic_id: "", name: "Blanqueamiento", price: 45000, duration_minutes: 60, description: "Tratamiento estético", order: 2 },
  { id: "3", clinic_id: "", name: "Ortodoncia", price: null, duration_minutes: null, description: "Por consulta", order: 3 },
  { id: "4", clinic_id: "", name: "Implantes", price: null, duration_minutes: null, description: "Por consulta", order: 4 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [clinicPhone, setClinicPhone] = useState("5491147802233");

  useEffect(() => {
    async function fetchData() {
      try {
        const clinic = await getPublicClinic();
        if (clinic?.whatsapp) setClinicPhone(clinic.whatsapp);
      } catch { }

      try {
        const response = await fetch("/api/services");
        if (response.ok) {
          const data = await response.json();
          if (data.services?.length > 0) {
            setServices(data.services);
          }
        }
      } catch { }
    }
    fetchData();
  }, []);

  // Si no hay datos de Supabase, usar fallback
  const displayServices = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <section id="servicios" className="relative py-20 md:py-28 gradient-section scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <SectionReveal>
          <SectionHeading
            eyebrow="Tratamientos"
            title="Qué hacemos"
            subtitle="Cada tratamiento es distinto. Cada paciente también."
          />
        </SectionReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {displayServices.map((s) => (
            <motion.div
              key={s.id}
              variants={item}
              className="group rounded-2xl overflow-hidden glass shadow-premium transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-1.5"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={`https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=500&h=400&fit=crop&q=80`}
                  alt={`Servicio ${s.name}`}
                  width={500}
                  height={400}
                  className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-ink/60 backdrop-blur-sm text-paper text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full">
                  {s.duration_minutes ? `${s.duration_minutes} min` : "Por consulta"}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="text-gold">{getServiceIcon(s.name)}</div>
                  <h3 className="font-display text-xl font-medium">{s.name}</h3>
                </div>
                <p className="text-sm text-ink/50 leading-relaxed mb-4">{s.description || "Tratamiento profesional"}</p>
                {s.price && (
                  <div className="mb-4">
                    <span className="text-[11px] font-mono tracking-wider text-gold/70 uppercase bg-gold/5 px-2.5 py-1 rounded-full">
                      Desde ${s.price.toLocaleString()}
                    </span>
                  </div>
                )}
                <a
                  href={`https://wa.me/${clinicPhone}?text=${encodeURIComponent(`Hola! Quiero info sobre el tratamiento de ${s.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gold hover:text-gold-dark transition-colors group/link"
                >
                  Consultá este tratamiento
                  <span className="transition-transform group-hover/link:translate-x-0.5">&rarr;</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}