const TEAM = [
  { name: "Dra. Valentina Aguirre", role: "Odontóloga general · Directora", img: "https://placehold.co/400x400/2F6B5E/ffffff?text=Dra" },
  { name: "Dr. Martín Ferreyra", role: "Ortodoncista", img: "https://placehold.co/400x400/2F6B5E/ffffff?text=Dr" },
  { name: "Dra. Camila Sosa", role: "Especialista en implantes", img: "https://placehold.co/400x400/2F6B5E/ffffff?text=Dra" },
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
            <img
              src={person.img}
              alt={person.name}
              className="w-16 h-16 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="font-medium">{person.name}</h3>
            <p className="text-sm text-ink/60">{person.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
