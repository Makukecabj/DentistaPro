import Image from "next/image";

const SERVICES = [
  {
    name: "Limpieza",
    desc: "Sacamos todo lo que el cepillo no puede. Te vas con la boca como nueva.",
    imgSrc: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop&q=80",
    alt: "Dentista realizando limpieza dental con espejo y sonda",
  },
  {
    name: "Blanqueamiento",
    desc: "Resultado real, sin filtros. Blancura natural que se ve sana, no artificial.",
    imgSrc: "https://images.unsplash.com/photo-1598026252792-a95f8bbad7a6?w=400&h=300&fit=crop&q=80",
    alt: "Sonrisa blanca y brillante después de blanqueamiento dental",
  },
  {
    name: "Ortodoncia",
    desc: "Brackets, alineadores, lo que necesites. Sin que se note tanto.",
    imgSrc: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop&q=80",
    alt: "Paciente colocándose alineadores transparentes de ortodoncia",
  },
  {
    name: "Implantes",
    desc: "Piezas dentales que parecen naturales. Porque lo son.",
    imgSrc: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop&q=80",
    alt: "Dentista analizando radiografías de implantes dentales",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="font-mono text-xs tracking-widest text-gold uppercase mb-3">
            Tratamientos
          </p>
          <h2 className="font-display text-3xl font-medium">
            Qué hacemos
          </h2>
        </div>
        <p className="text-ink/50 text-sm hidden md:block max-w-xs text-right">
          Cada tratamiento es distinto. Cada paciente también.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {SERVICES.map((s, i) => (
          <div
            key={s.name}
            className={`group rounded-xl2 overflow-hidden border border-ink/8 bg-white hover:shadow-lg hover:shadow-ink/5 transition-all duration-300 ${
              i === 0 ? "sm:row-span-2" : ""
            }`}
          >
            <div className="relative overflow-hidden">
              <Image
                src={s.imgSrc}
                alt={s.alt}
                width={400}
                height={300}
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                  i === 0 ? "h-48 sm:h-full" : "h-48"
                }`}
              />
            </div>
            <div className="p-5">
              <h3 className="font-medium text-lg mb-1">{s.name}</h3>
              <p className="text-sm text-ink/55 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
