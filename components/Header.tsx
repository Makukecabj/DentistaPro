"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#equipo", label: "Equipo" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#contacto", label: "Contacto" },
];

const SECTION_IDS = ["servicios", "antes-despues", "equipo", "testimonios", "opiniones", "faq", "contacto"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-strong shadow-soft py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-display text-lg font-medium tracking-tight text-ink hover:text-teal-dark transition-colors">
          Estudio Dental Aguirre
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[13px] text-ink/60">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`link-premium transition-colors duration-200 ${
                  isActive ? "text-gold font-medium" : "hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+541147802233"
            className="hidden md:inline-flex items-center gap-1.5 text-[13px] text-ink/50 hover:text-gold transition-colors"
            aria-label="Llamar al consultorio"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2.5 4.167A1.667 1.667 0 014.167 2.5h2.5a.833.833 0 01.801.617l.9 3.167a.833.833 0 01-.208.791l-1.25 1.25a10.833 10.833 0 004.933 4.933l1.25-1.25a.833.833 0 01.791-.208l3.167.9a.833.833 0 01.617.801v2.5a1.667 1.667 0 01-1.667 1.667C7.5 17.5 2.5 12.5 2.5 4.167z" />
            </svg>
            11 4780-2233
          </a>

          <a
            href="#turno"
            className="hidden md:inline-flex rounded-full bg-ink text-paper text-[13px] font-medium px-5 py-2.5 hover:bg-teal-dark hover:shadow-glow-teal transition-all duration-300 hover:scale-[1.02]"
          >
            Reservar turno
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-ink/5 transition-colors"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`block h-[1.5px] bg-ink rounded-full transition-all duration-300 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] bg-ink rounded-full transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] bg-ink rounded-full transition-all duration-300 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden glass-strong border-t border-ink/5 overflow-hidden"
          >
            <nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`text-base font-medium transition-colors py-2.5 px-3 rounded-lg ${
                      isActive
                        ? "text-gold bg-gold/5"
                        : "text-ink/70 hover:text-ink hover:bg-ink/5"
                    }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
              <motion.a
                href="#turno"
                onClick={handleNavClick}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: NAV_ITEMS.length * 0.05 }}
                className="mt-3 rounded-full bg-ink text-paper text-sm font-medium px-6 py-3 text-center hover:bg-teal-dark transition-colors"
              >
                Reservar turno
              </motion.a>
              <motion.a
                href="tel:+541147802233"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (NAV_ITEMS.length + 1) * 0.05 }}
                className="mt-2 rounded-full border border-ink/15 text-ink text-sm font-medium px-6 py-3 text-center hover:bg-ink/5 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2.5 4.167A1.667 1.667 0 014.167 2.5h2.5a.833.833 0 01.801.617l.9 3.167a.833.833 0 01-.208.791l-1.25 1.25a10.833 10.833 0 004.933 4.933l1.25-1.25a.833.833 0 01.791-.208l3.167.9a.833.833 0 01.617.801v2.5a1.667 1.667 0 01-1.667 1.667C7.5 17.5 2.5 12.5 2.5 4.167z" />
                </svg>
                Llamar
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
