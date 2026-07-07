"use client";

import { useState } from "react";
import Image from "next/image";

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
    <section id="contacto" className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="font-mono text-xs tracking-widest text-gold uppercase mb-3">
            Consultorio
          </p>
          <h2 className="font-display text-3xl font-medium">
            Vení a visitarnos
          </h2>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="space-y-3 text-ink/65 text-[15px]">
            <p>
              <span className="font-medium text-ink">Dirección</span>
              <br />
              Av. Cabildo 2450, Belgrano, CABA
            </p>
            <p>
              <span className="font-medium text-ink">Teléfono</span>
              <br />
              +54 11 4780-2233
            </p>
            <p>
              <span className="font-medium text-ink">Horarios</span>
              <br />
              Lunes a viernes 9 a 19 hs
              <br />
              Sábados 9 a 13 hs
            </p>
          </div>
          <div className="mt-4">
            {imgError ? (
              <div className="rounded-xl2 border border-ink/8 bg-sage/50 h-44 flex items-center justify-center text-ink/30 text-sm font-mono">
                Av. Cabildo 2450
              </div>
            ) : (
              <Image
                src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=192&fit=crop&q=80"
                alt="Fachada del consultorio Estudio Dental Aguirre en Av. Cabildo, Belgrano"
                width={600}
                height={176}
                className="rounded-xl2 w-full h-44 object-cover"
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-full border border-ink/10 px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
            placeholder="Nombre"
            required
          />
          <input
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full rounded-full border border-ink/10 px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
            placeholder="Teléfono"
            required
          />
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="w-full rounded-xl2 border border-ink/10 px-4 py-3 text-sm outline-none focus:border-gold transition-colors min-h-[110px] resize-none"
            placeholder="¿Qué necesitás?"
            required
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          {enviado ? (
            <p className="text-sm text-teal-dark font-medium py-2">
              ¡Listo! Te contactamos a la brevedad.
            </p>
          ) : (
            <button
              type="submit"
              disabled={enviando}
              className="rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-teal-dark transition-colors disabled:opacity-50"
            >
              {enviando ? "Enviando…" : "Enviar mensaje"}
            </button>
          )}
        </form>
      </div>
    </section>
  );
}
