"use client";

import Image from "next/image";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";

const LIMPIEZA_IMG = "/images/blog/limpieza.webp";

export default function BeforeAfterSlider() {
  return (
    <section id="antes-despues" className="py-20 md:py-28 gradient-section scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <SectionReveal>
          <SectionHeading
            eyebrow="Resultados"
            title="Limpieza profesional"
            subtitle="Profilaxis completa para una boca sana y libre de placa."
          />
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="max-w-3xl mx-auto">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-elevated border border-ink/5">
              <Image
                src={LIMPIEZA_IMG}
                alt="Limpieza dental profesional"
                width={839}
                height={280}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}