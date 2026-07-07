"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";
import { getBeforeAfterCases, BeforeAfterCase } from "@/lib/clinicService";

const FALLBACK_CASES: BeforeAfterCase[] = [
  { id: "f1", clinic_id: "", before_url: "https://images.unsplash.com/photo-1527949830967-08e6506698a5?w=600&h=400&fit=crop&q=80", after_url: "https://images.unsplash.com/photo-1582750673913-50979bc0925c?w=600&h=400&fit=crop&q=80", title: "Blanqueamiento", description: "Sonrisa más blanca y brillante en 1 sesión", order: 1 },
  { id: "f2", clinic_id: "", before_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&q=80", after_url: "https://images.unsplash.com/photo-1544005311-35c6e6f9a2e1?w=600&h=400&fit=crop&q=80", title: "Ortodoncia", description: "Alineadores transforman la sonrisa", order: 2 },
  { id: "f3", clinic_id: "", before_url: "https://images.unsplash.com/photo-1599566150125-1b7e7a0b5e2c?w=600&h=400&fit=crop&q=80", after_url: "https://images.unsplash.com/photo-1576091158677-7b8dfe9d6c1a?w=600&h=400&fit=crop&q=80", title: "Implantes", description: "Rehabilitación funcional y estética", order: 3 },
];

export default function BeforeAfterSlider() {
  const [cases, setCases] = useState<BeforeAfterCase[]>([]);
  const [currentCase, setCurrentCase] = useState(0);
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    async function fetchCases() {
      try {
        const casesData = await getBeforeAfterCases();
        if (casesData.length > 0) {
          setCases(casesData);
        }
      } catch {
        // Usar fallback
      }
    }
    fetchCases();
  }, []);

  const displayCases = cases.length > 0 ? cases : FALLBACK_CASES;

  // Resetear posición del slider cuando cambiamos de caso
  useEffect(() => {
    setPosition(50);
  }, [currentCase]);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((p) => Math.max(0, p - 2));
    } else if (e.key === "ArrowRight") {
      setPosition((p) => Math.min(100, p + 2));
    }
  }, []);

  const goToPrevCase = () => {
    setCurrentCase((prev) => (prev === 0 ? displayCases.length - 1 : prev - 1));
  };

  const goToNextCase = () => {
    setCurrentCase((prev) => (prev === displayCases.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="antes-despues" className="py-20 md:py-28 gradient-section scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <SectionReveal>
          <SectionHeading
            eyebrow="Resultados"
            title="Antes y después"
            subtitle="La diferencia real de un caso tratado en el consultorio."
          />
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="max-w-3xl mx-auto">
            {/* Navegación entre casos */}
            {displayCases.length > 1 && (
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={goToPrevCase}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-ink/5 hover:bg-ink/10 transition-colors"
                  aria-label="Caso anterior"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M12 5l-5 5 5 5" />
                  </svg>
                </button>

                <div className="flex gap-1.5">
                  {displayCases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentCase(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === currentCase ? "bg-gold w-6" : "bg-ink/20 hover:bg-ink/30"
                        }`}
                      aria-label={`Ir al caso ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNextCase}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-ink/5 hover:bg-ink/10 transition-colors"
                  aria-label="Caso siguiente"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M8 5l5 5-5 5" />
                  </svg>
                </button>
              </div>
            )}

            {/* Título del caso actual */}
            <div className="text-center mb-4">
              <h3 className="font-display text-lg font-medium text-ink">
                {displayCases[currentCase].title || "Transformación dental"}
              </h3>
              {displayCases[currentCase].description && (
                <p className="text-sm text-ink/50 mt-1">{displayCases[currentCase].description}</p>
              )}
            </div>

            <div
              ref={containerRef}
              role="slider"
              aria-label="Comparador antes y después"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position)}
              aria-valuetext={`Comparación: ${Math.round(position)}% después del tratamiento`}
              tabIndex={0}
              className="relative rounded-2xl overflow-hidden shadow-elevated border border-ink/5 aspect-[4/3] cursor-ew-resize select-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onKeyDown={handleKeyDown}
              style={{ touchAction: "none" }}
            >
              <div className="absolute inset-0">
                <Image
                  src={displayCases[currentCase].before_url}
                  alt="Antes del tratamiento dental"
                  fill
                  className="object-cover"
                />
              </div>

              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${position}%` }}
              >
                <Image
                  src={displayCases[currentCase].after_url}
                  alt="Después del tratamiento dental - sonrisa brillante"
                  fill
                  className="object-cover"
                  style={{ width: "100%", minWidth: "100%" }}
                />
              </div>

              <div
                className="absolute top-0 bottom-0 w-0.5 bg-gold z-10"
                style={{ left: `${position}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold shadow-glow flex items-center justify-center transition-transform duration-150 hover:scale-110">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#17302B" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 9H1M13 9h4M5 9l3-3M5 9l3 3M13 9l-3-3M13 9l-3 3" />
                  </svg>
                </div>
              </div>

              <div className="absolute top-4 left-4 bg-ink/70 backdrop-blur-sm text-paper text-[11px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full z-5">
                Antes
              </div>
              <div className="absolute top-4 right-4 bg-paper/80 backdrop-blur-sm text-ink text-[11px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full z-5">
                Después
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-[13px] text-ink/40 font-mono">Arrastrá el slider o usá las flechas del teclado para comparar</p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}