"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";

const REVIEWS = [
  {
    name: "Martín S.",
    initials: "MS",
    date: "hace 2 semanas",
    text: "Entré a las 11 de la noche un domingo y a los 2 minutos ya tenía turno para el martes. Impecable.",
    rating: 5,
  },
  {
    name: "Lucía P.",
    initials: "LP",
    date: "hace 1 mes",
    text: "La Dra. Aguirre te explica todo sin apuro. Me hizo sentir tranquila desde la primera consulta.",
    rating: 5,
  },
  {
    name: "Carlos R.",
    initials: "CR",
    date: "hace 3 semanas",
    text: "Venía postergando hace años. El chat me facilitó todo. Hoy salí con la limpieza hecha y sin dolor.",
    rating: 5,
  },
];

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

export default function Reviews() {
  return (
    <section id="opiniones" className="py-20 md:py-28 bg-ink scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <SectionHeading
              eyebrow="Google"
              title="Lo que dicen"
              subtitle=""
              light
            />
            <div className="hidden sm:flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-sm text-paper/50">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#C9974A">
                      <path d="M7 0L8.6 4.6H13.5L9.6 7.4L11.1 12L7 9.2L2.9 12L4.4 7.4L0.5 4.6H5.4L7 0Z" />
                    </svg>
                  ))}
                </div>
                <span className="font-mono text-xs">4.9 en Google</span>
              </div>
              <span className="text-[12px] text-paper/30">Basado en 127 opiniones</span>
            </div>
          </div>
        </SectionReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-3 gap-6"
        >
          {REVIEWS.map((r) => (
            <motion.div
              key={r.name}
              variants={item}
              className="relative bg-white/[0.06] border border-gold/20 rounded-2xl p-6 border-l-[3px] border-l-gold transition-all duration-500 hover:shadow-premium hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} delay={i * 0.05} />
                  ))}
                </div>
                <span className="font-mono text-[11px] text-paper/30">{r.date}</span>
              </div>
              <p className="text-sm text-paper/70 mb-5 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <span className="font-mono text-[10px] text-paper/60 font-medium">{r.initials}</span>
                </div>
                <p className="font-medium text-sm text-paper">{r.name}</p>
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
              className="inline-flex items-center gap-2 text-sm text-paper/40 hover:text-gold transition-colors"
            >
              Ver todas las opiniones en Google
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
