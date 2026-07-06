// TODO: reemplazar por reseñas reales, idealmente traídas de Google
const REVIEWS = [
  {
    name: "Paciente A.",
    text: "Reservé el turno por chat un domingo a la noche y me confirmaron enseguida.",
  },
  {
    name: "Paciente B.",
    text: "Muy buena atención, y lo de sacar turno online sin llamar es un golazo.",
  },
  {
    name: "Paciente C.",
    text: "El tratamiento quedó perfecto, se nota la diferencia en las fotos de antes y después.",
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
    <section id="opiniones" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="font-display text-3xl font-medium mb-10">
        Lo que dicen nuestros pacientes
      </h2>
      <div className="grid sm:grid-cols-3 gap-6">
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="rounded-xl2 border border-ink/10 bg-white p-6"
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>
            <p className="text-sm text-ink/75 mb-4">&ldquo;{r.text}&rdquo;</p>
            <p className="font-mono text-xs text-ink/50">{r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
