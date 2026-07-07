"use client";

import { motion } from "framer-motion";

const REASONS = [
  {
    title: "Tecnología digital 3D",
    desc: "Radiografías e intraorales de última generación para diagnósticos precisos.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Atención personalizada",
    desc: "Cada paciente es único. Tratamos tu caso con la dedicación que merece.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    title: "Profesionales certificados",
    desc: "Equipo con especialización y formación continua en las mejores universidades.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <path d="M22 4L12 14.01l-3-3" />
      </svg>
    ),
  },
  {
    title: "Materiales de primera",
    desc: "Utilizamos marcas líderes mundiales en implantes, resinas y porcelanas.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Ambiente moderno",
    desc: "Un consultorio diseñado para que te sientas cómodo y tranquilo.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    title: "Turnos rápidos",
    desc: "Reservá online en segundos. Sin llamadas, sin esperas.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Seguimiento personalizado",
    desc: "Te acompañamos antes, durante y después de cada tratamiento.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-ink">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-3">Diferenciadores</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-paper leading-tight">
            ¿Por qué elegirnos?
          </h2>
          <p className="mt-4 text-[15px] text-paper/50 max-w-lg mx-auto leading-relaxed">
            No somos un consultorio más. Estos son los motivos por los que nuestros pacientes confían en nosotros.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {REASONS.map((r) => (
            <motion.div
              key={r.title}
              variants={item}
              className="group bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.08] hover:border-gold/20 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-4 transition-all duration-300 group-hover:bg-gold/20 group-hover:scale-110">
                {r.icon}
              </div>
              <h3 className="font-display text-lg font-medium text-paper mb-2">{r.title}</h3>
              <p className="text-[13px] text-paper/45 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
