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
  const cls = "w-3.5 h-3.5 text-gold";
  if (icon === "shield")
    return (
      <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 1L2 3.5v4c0 3.5 2.6 6.8 6 7.5 3.4-.7 6-4 6-7.5v-4L8 1z" />
        <path d="M5.5 8l2 2 3.5-4" />
      </svg>
    );
  if (icon === "heart")
    return (
      <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 14s-5.5-3.5-5.5-7A3 3 0 018 4a3 3 0 015.5 3c0 3.5-5.5 7-5.5 7z" />
      </svg>
    );
  if (icon === "clock")
    return (
      <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 4.5V8l2.5 1.5" />
      </svg>
    );
  return (
    <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9l-3 1.5.5-3.5L3 4.5 6.5 4 8 1z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-ink">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/images/hero/sala.png"
            alt="Sala de espera del Dr. Martín Aguirre en Belgrano"
            fill
            priority
            className="object-cover kenburns"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/85 to-ink/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #C9974A 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #2F6B5E 0%, transparent 70%)" }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[35%] left-[20%] w-2 h-2 rounded-full bg-gold/20"
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[60%] right-[25%] w-1.5 h-1.5 rounded-full bg-gold/15"
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-[45%] right-[8%] w-2.5 h-2.5 rounded-full bg-gold/10"
          animate={{ y: [0, -25, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <svg className="absolute top-[30%] right-[10%] w-[400px] h-[400px] opacity-[0.03]" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="150" stroke="#C9974A" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="100" stroke="#C9974A" strokeWidth="0.3" />
          <circle cx="200" cy="200" r="50" stroke="#C9974A" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 pt-28 pb-20 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 glass-dark rounded-full px-4 py-2 mb-8"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 14 14" fill="#C9974A">
                  <path d="M7 0L8.6 4.6H13.5L9.6 7.4L11.1 12L7 9.2L2.9 12L4.4 7.4L0.5 4.6H5.4L7 0Z" />
                </svg>
              ))}
            </div>
            <span className="text-[12px] font-medium text-paper/80">4.9 en Google</span>
            <span className="text-[12px] text-paper/40">&middot;</span>
            <span className="text-[12px] text-paper/60">127 opiniones verificadas</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-[2.5rem] md:text-[4rem] font-medium leading-[1.05] mb-6 tracking-tight text-paper"
            style={{ textShadow: "0 2px 40px rgba(0,0,0,0.6), 0 4px 60px rgba(0,0,0,0.3)" }}
          >
            Tu sonrisa merece
            <br />
            <span className="text-gold">excelencia.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-paper/75 text-lg md:text-xl mb-10 max-w-lg leading-relaxed"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.15)" }}
          >
            Especialistas certificados en Belgrano con tecnología de última generación. Reservá tu turno online en segundos.
          </motion.p>

          {/* Botones full width en mobile, alto mínimo 44px para touch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mb-10"
          >
            <a
              href="#contacto"
              className="group relative rounded-full bg-gold px-8 py-4 sm:py-5 text-[15px] font-semibold text-ink transition-all duration-300 hover:bg-gold-dark hover:text-paper hover:shadow-glow-lg hover:scale-[1.03] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink overflow-hidden w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Reservá tu turno
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </span>
            </a>
            <a
              href="https://wa.me/5491164106698?text=Hola!%20Quiero%20agendar%20un%20turno"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-paper/25 text-paper px-8 py-4 sm:py-5 text-[15px] font-medium hover:border-paper/50 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto text-center"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-x-5 gap-y-2 mb-12"
          >
            {TRUST_ITEMS.map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-[13px] text-paper/60">
                <TrustIcon icon={item.icon} />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap items-center gap-4 text-[13px] text-paper/50"
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
            <div className="w-px h-4 bg-paper/20" />
            <span>15+ años de experiencia</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}