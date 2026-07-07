"use client";

import Image from "next/image";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";

interface TreatmentPhoto {
  title: string;
  description: string;
  src: string;
}

const TREATMENT_PHOTOS: TreatmentPhoto[] = [
  {
    title: "Blanqueamiento",
    description: "Sonrisa más blanca y brillante en 1 sesión",
    src: "/images/blog/blanqueamiento-dental-led.jpg",
  },
  {
    title: "Ortodoncia",
    description: "Alineadores que transforman la sonrisa",
    src: "/images/blog/ortodoncia.jpg",
  },
  {
    title: "Implantes",
    description: "Rehabilitación funcional y estética",
    src: "/images/blog/implante.jpg",
  },
  {
    title: "Limpieza",
    description: "Dientes libres de placa y sarro",
    src: "/images/blog/limpiezadental.jpg",
  },
];

export default function BeforeAfterSlider() {
  return (
    <section id="antes-despues" className="py-20 md:py-28 gradient-section scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <SectionReveal>
          <SectionHeading
            eyebrow="Tratamientos"
            title="Nuestros tratamientos"
            subtitle="Cada tratamiento, una sonrisa más sana."
          />
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="grid sm:grid-cols-2 gap-6">
            {TREATMENT_PHOTOS.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl overflow-hidden shadow-elevated border border-ink/5 bg-paper"
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={t.src}
                    alt={t.title}
                    width={839}
                    height={256}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-display text-lg font-medium text-ink">{t.title}</h3>
                  <p className="text-sm text-ink/50 mt-1">{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}