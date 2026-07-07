"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";

const SERVICES = [
  {
    name: "Limpieza",
    desc: "Sacamos todo lo que el cepillo no puede. Te vas con la boca como nueva.",
    imgSrc: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=500&h=400&fit=crop&q=80",
    alt: "Dentista realizando limpieza dental con espejo y sonda",
  },
  {
    name: "Blanqueamiento",
    desc: "Resultado real, sin filtros. Blancura natural que se ve sana, no artificial.",
    imgSrc: "https://images.unsplash.com/photo-1598026252792-a95f8bbad7a6?w=500&h=400&fit=crop&q=80",
    alt: "Sonrisa blanca y brillante después de blanqueamiento dental",
  },
  {
    name: "Ortodoncia",
    desc: "Brackets, alineadores, lo que necesites. Sin que se note tanto.",
    imgSrc: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=500&h=400&fit=crop&q=80",
    alt: "Paciente colocándose alineadores transparentes de ortodoncia",
  },
  {
    name: "Implantes",
    desc: "Piezas dentales que parecen naturales. Porque lo son.",
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
    <section id="servicios" className="relative py-28 gradient-section">
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
              className={`group rounded-2xl overflow-hidden glass shadow-premium transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1.5 ${
                i === 0 ? "sm:row-span-2" : ""
              }`}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={s.imgSrc}
                  alt={s.alt}
                  width={500}
                  height={400}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    i === 0 ? "h-52 sm:h-full min-h-[280px]" : "h-52"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-medium mb-2">{s.name}</h3>
                <p className="text-sm text-ink/50 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
