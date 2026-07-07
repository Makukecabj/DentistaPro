"use client";

import { useRef, useState } from "react";
import SectionReveal from "./ui/SectionReveal";

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function updateFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }

  return (
    <section id="antes-despues" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <div className="mb-10">
            <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-3">
              Resultados
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">
              Antes y después
            </h2>
            <p className="text-ink/50 text-[15px] max-w-lg leading-relaxed">
              Arrastrá la línea para ver la diferencia real de un caso tratado en
              el consultorio.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div
            ref={containerRef}
            className="relative w-full max-w-2xl aspect-[16/9] rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-elevated border border-ink/5"
            onMouseDown={() => (dragging.current = true)}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
            onTouchStart={() => (dragging.current = true)}
            onTouchEnd={() => (dragging.current = false)}
            onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
          >
            <img
              src="https://placehold.co/800x450/17302B/E4ECE6?text=Despues"
              alt="Después del tratamiento"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <img
              src="https://placehold.co/800x450/6B7570/F6F4EF?text=Antes"
              alt="Antes del tratamiento"
              className="absolute inset-y-0 left-0 object-cover"
              style={{ width: `${position}%` }}
            />

            <div
              className="absolute inset-y-0 flex items-center"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-px h-full bg-gold/80" />
              <div className="absolute w-10 h-10 rounded-full bg-gold border-[3px] border-paper -ml-5 flex items-center justify-center shadow-glow cursor-ew-resize">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M4 2L1 7L4 12M10 2L13 7L10 12"
                    stroke="#17302B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="absolute top-4 left-4 bg-ink/70 text-paper text-[11px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full backdrop-blur-sm">
              Antes
            </div>
            <div className="absolute top-4 right-4 bg-paper/80 text-ink text-[11px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full backdrop-blur-sm">
              Después
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
