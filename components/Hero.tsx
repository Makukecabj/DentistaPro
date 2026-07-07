"use client";

import { motion } from "framer-motion";
import ChatWidget from "./ChatWidget";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-teal/5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-24 grid md:grid-cols-2 gap-16 items-center w-full">
        <div>
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
            className="font-display text-[2.75rem] md:text-[3.5rem] font-medium leading-[1.1] mb-6 tracking-tight"
          >
            Sacá turno sin
            <br />
            <span className="text-teal-dark">llamar por teléfono.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-ink/55 text-lg mb-10 max-w-md leading-relaxed"
          >
            Elegí el día, elegí la hora, y listo. El consultorio te confirma al toque.
            Sin colas, sin esperas, sin vueltas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#turno"
              className="group rounded-full bg-ink text-paper px-8 py-4 text-sm font-medium hover:bg-teal-dark hover:shadow-glow-teal transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Reservar turno
              <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </a>
            <a
              href="https://wa.me/5491145678900"
              className="rounded-full border border-ink/15 px-8 py-4 text-sm font-medium hover:border-ink/30 hover:bg-ink/5 transition-all duration-300"
            >
              WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex items-center gap-6 text-[13px] text-ink/40"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-soft" />
              <span>Disponible 24/7</span>
            </div>
            <div className="w-px h-4 bg-ink/10" />
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 1L8.8 4.6H13L9.6 7L10.8 11L7 8.6L3.2 11L4.4 7L1 4.6H5.2L7 1Z" />
              </svg>
              <span>4.9 en Google</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          id="turno"
          className="flex justify-center md:justify-end scroll-mt-24"
        >
          <ChatWidget />
        </motion.div>
      </div>
    </section>
  );
}
