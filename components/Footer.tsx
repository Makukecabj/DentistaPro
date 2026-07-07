export default function Footer() {
  return (
    <footer className="gradient-dark text-paper">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 font-display text-xl font-medium tracking-tight text-paper">
              <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C6.48 2 2 6 2 10.5c0 2.5 1.5 5 3 6.5l-1 5 5-2c1.3.7 2.6 1 4 1 5.52 0 10-4 10-8.5S17.52 2 12 2z" />
                <circle cx="8.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
                <circle cx="15.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              Estudio Dental Aguirre
            </a>
            <p className="mt-3 text-sm text-paper/40 leading-relaxed max-w-xs">
              Consultorio odontológico premium en Belgrano. Turnos online las 24 horas.
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
              Especialidades
            </h4>
            <ul className="space-y-2 text-sm text-paper/50">
              <li>Limpieza dental</li>
              <li>Blanqueamiento</li>
              <li>Ortodoncia invisible</li>
              <li>Implantes dentales</li>
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
                href="https://wa.me/5491147802233"
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
