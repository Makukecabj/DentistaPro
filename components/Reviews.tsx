"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";

const REVIEWS = [
  {
    name: "Martín S.",
    date: "hace 2 semanas",
    text: "Entré a las 11 de la noche un domingo y a los 2 minutos ya tenía turno para el martes. Impecable.",
    rating: 5,
  },
  {
    name: "Lucía P.",
    date: "hace 1 mes",
    text: "La Dra. Aguirre te explica todo sin apuro. Me hizo sentir tranquila desde la primera consulta.",
    rating: 5,
  },
  {
    name: "Carlos R.",
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
    <section id="opiniones" className="py-28 gradient-section">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <SectionHeading
              eyebrow="Google"
              title="Lo que dicen"
              subtitle=""
            />
            <div className="hidden sm:flex items-center gap-2 text-sm text-ink/45 mb-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#C9974A">
                    <path d="M7 0L8.6 4.6H13.5L9.6 7.4L11.1 12L7 9.2L2.9 12L4.4 7.4L0.5 4.6H5.4L7 0Z" />
                  </svg>
                ))}
              </div>
              <span className="font-mono text-xs">4.9 en Google</span>
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
              className="relative glass rounded-2xl shadow-premium p-6 border-l-2 border-gold/60 transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} delay={i * 0.05} />
                  ))}
                </div>
                <span className="font-mono text-[11px] text-ink/30">{r.date}</span>
              </div>
              <p className="text-sm text-ink/65 mb-5 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <p className="font-medium text-sm text-ink">{r.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
