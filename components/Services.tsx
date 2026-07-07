"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";

const SERVICES = [
  {
    name: "Limpieza",
    desc: "Sacamos todo lo que el cepillo no puede. Te vas con la boca como nueva.",
    duration: "~45 min",
    forWho: "Para todos",
    benefits: ["Elimina sarro y manchas", "Prevención de caries", "Sensación de frescura inmediata"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 2L9.5 8.5M15 2l-3.5 13-4-6.5-6.5 4L15 2z" />
      </svg>
    ),
    imgSrc: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=500&h=400&fit=crop&q=80",
    alt: "Dentista realizando limpieza dental con espejo y sonda",
  },
  {
    name: "Blanqueamiento",
    desc: "Resultado real, sin filtros. Blancura natural que se ve sana, no artificial.",
    duration: "~60 min",
    forWho: "Dientes sanos",
    benefits: ["Blancura natural hasta 8 tonos", "Resultados inmediatos", "Sin sensibilidad"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 2v4M10 14v4M2 10h4M14 10h4M4.93 4.93l2.83 2.83M12.24 12.24l2.83 2.83M4.93 15.07l2.83-2.83M12.24 7.76l2.83-2.83" />
      </svg>
    ),
    imgSrc: "https://images.unsplash.com/photo-1598026252792-a95f8bbad7a6?w=500&h=400&fit=crop&q=80",
    alt: "Sonrisa blanca y brillante después de blanqueamiento dental",
  },
  {
    name: "Ortodoncia",
    desc: "Brackets, alineadores, lo que necesites. Sin que se note tanto.",
    duration: "12–24 meses",
    forWho: "Adolescentes y adultos",
    benefits: ["Alineadores transparentes", "Resultados predecibles", "Comodidad al hablar"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="16" height="8" rx="2" />
        <path d="M6 6V4M10 6V4M14 6V4M6 14v2M10 14v2M14 14v2" />
      </svg>
    ),
    imgSrc: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=500&h=400&fit=crop&q=80",
    alt: "Paciente colocándose alineadores transparentes de ortodoncia",
  },
  {
    name: "Implantes",
    desc: "Piezas dentales que parecen naturales. Porque lo son.",
    duration: "2–4 citas",
    forWho: "Pérdida dental",
    benefits: ["Fijos y permanentes", "Osteointegración completa", "Aspecto 100% natural"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 2v5M10 7c-2 0-4 1-4 3v3c0 2 1.5 3 4 3s4-1 4 3V10c0-2-2-3-4-3z" />
      </svg>
    ),
    imgSrc: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&h=400&fit=crop&q=80",
    alt: "Dentista analizando radiografías de implantes dentales",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function Services() {
  return (
    <section id="servicios" className="relative py-20 md:py-28 gradient-section scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
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
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.name}
              variants={item}
              className={`group rounded-2xl overflow-hidden glass shadow-premium transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-1.5 ${
                i === 0 ? "sm:row-span-2" : ""
              }`}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={s.imgSrc}
                  alt={s.alt}
                  width={500}
                  height={400}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    i === 0 ? "h-52 sm:h-full min-h-[280px]" : "h-52"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 bg-ink/60 backdrop-blur-sm text-paper text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {s.duration}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="text-gold">{s.icon}</div>
                  <h3 className="font-display text-xl font-medium">{s.name}</h3>
                </div>
                <p className="text-sm text-ink/50 leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[11px] font-mono tracking-wider text-gold/70 uppercase bg-gold/5 px-2.5 py-1 rounded-full">
                    {s.forWho}
                  </span>
                  <span className="text-[11px] font-mono tracking-wider text-teal/70 uppercase bg-teal/5 px-2.5 py-1 rounded-full">
                    {s.duration}
                  </span>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-[13px] text-ink/55">
                      <svg className="w-3.5 h-3.5 text-teal shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8l3.5 3.5L13 5" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/5491145678900"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gold hover:text-gold-dark transition-colors group/link"
                >
                  Consultá este tratamiento
                  <span className="transition-transform group-hover/link:translate-x-0.5">&rarr;</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <SectionReveal delay={0.3}>
          <div className="mt-12 text-center">
            <a
              href="https://wa.me/5491145678900"
              className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-gold transition-colors"
            >
              ¿No sabés cuál necesitá? Escribinos por WhatsApp
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 5l5 5-5 5" />
              </svg>
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
