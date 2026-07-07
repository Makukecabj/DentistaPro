"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";

const FAQS = [
  {
    q: "¿Duele un implante dental?",
    a: "El procedimiento se realiza con anestesia local, por lo que no se siente dolor durante la colocación. Después, el malestar es leve y se controla con medicación habitual. La mayoría de pacientes retoman su rutina al día siguiente.",
  },
  {
    q: "¿Cuánto dura un blanqueamiento?",
    a: "Los resultados del blanqueamiento pueden durar entre 1 y 2 años, dependiendo de tus hábitos (café, tabaco, etc.). Te damos indicaciones personalizadas para mantener los resultados el mayor tiempo posible.",
  },
  {
    q: "¿Aceptan obras sociales?",
    a: "Sí, trabajamos con las principales obras sociales y prepagas. Consultanos por tu cobertura específica y te asesoramos sobre el alcance de tu plan.",
  },
  {
    q: "¿Cómo saco turno?",
    a: "Podés reservar tu turno de varias formas: a través de este chat, por WhatsApp al +54 11 4780-2233, o llamándonos directamente. Elegí el día y horario que mejor te quede.",
  },
  {
    q: "¿Atienden emergencias?",
    a: "Sí, ante una urgencia odontológica, contactanos por WhatsApp y te atendemos a la brevedad. Nuestro equipo está preparado para manejar emergencias dentales fuera del horario habitual.",
  },
  {
    q: "¿Cuánto cuesta una limpieza dental?",
    a: "El costo varía según la obra social o prepaga del paciente. En una primera consulta evaluamos tu caso y te informamos el presupuesto exacto antes de realizar cualquier tratamiento.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${index}`;

  return (
    <div className="border-b border-ink/8 last:border-b-0">
      <button
        id={`${id}-button`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="font-medium text-ink text-[15px] group-hover:text-gold transition-colors">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-ink/30 shrink-0"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 4v12M4 10h12" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="overflow-hidden"
          >
            <p className="text-[15px] text-ink/55 leading-relaxed pb-5 pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 gradient-section scroll-mt-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <SectionReveal>
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="¿Tenés dudas?"
            subtitle="Resolvemos las consultas más comunes de nuestros pacientes."
            align="center"
          />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="glass rounded-2xl shadow-premium p-6 md:p-8">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-10 text-center">
            <a
              href="https://wa.me/5491147802233?text=Hola!%20Tengo%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-gold transition-colors"
            >
              ¿Tenés otra pregunta? Escribinos por WhatsApp
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
