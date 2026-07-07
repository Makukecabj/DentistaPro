"use client";

import Image from "next/image";
import SectionReveal from "./ui/SectionReveal";

export default function BeforeAfterSlider() {
  return (
    <section id="antes-despues" className="py-28 gradient-section">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <div className="mb-10">
            <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-3">
              Resultados
            </p>
            <h2 className="heading-glow font-display text-3xl md:text-4xl font-medium mb-4">
              Antes y después
            </h2>
            <p className="text-ink/50 text-[15px] max-w-lg leading-relaxed">
              La diferencia real de un caso tratado en el consultorio.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-ink/5 aspect-[4/3]">
              <Image
                src="/images/before-after/antes.jpg"
                alt="Antes del tratamiento dental"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-ink/70 text-paper text-[11px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full backdrop-blur-sm">
                Antes
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-ink/5 aspect-[4/3]">
              <Image
                src="/images/before-after/despues.jpg"
                alt="Después del tratamiento dental - sonrisa brillante"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-paper/80 text-ink text-[11px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full backdrop-blur-sm">
                Después
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
