import ChatWidget from "./ChatWidget";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p className="font-mono text-xs tracking-wide text-gold-dark uppercase mb-4">
          {/* TODO: reemplazar por la ciudad o barrio real */}
          Atención dental en tu ciudad
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
          {/* TODO: actualizar el número de WhatsApp */}
          <a
            href="https://wa.me/5490000000000"
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
