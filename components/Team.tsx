// TODO: reemplazar por los profesionales reales del consultorio
const TEAM = [
  { name: "Dra. Ejemplo Apellido", role: "Odontóloga general", initials: "EA" },
  { name: "Dr. Ejemplo Apellido", role: "Ortodoncista", initials: "EA" },
  { name: "Dra. Ejemplo Apellido", role: "Especialista en implantes", initials: "EA" },
];

export default function Team() {
  return (
    <section id="equipo" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="font-display text-3xl font-medium mb-10">
        Nuestro equipo
      </h2>
      <div className="grid sm:grid-cols-3 gap-6">
        {TEAM.map((person) => (
          <div
            key={person.name}
            className="rounded-xl2 border border-ink/10 bg-white p-6 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-teal-dark text-paper flex items-center justify-center font-display text-lg mb-4">
              {person.initials}
            </div>
            <h3 className="font-medium">{person.name}</h3>
            <p className="text-sm text-ink/60">{person.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
