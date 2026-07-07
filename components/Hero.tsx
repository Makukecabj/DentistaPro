"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const TRUST_ITEMS = [
  { icon: "shield", text: "Tecnología digital" },
  { icon: "heart", text: "Atención personalizada" },
  { icon: "clock", text: "Turnos sin esperar" },
  { icon: "badge", text: "Especialistas certificados" },
];

function TrustIcon({ icon }: { icon: string }) {
  if (icon === "shield")
    return (
      <svg className="w-3.5 h-3.5 text-teal" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 1L2 3.5v4c0 3.5 2.6 6.8 6 7.5 3.4-.7 6-4 6-7.5v-4L8 1z" />
        <path d="M5.5 8l2 2 3.5-4" />
      </svg>
    );
  if (icon === "heart")
    return (
      <svg className="w-3.5 h-3.5 text-teal" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 14s-5.5-3.5-5.5-7A3 3 0 018 4a3 3 0 015.5 3c0 3.5-5.5 7-5.5 7z" />
      </svg>
    );
  if (icon === "clock")
    return (
      <svg className="w-3.5 h-3.5 text-teal" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 4.5V8l2.5 1.5" />
      </svg>
    );
  return (
    <svg className="w-3.5 h-3.5 text-teal" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9l-3 1.5.5-3.5L3 4.5 6.5 4 8 1z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-ink">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/images/hero/fondo.jpg"
            alt="Consultorio dental moderno"
            fill
            priority
            className="object-cover kenburns"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/30" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-24 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-xs tracking-[0.25em] text-gold uppercase mb-5"
          >
            Belgrano, CABA
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-[2.25rem] md:text-[3.5rem] font-medium leading-[1.08] mb-6 tracking-tight text-paper"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            Tu sonrisa merece
            <br />
            <span className="text-gold">un equipo de excelencia.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-paper/80 text-lg mb-10 max-w-md leading-relaxed"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.2)" }}
          >
            Especialistas en Belgrano con tecnología de última generación.
            Reservá tu turno online en segundos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <a
              href="#turno"
              className="group rounded-full bg-paper text-ink px-8 py-4 text-sm font-medium hover:bg-gold hover:text-ink hover:shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Reservar turno
              <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </a>
            <a
              href="https://wa.me/5491145678900"
              className="rounded-full border border-paper/30 text-paper px-8 py-4 text-sm font-medium hover:border-paper/50 hover:bg-white/10 transition-all duration-300"
            >
              WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-x-5 gap-y-2 mb-10"
          >
            {TRUST_ITEMS.map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-[13px] text-paper/65">
                <TrustIcon icon={item.icon} />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center gap-4 text-[13px] text-paper/55"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 14 14" fill="#C9974A">
                    <path d="M7 0L8.6 4.6H13.5L9.6 7.4L11.1 12L7 9.2L2.9 12L4.4 7.4L0.5 4.6H5.4L7 0Z" />
                  </svg>
                ))}
              </div>
              <span>4.9 en Google</span>
            </div>
            <div className="w-px h-4 bg-paper/20" />
            <span>Más de 500 pacientes</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
