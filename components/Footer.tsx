export default function Footer() {
  return (
    <footer className="gradient-dark text-paper">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="font-display text-xl font-medium tracking-tight text-paper">
              Estudio Dental Aguirre
            </a>
            <p className="mt-3 text-sm text-paper/40 leading-relaxed max-w-xs">
              Consultorio odontológico en Belgrano. Turnos online las 24 horas.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-4">
              Horarios
            </h4>
            <ul className="space-y-2 text-sm text-paper/50">
              <li>Lunes a viernes: 9 a 19 hs</li>
              <li>Sábados: 9 a 13 hs</li>
              <li className="text-paper/35">Domingos cerrado</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-4">
              Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#servicios" className="text-paper/50 link-underline hover:text-paper transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#equipo" className="text-paper/50 link-underline hover:text-paper transition-colors">
                  Equipo
                </a>
              </li>
              <li>
                <a href="#opiniones" className="text-paper/50 link-underline hover:text-paper transition-colors">
                  Opiniones
                </a>
              </li>
              <li>
                <a href="#faq" className="text-paper/50 link-underline hover:text-paper transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="#turno" className="text-paper/50 link-underline hover:text-paper transition-colors">
                  Reservar turno
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-4">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm text-paper/50">
              <li>Av. Cabildo 2450</li>
              <li>Belgrano, CABA</li>
              <li>
                <a href="tel:+541147802233" className="link-underline hover:text-paper transition-colors">
                  +54 11 4780-2233
                </a>
              </li>
              <li>
                <a href="mailto:hola@estudiodentalaguirre.com" className="link-underline hover:text-paper transition-colors">
                  hola@estudiodentalaguirre.com
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href="https://instagram.com/estudiodentalaguirre"
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper/40 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://wa.me/5491145678900"
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper/40 hover:text-gold transition-colors"
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-paper/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-paper/30">
          <p>&copy; {new Date().getFullYear()} Estudio Dental Aguirre. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-paper/60 transition-colors">Política de privacidad</a>
            <a href="#" className="hover:text-paper/60 transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
