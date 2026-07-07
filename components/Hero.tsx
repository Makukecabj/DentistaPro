import Image from "next/image";
import ChatWidget from "./ChatWidget";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <Image
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop&q=80"
          alt="Consultorio dental moderno en Belgrano, CABA"
          width={600}
          height={400}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="rounded-xl2 w-full h-auto object-cover mb-8"
        />
        <p className="font-mono text-xs tracking-wide text-gold-dark uppercase mb-4">
          Atención dental en Belgrano, CABA
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-medium leading-tight mb-6">
          Tu próximo turno, en menos de un minuto.
        </h1>
        <p className="text-ink/70 text-lg mb-8 max-w-md">
          Reservá tu hora las 24 horas, sin llamar ni esperar a que atiendan
          el teléfono. El consultorio confirma automáticamente.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#turno"
            className="rounded-full bg-teal-dark text-paper px-6 py-3 text-sm font-medium hover:bg-ink transition-colors"
          >
            Reservar turno ahora
          </a>
          <a
            href="https://wa.me/5491145678900"
            className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium hover:border-ink/40 transition-colors"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>

      <div id="turno" className="flex justify-center md:justify-end scroll-mt-24">
        <ChatWidget />
      </div>
    </section>
  );
}
