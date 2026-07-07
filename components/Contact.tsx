"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre || !telefono || !mensaje) return;

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
    } catch {
      setError("No se pudo enviar el mensaje. Intentá de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section id="contacto" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
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
                    <p className="text-ink/55">+54 11 4780-2233</p>
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
                    src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=200&fit=crop&q=80"
                    alt="Fachada del consultorio Estudio Dental Aguirre en Av. Cabildo, Belgrano"
                    width={600}
                    height={200}
                    className="rounded-2xl w-full h-64 object-cover shadow-premium"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl shadow-premium p-6 space-y-4">
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-full border border-ink/10 bg-white/50 px-5 py-3.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                placeholder="Nombre"
                required
              />
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full rounded-full border border-ink/10 bg-white/50 px-5 py-3.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                placeholder="Teléfono"
                required
              />
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="w-full rounded-2xl border border-ink/10 bg-white/50 px-5 py-3.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all min-h-[120px] resize-none"
                placeholder="¿Qué necesitás?"
                required
              />
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              {enviado ? (
                <p className="text-sm text-teal-dark font-medium py-3">
                  ¡Listo! Te contactamos a la brevedad.
                </p>
              ) : (
                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full rounded-full bg-ink text-paper px-6 py-3.5 text-sm font-medium hover:bg-teal-dark hover:shadow-glow-teal transition-all duration-300 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {enviando ? "Enviando…" : "Enviar mensaje"}
                </button>
              )}
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
