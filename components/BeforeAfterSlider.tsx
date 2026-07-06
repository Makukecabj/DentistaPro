"use client";

import { useRef, useState } from "react";

// TODO: reemplazar los dos bloques de color por las fotos reales del caso
// (before y after), manteniendo la misma estructura de capas.
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
    <section id="antes-despues" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="font-display text-3xl font-medium mb-4">
        Antes y después
      </h2>
      <p className="text-ink/65 mb-8 max-w-xl">
        Arrastrá la línea para ver la diferencia real de un caso tratado en
        el consultorio.
      </p>

      <div
        ref={containerRef}
        className="relative w-full max-w-2xl aspect-[16/9] rounded-xl2 overflow-hidden select-none cursor-ew-resize border border-ink/10"
        onMouseDown={() => (dragging.current = true)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
        onTouchStart={() => (dragging.current = true)}
        onTouchEnd={() => (dragging.current = false)}
        onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
      >
        <div className="absolute inset-0 bg-ink flex items-center justify-center">
          <span className="font-mono text-xs tracking-wide text-paper/70">
            después
          </span>
        </div>

        <div
          className="absolute inset-y-0 left-0 bg-sage flex items-center justify-center overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <span className="font-mono text-xs tracking-wide text-ink/60">
            antes
          </span>
        </div>

        <div
          className="absolute inset-y-0 flex items-center"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-px h-full bg-gold" />
          <div className="absolute w-8 h-8 rounded-full bg-gold border-2 border-paper -ml-4 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M4 2L1 6L4 10M8 2L11 6L8 10"
                stroke="#17302B"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
