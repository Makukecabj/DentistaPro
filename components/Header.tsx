const NAV_ITEMS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#antes-despues", label: "Antes y después" },
  { href: "#equipo", label: "Equipo" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* TODO: reemplazar por el nombre real del consultorio */}
        <a href="#" className="font-display text-xl font-medium">
          Sonríe Dental
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-ink/80">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-ink transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#turno"
          className="rounded-full bg-teal-dark text-paper text-sm font-medium px-5 py-2 hover:bg-ink transition-colors"
        >
          Reservar turno
        </a>
      </div>
    </header>
  );
}
