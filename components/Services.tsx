import Image from "next/image";

const SERVICES = [
  {
    name: "Limpieza dental",
    desc: "Control y limpieza profesional para mantener tu salud bucal al día.",
    imgSrc: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop&q=80",
    alt: "Dentista realizando limpieza dental con espejo y sonda",
  },
  {
    name: "Blanqueamiento",
    desc: "Tratamiento estético para recuperar el brillo natural de tu sonrisa.",
    imgSrc: "https://images.unsplash.com/photo-1598026252792-a95f8bbad7a6?w=400&h=300&fit=crop&q=80",
    alt: "Sonrisa blanca y brillante después de blanqueamiento dental",
  },
  {
    name: "Ortodoncia",
    desc: "Brackets tradicionales o alineadores, según lo que necesites.",
    imgSrc: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop&q=80",
    alt: "Paciente colocándose alineadores transparentes de ortodoncia",
  },
  {
    name: "Implantes",
    desc: "Reemplazo de piezas dentales con materiales de primera calidad.",
    imgSrc: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop&q=80",
    alt: "Dentista analizando radiografías de implantes dentales",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="font-display text-3xl font-medium mb-10">
        Qué hacemos
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((s) => (
          <div
            key={s.name}
            className="rounded-xl2 border border-ink/10 bg-white overflow-hidden hover:border-gold/60 transition-colors"
          >
            <Image
              src={s.imgSrc}
              alt={s.alt}
              width={400}
              height={300}
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="font-medium mb-2">{s.name}</h3>
              <p className="text-sm text-ink/65">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
