import Image from "next/image";
import ChatWidget from "./ChatWidget";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-16 items-center">
      <div>
        <p className="font-mono text-xs tracking-widest text-gold uppercase mb-5">
          Belgrano, CABA
        </p>
        <h1 className="font-display text-4xl md:text-[2.75rem] font-medium leading-[1.15] mb-6">
          Sacá turno sin
          <br />
          <span className="text-teal-dark">llamar por teléfono.</span>
        </h1>
        <p className="text-ink/60 text-lg mb-10 max-w-md leading-relaxed">
          Elegí el día, elegí la hora, y listo. El consultorio te confirma al toque.
          Sin colas, sin esperas, sin vueltas.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#turno"
            className="rounded-full bg-ink text-paper px-7 py-3.5 text-sm font-medium hover:bg-teal-dark transition-colors"
          >
            Reservar turno
          </a>
          <a
            href="https://wa.me/5491145678900"
            className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium hover:border-ink/40 hover:bg-ink/5 transition-all"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div id="turno" className="flex justify-center md:justify-end scroll-mt-24">
        <ChatWidget />
      </div>
    </section>
  );
}
