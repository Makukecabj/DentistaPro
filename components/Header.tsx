"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#contacto", label: "Contacto" },
  { href: "/blog", label: "Blog" },
];

const SECTION_IDS = ["servicios", "antes-despues", "sobre-mi", "opiniones", "faq", "contacto"];

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-strong shadow-soft py-3" : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2 font-display text-lg font-medium tracking-tight text-ink hover:text-teal-dark transition-colors"
        >
          <svg className="w-7 h-7 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2C6.48 2 2 6 2 10.5c0 2.5 1.5 5 3 6.5l-1 5 5-2c1.3.7 2.6 1 4 1 5.52 0 10-4 10-8.5S17.52 2 12 2z" />
            <circle cx="8.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="15.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          <span className="hidden sm:inline">Dr. Martín Aguirre</span>
          <span className="sm:hidden">MA</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[13px] text-ink/60">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`link-premium transition-colors duration-200 ${isActive ? "text-gold font-medium" : "hover:text-ink"
                  }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="https://wa.me/5491164106698?text=Hola!%20Quiero%20un%20turno"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-[13px] text-ink/50 hover:text-gold transition-colors"
            aria-label="Contactar por WhatsApp"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>

          <a
            href="#contacto"
            className="hidden md:inline-flex rounded-full bg-gold text-ink text-[13px] font-semibold px-6 py-2.5 hover:bg-gold-dark hover:text-paper hover:shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
                className={`block h-[1.5px] bg-ink rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""
                  }`}
              />
              <span
                className={`block h-[1.5px] bg-ink rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""
                  }`}
              />
              <span
                className={`block h-[1.5px] bg-ink rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
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
            <nav className="max-w-6xl mx-auto px-5 py-6 flex flex-col gap-1">
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
                    className={`text-base font-medium transition-colors py-2.5 px-3 rounded-lg ${isActive ? "text-gold bg-gold/5" : "text-ink/70 hover:text-ink hover:bg-ink/5"
                      }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
              <motion.a
                href="#contacto"
                onClick={handleNavClick}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: NAV_ITEMS.length * 0.05 }}
                className="mt-3 rounded-full bg-gold text-ink text-sm font-semibold px-6 py-3 text-center hover:bg-gold-dark hover:text-paper transition-all duration-300"
              >
                Reservar turno
              </motion.a>
              <motion.a
                href="https://wa.me/5491164106698?text=Hola!%20Quiero%20un%20turno"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (NAV_ITEMS.length + 1) * 0.05 }}
                className="mt-2 rounded-full border border-ink/15 text-ink text-sm font-medium px-6 py-3 text-center hover:bg-ink/5 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </motion.a>
              <motion.a
                href="tel:+541164106698"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (NAV_ITEMS.length + 2) * 0.05 }}
                className="mt-2 rounded-full border border-ink/10 text-ink/60 text-sm font-medium px-6 py-3 text-center hover:bg-ink/5 transition-colors flex items-center justify-center gap-2"
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
