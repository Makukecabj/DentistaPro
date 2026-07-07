const REVIEWS = [
  {
    name: "Martín S.",
    date: "hace 2 semanas",
    text: "Entré a las 11 de la noche un domingo y a los 2 minutos ya tenía turno para el martes. Impecable.",
    rating: 5,
  },
  {
    name: "Lucía P.",
    date: "hace 1 mes",
    text: "La Dra. Aguirre te explica todo sin apuro. Me hizo sentir tranquila desde la primera consulta.",
    rating: 5,
  },
  {
    name: "Carlos R.",
    date: "hace 3 semanas",
    text: "Venía postergando hace años. El chat me facilitó todo. Hoy salí con la limpieza hecha y sin dolor.",
    rating: 5,
  },
];

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="#C9974A">
      <path d="M7 0L8.6 4.6H13.5L9.6 7.4L11.1 12L7 9.2L2.9 12L4.4 7.4L0.5 4.6H5.4L7 0Z" />
    </svg>
  );
}

export default function Reviews() {
  return (
    <section id="opiniones" className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="font-mono text-xs tracking-widest text-gold uppercase mb-3">
            Google
          </p>
          <h2 className="font-display text-3xl font-medium">
            Lo que dicen
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-ink/50">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} />
            ))}
          </div>
          <span>4.9 en Google</span>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-5">
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="rounded-xl2 border border-ink/8 bg-white p-6 hover:shadow-md hover:shadow-ink/5 transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <span className="font-mono text-xs text-ink/35">{r.date}</span>
            </div>
            <p className="text-sm text-ink/70 mb-4 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
            <p className="font-medium text-sm">{r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
