const NAV_ITEMS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#equipo", label: "Equipo" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-paper/80 backdrop-blur-md border-b border-ink/5">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-display text-lg font-medium tracking-tight">
          Estudio Dental Aguirre
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[13px] text-ink/60">
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
          className="rounded-full bg-ink text-paper text-[13px] font-medium px-4 py-2 hover:bg-teal-dark transition-colors"
        >
          Reservar turno
        </a>
      </div>
    </header>
  );
}
