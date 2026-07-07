"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

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
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [clinicPhone, setClinicPhone] = useState("5491147802233");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/services");
        if (response.ok) {
          const data = await response.json();
          if (data.faqs?.length > 0) {
            setFaqs(data.faqs);
          }
          if (data.clinic?.whatsapp) {
            setClinicPhone(data.clinic.whatsapp);
          }
        }
      } catch {
        // Usar fallback por defecto
      }
    }
    fetchData();
  }, []);

  // Fallback FAQs si Supabase no está configurado
  const displayFaqs = faqs.length > 0 ? faqs : [
    { id: "1", question: "¿Cómo es el tratamiento?", answer: "Trabajo con atención personalizada y uso tecnología de última generación." },
    { id: "2", question: "¿Duele algo?", answer: "Todo se realiza con anestesia local. La comodidad es lo primero." },
    { id: "3", question: "¿Atienden urgencias?", answer: "Sí, consulta por WhatsApp para turnos urgentes." },
  ];

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
            {displayFaqs.map((faq, i) => (
              <FAQItem key={faq.id} q={faq.question} a={faq.answer} index={i} />
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-10 text-center">
            <a
              href={`https://wa.me/${clinicPhone}?text=Hola!%20Tengo%20una%20consulta`}
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