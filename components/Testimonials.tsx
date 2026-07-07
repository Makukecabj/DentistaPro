"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";

const TESTIMONIALS = [
  {
    name: "Nombre Apellido",
    initials: "NA",
    treatment: "Tratamiento",
    text: "Testimonio pendiente de cliente real. Espacio reservado para reseña auténtica con nombre, tratamiento y experiencia detallada.",
    rating: 5,
  },
  {
    name: "Nombre Apellido",
    initials: "NA",
    treatment: "Tratamiento",
    text: "Testimonio pendiente de cliente real. Espacio reservado para reseña auténtica con nombre, tratamiento y experiencia detallada.",
    rating: 5,
  },
  {
    name: "Nombre Apellido",
    initials: "NA",
    treatment: "Tratamiento",
    text: "Testimonio pendiente de cliente real. Espacio reservado para reseña auténtica con nombre, tratamiento y experiencia detallada.",
    rating: 5,
  },
];

function Star({ delay = 0 }: { delay?: number }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="#C9974A">
      <path d="M7 0L8.6 4.6H13.5L9.6 7.4L11.1 12L7 9.2L2.9 12L4.4 7.4L0.5 4.6H5.4L7 0Z" />
    </svg>
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

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-20 md:py-28 bg-sage/30 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <SectionHeading
            eyebrow="Testimonios"
            title="Lo que dicen nuestros pacientes"
            subtitle="Historias reales de personas que confiaron en nosotros."
          />
        </SectionReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group glass rounded-2xl shadow-premium p-6 border-l-[3px] border-l-gold transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-1"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} />
                ))}
              </div>
              <p className="text-sm text-ink/60 mb-6 leading-relaxed italic">
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
          <div className="mt-10 text-center">
            <a
              href="https://g.page/r/estudiodentalaguirre/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-gold transition-colors"
            >
              ¿Ya fuiste paciente? Dejanos tu opinión en Google
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
