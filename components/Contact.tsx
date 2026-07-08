"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";

export default function Contact() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [imgError, setImgError] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const nombreValid = nombre.trim().length >= 2;
  const telefonoValid = telefono.trim().length >= 8;
  const mensajeValid = mensaje.trim().length >= 5;
  const formValid = nombreValid && telefonoValid && mensajeValid;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid) return;

    setEnviando(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, telefono, mensaje }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Error al enviar");
      }

      setEnviado(true);
      setNombre("");
      setTelefono("");
      setMensaje("");
      setTouched({});
    } catch {
      setError("No se pudo enviar el mensaje. Intentá de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  function getInputClass(field: string, valid: boolean) {
    const base = "w-full rounded-2xl border bg-white/50 px-5 py-3.5 text-sm outline-none transition-all";
    if (!touched[field]) return `${base} border-ink/10 focus:border-gold focus:ring-2 focus:ring-gold/20`;
    return valid
      ? `${base} border-teal/30 focus:border-teal focus:ring-2 focus:ring-teal/20`
      : `${base} border-error/30 focus:border-error focus:ring-2 focus:ring-error/20`;
  }

  return (
    <section id="contacto" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <SectionReveal>
          <SectionHeading
            eyebrow="Consultorio"
            title="Vení a visitarnos"
          />
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-12">
          <SectionReveal delay={0.1}>
            <div className="space-y-6">
              <div className="space-y-5 text-[15px]">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 1C6.13 1 3 4.13 3 8c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7z" />
                    <circle cx="10" cy="8" r="2.5" />
                  </svg>
                  <div>
                    <p className="font-medium text-ink">Dirección</p>
                    <p className="text-ink/55">Av. Cabildo 2450, Belgrano, CABA</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 5.5A2.5 2.5 0 015.5 3h9A2.5 2.5 0 0117 5.5v5a2.5 2.5 0 01-2.5 2.5H12l-3 3-3-3H5.5A2.5 2.5 0 013 10.5v-5z" />
                  </svg>
                  <div>
                    <p className="font-medium text-ink">Teléfono</p>
                    <a href="tel:+541164106698" className="text-ink/55 hover:text-gold transition-colors">
                      +54 11 6410-6698
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="10" cy="10" r="8" />
                    <path d="M10 5v5l3.5 2" />
                  </svg>
                  <div>
                    <p className="font-medium text-ink">Horarios</p>
                    <p className="text-ink/55">Lunes a viernes 9 a 19 hs</p>
                    <p className="text-ink/55">Sábados 9 a 13 hs</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {imgError ? (
                  <div className="rounded-2xl border border-ink/8 bg-sage/50 h-64 flex items-center justify-center text-ink/30 text-sm font-mono">
                    Av. Cabildo 2450
                  </div>
                ) : (
                  <Image
                    src="/images/contact/consultorio-ext.jpg"
                    alt="Fachada del Estudio Dental Aguirre en Av. Cabildo, Belgrano"
                    width={800}
                    height={500}
                    className="rounded-2xl w-full h-64 object-cover shadow-premium"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>

              <div className="rounded-2xl overflow-hidden shadow-premium border border-ink/5 h-64">
                <iframe
                  src="https://www.google.com/maps?q=Av.+Cabildo+2450,+Belgrano,+CABA&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación del Estudio Dental Aguirre en Av. Cabildo 2450, Belgrano"
                />
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="glass rounded-2xl shadow-premium p-6 space-y-4" noValidate>
                <div>
                  <label htmlFor="nombre" className="block text-[13px] font-medium text-ink/60 mb-1.5">Nombre</label>
                  <input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, nombre: true }))}
                    className={getInputClass("nombre", nombreValid)}
                    placeholder="Tu nombre"
                    required
                    autoComplete="name"
                  />
                  {touched.nombre && !nombreValid && (
                    <p className="text-[12px] text-error mt-1">Ingresá tu nombre (mínimo 2 caracteres)</p>
                  )}
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-[13px] font-medium text-ink/60 mb-1.5">Teléfono</label>
                  <input
                    id="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, telefono: true }))}
                    className={getInputClass("telefono", telefonoValid)}
                    placeholder="+54 11 1234-5678"
                    required
                    autoComplete="tel"
                  />
                  {touched.telefono && !telefonoValid && (
                    <p className="text-[12px] text-error mt-1">Ingresá un número de teléfono válido</p>
                  )}
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-[13px] font-medium text-ink/60 mb-1.5">¿Qué necesitás?</label>
                  <textarea
                    id="mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, mensaje: true }))}
                    className={`${getInputClass("mensaje", mensajeValid)} min-h-[120px] resize-none`}
                    placeholder="Contanos qué tratamiento te interesa..."
                    required
                  />
                  {touched.mensaje && !mensajeValid && (
                    <p className="text-[12px] text-error mt-1">Escribí tu consulta (mínimo 5 caracteres)</p>
                  )}
                </div>
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-error/5 border border-error/10">
                    <svg className="w-4 h-4 text-error shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="8" cy="8" r="6" />
                      <path d="M8 5v3M8 10v.5" />
                    </svg>
                    <p className="text-sm text-error">{error}</p>
                  </div>
                )}
                <AnimatePresence mode="wait">
                  {enviado ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 py-4 justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 text-teal" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 10l4 4 8-8" />
                        </svg>
                      </motion.div>
                      <p className="text-sm text-teal-dark font-medium">
                        ¡Mensaje enviado! Te contactamos a la brevedad.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="button"
                      type="submit"
                      disabled={enviando || !formValid}
                      className="w-full rounded-full bg-ink text-paper px-6 py-3.5 text-sm font-medium hover:bg-teal-dark hover:shadow-glow-teal transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      {enviando ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        "Enviar mensaje"
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>

              <a
                href="https://wa.me/5491164106698?text=Hola!%20Quiero%20m%C3%A1s%20informaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border border-ink/10 bg-white/30 py-3.5 text-sm text-ink/60 hover:text-gold hover:bg-gold/5 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                ¿Preferís WhatsApp? Escribinos
              </a>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
