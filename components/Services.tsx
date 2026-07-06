// TODO: ajustar la lista real de servicios del consultorio
const SERVICES = [
  {
    name: "Limpieza dental",
    desc: "Control y limpieza profesional para mantener tu salud bucal al día.",
  },
  {
    name: "Blanqueamiento",
    desc: "Tratamiento estético para recuperar el brillo natural de tu sonrisa.",
  },
  {
    name: "Ortodoncia",
    desc: "Brackets tradicionales o alineadores, según lo que necesites.",
  },
  {
    name: "Implantes",
    desc: "Reemplazo de piezas dentales con materiales de primera calidad.",
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
            className="rounded-xl2 border border-ink/10 bg-white p-6 hover:border-gold/60 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center mb-4">
              <span className="w-2 h-2 rounded-full bg-teal-dark" />
            </div>
            <h3 className="font-medium mb-2">{s.name}</h3>
            <p className="text-sm text-ink/65">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
