"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";

const TESTIMONIALS = [
  {
    name: "María G.",
    initials: "MG",
    treatment: "Limpieza dental",
    text: "Excelente atención desde el primer momento. La Dra. Aguirre me explicó todo con paciencia y el resultado fue increíble. Muy recomendable.",
    rating: 5,
    verified: true,
  },
  {
    name: "Carlos R.",
    initials: "CR",
    treatment: "Blanqueamiento",
    text: "Venía postergando hace años. El proceso fue rápido, sin dolor y los resultados superaron mis expectativas. Hoy sonrío con confianza.",
    rating: 5,
    verified: true,
  },
  {
    name: "Lucía P.",
    initials: "LP",
    treatment: "Ortodoncia",
    text: "Puse mis alineadores con el Dr. Ferreyra y la experiencia es genial. Se nota la profesionalidad y el trato humano de todo el equipo.",
    rating: 5,
    verified: true,
  },
];

const GOOGLE_STATS = {
  rating: 4.9,
  totalReviews: 127,
};

function Star({ delay = 0 }: { delay?: number }) {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="#C9974A"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
    >
      <path d="M7 0L8.6 4.6H13.5L9.6 7.4L11.1 12L7 9.2L2.9 12L4.4 7.4L0.5 4.6H5.4L7 0Z" />
    </motion.svg>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function SocialProof() {
  return (
    <section id="opiniones" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
            <SectionHeading
              eyebrow="Opiniones"
              title="Lo que dicen nuestros pacientes"
              subtitle="Historias reales de personas que confiaron en nosotros."
            />
            <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
              <div className="flex items-center gap-2 text-sm text-ink/60">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#C9974A">
                      <path d="M7 0L8.6 4.6H13.5L9.6 7.4L11.1 12L7 9.2L2.9 12L4.4 7.4L0.5 4.6H5.4L7 0Z" />
                    </svg>
                  ))}
                </div>
                <span className="font-mono text-xs font-medium">{GOOGLE_STATS.rating} en Google</span>
              </div>
              <span className="text-[12px] text-ink/35">Basado en {GOOGLE_STATS.totalReviews} opiniones</span>
            </div>
          </div>
        </SectionReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-3 gap-6 mt-8"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={item}
              className="group glass rounded-2xl shadow-premium p-6 border-l-[3px] border-l-gold transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} delay={j * 0.05} />
                  ))}
                </div>
                {t.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider text-teal/70 bg-teal/5 px-2 py-0.5 rounded-full">
                    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8l3.5 3.5L13 5" />
                    </svg>
                    Verificado
                  </span>
                )}
              </div>
              <p className="text-sm text-ink/60 mb-5 leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center shrink-0">
                  <span className="font-mono text-xs text-teal-dark font-medium">{t.initials}</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-ink">{t.name}</p>
                  <p className="text-[12px] text-ink/40">{t.treatment}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <SectionReveal delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://g.page/r/estudiodentalaguirre/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-gold transition-colors"
            >
              Ver todas las opiniones en Google
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 5l5 5-5 5" />
              </svg>
            </a>
            <span className="hidden sm:inline text-ink/20">|</span>
            <a
              href="https://wa.me/5491147802233?text=Hola!%20Quiero%20dejar%20mi%20opini%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-gold transition-colors"
            >
              Dejanos tu opinión
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
