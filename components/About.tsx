"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function About() {
  return (
    <section id="sobre-mi" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <SectionReveal>
          <SectionHeading
            eyebrow="Sobre mí"
            title="Dr. Martín Aguirre"
            subtitle="Odontólogo en Belgrano, CABA. Atención personalizada y tratamientos de alta calidad."
          />
        </SectionReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-5 gap-10 md:gap-14 items-start"
        >
          <motion.div variants={item} className="md:col-span-2">
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-elevated">
              <Image
                src="/images/team/draguirre.png"
                alt="Dr. Martín Aguirre — Odontólogo en Belgrano"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-ink/5 rounded-2xl pointer-events-none" />
            </div>
          </motion.div>

          <motion.div variants={item} className="md:col-span-3 space-y-5 text-[15px] text-ink/70 leading-relaxed">
            <p>
              Soy el <strong>Dr. Martín Aguirre</strong>, odontólogo recibido en la Universidad de Buenos Aires
              con más de 15 años de experiencia. Mi consultorio en Belgrano nació con la idea de ofrecer
              una atención odontológica cercana, transparente y de calidad, donde cada paciente se sienta
              como en casa.
            </p>
            <p>
              Me especializo en <strong>estética dental, rehabilitación oral y tratamientos mínimamente
              invasivos</strong>. Creo en la formación continua: por eso me mantengo actualizado con cursos
              y congresos nacionales e internacionales para incorporar las técnicas más modernas y los
              materiales de primera línea.
            </p>
            <p>
              Mi filosofía es simple: <strong>escuchar, explicar y cuidar</strong>. Cada tratamiento lo
              planificamos juntos, sin apuros, para que entiendas cada paso y te sientas seguro. Desde la
              primera consulta hasta el seguimiento, mi compromiso es que tu experiencia sea cómoda y los
              resultados, impecables.
            </p>

            <div className="flex flex-wrap gap-3 pt-3">
              <div className="flex items-center gap-2 text-[13px] font-mono text-gold bg-gold/5 px-4 py-2 rounded-full">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10 2L10 18M18 10L2 10" />
                </svg>
                <span>UBA · 2009</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] font-mono text-gold bg-gold/5 px-4 py-2 rounded-full">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 7l-5 5-3-3" />
                </svg>
                <span>15+ años</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] font-mono text-gold bg-gold/5 px-4 py-2 rounded-full">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <span>Estética dental</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
