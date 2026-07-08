"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "./ui/SectionReveal";

const TREATMENTS = [
  { id: "limpieza", name: "Limpieza", icon: "\u2728" },
  { id: "blanqueamiento", name: "Blanqueamiento", icon: "\u2B50" },
  { id: "ortodoncia", name: "Ortodoncia", icon: "\uD83E\uDDF0" },
  { id: "implantes", name: "Implantes", icon: "\uD83E\uDDB7" },
  { id: "otro", name: "Otro / No sé", icon: "\u2753" },
];

const STEPS = [
  { id: 1, question: "¿Qué tratamiento buscás?" },
  { id: 2, question: "¿Es una urgencia?" },
  { id: 3, question: "¿Tenés estudios previos?" },
];

export default function BudgetCalculator() {
  const [step, setStep] = useState(0);
  const [treatment, setTreatment] = useState("");
  const [urgency, setUrgency] = useState("");
  const [prevStudies, setPrevStudies] = useState("");

  function getWhatsAppMessage() {
    const treatmentName = TREATMENTS.find((t) => t.id === treatment)?.name || treatment;
    return encodeURIComponent(
      `Hola! Quiero una estimación de presupuesto:\n- Tratamiento: ${treatmentName}\n- Urgencia: ${urgency === "si" ? "Sí" : "No"}\n- Estudios previos: ${prevStudies === "si" ? "Sí" : "No"}`
    );
  }

  function handleNext(value: string) {
    if (step === 0) setTreatment(value);
    if (step === 1) setUrgency(value);
    if (step === 2) {
      setPrevStudies(value);
      setStep(3);
      return;
    }
    setStep(step + 1);
  }

  function handleBack() {
    if (step > 0) setStep(step - 1);
  }

  function reset() {
    setStep(0);
    setTreatment("");
    setUrgency("");
    setPrevStudies("");
  }

  return (
    <section className="py-20 md:py-28 gradient-section">
      <div className="max-w-2xl mx-auto px-5 sm:px-6">
        <SectionReveal>
          <div className="text-center mb-10">
            <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-3">Presupuesto</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-ink leading-tight">
              Calculá tu presupuesto estimado
            </h2>
            <p className="mt-4 text-[15px] text-ink/50 max-w-md mx-auto leading-relaxed">
              Respondé estas preguntas y recibí una estimación personalizada por WhatsApp.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="glass rounded-2xl shadow-premium p-6 md:p-8">
            {step < 3 && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[11px] font-mono tracking-wider text-ink/40">
                  Paso {step + 1} de 3
                </span>
                <div className="flex-1 h-1 bg-ink/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gold rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((step + 1) / 3) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-medium text-ink mb-5 text-[15px]">¿Qué tratamiento buscás?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TREATMENTS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleNext(t.id)}
                        className={`rounded-xl border border-ink/10 p-4 text-left transition-all duration-200 hover:border-gold hover:bg-gold/5 hover:shadow-sm active:scale-[0.98] ${
                          treatment === t.id ? "border-gold bg-gold/5" : ""
                        }`}
                      >
                        <span className="text-xl block mb-1">{t.icon}</span>
                        <span className="text-sm font-medium text-ink">{t.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-medium text-ink mb-5 text-[15px]">¿Es una urgencia?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleNext("si")}
                      className="rounded-xl border border-ink/10 p-5 text-center transition-all duration-200 hover:border-gold hover:bg-gold/5 hover:shadow-sm active:scale-[0.98]"
                    >
                      <span className="text-2xl block mb-2">{"\u26A0\uFE0F"}</span>
                      <span className="text-sm font-medium text-ink">Sí, es urgente</span>
                    </button>
                    <button
                      onClick={() => handleNext("no")}
                      className="rounded-xl border border-ink/10 p-5 text-center transition-all duration-200 hover:border-gold hover:bg-gold/5 hover:shadow-sm active:scale-[0.98]"
                    >
                      <span className="text-2xl block mb-2">{"\uD83D\uDE0C"}</span>
                      <span className="text-sm font-medium text-ink">No, es preventivo</span>
                    </button>
                  </div>
                  <button onClick={handleBack} className="mt-4 text-[13px] text-ink/40 hover:text-ink transition-colors">
                    &larr; Volver
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-medium text-ink mb-5 text-[15px]">¿Tenés estudios previos?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleNext("si")}
                      className="rounded-xl border border-ink/10 p-5 text-center transition-all duration-200 hover:border-gold hover:bg-gold/5 hover:shadow-sm active:scale-[0.98]"
                    >
                      <span className="text-2xl block mb-2">{"\uD83D\uDCCB"}</span>
                      <span className="text-sm font-medium text-ink">Sí, tengo radiografías</span>
                    </button>
                    <button
                      onClick={() => handleNext("no")}
                      className="rounded-xl border border-ink/10 p-5 text-center transition-all duration-200 hover:border-gold hover:bg-gold/5 hover:shadow-sm active:scale-[0.98]"
                    >
                      <span className="text-2xl block mb-2">{"\u274C"}</span>
                      <span className="text-sm font-medium text-ink">No, nada previo</span>
                    </button>
                  </div>
                  <button onClick={handleBack} className="mt-4 text-[13px] text-ink/40 hover:text-ink transition-colors">
                    &larr; Volver
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                    className="w-16 h-16 mx-auto mb-5 rounded-full bg-teal/10 flex items-center justify-center"
                  >
                    <svg className="w-7 h-7 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12l6 6L20 6" />
                    </svg>
                  </motion.div>
                  <h3 className="font-display text-xl font-medium text-ink mb-2">
                    ¡Perfecto! Recibí tu estimación
                  </h3>
                  <p className="text-[15px] text-ink/50 mb-6 max-w-sm mx-auto">
                    Te enviamos una estimación personalizada por WhatsApp con todos los detalles de tu caso.
                  </p>
                  <a
                    href={`https://wa.me/5491164106698?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:bg-gold-dark hover:text-paper hover:shadow-glow-lg hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Recibí estimación por WhatsApp
                    <span>&rarr;</span>
                  </a>
                  <button onClick={reset} className="block mx-auto mt-4 text-[13px] text-ink/35 hover:text-ink transition-colors">
                    Empezar de nuevo
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
