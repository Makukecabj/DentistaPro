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
              Consultorio odontologico premium en Belgrano. Turnos online las 24 horas.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-4">
              Horarios
            </h4>
            <ul className="space-y-2 text-sm text-paper/50">
              <li>Lunes a viernes: 9 a 19 hs</li>
              <li>Sabados: 9 a 13 hs</li>
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
              Links
            </h4>
            <ul className="space-y-2 text-sm text-paper/50">
              <li>
                <a href="#servicios" className="link-underline hover:text-paper transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#equipo" className="link-underline hover:text-paper transition-colors">
                  Equipo
                </a>
              </li>
              <li>
                <a href="#opiniones" className="link-underline hover:text-paper transition-colors">
                  Opiniones
                </a>
              </li>
              <li>
                <a href="#faq" className="link-underline hover:text-paper transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="/blog" className="link-underline hover:text-paper transition-colors">
                  Blog
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
                href="https://wa.me/5491147802233?text=Hola!%20Quiero%20informaci%C3%B3n"
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

        <div className="border-t border-paper/10 pt-8 mb-8">
          <a
            href="https://wa.me/5491147802233?text=Hola!%20Quiero%20reservar%20un%20turno"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:bg-gold-dark hover:text-paper hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Reserva tu turno por WhatsApp
            <span>&rarr;</span>
          </a>
        </div>

        <div className="border-t border-paper/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-paper/30">
          <p>&copy; {new Date().getFullYear()} Estudio Dental Aguirre. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-paper/60 transition-colors">Politica de privacidad</a>
            <a href="#" className="hover:text-paper/60 transition-colors">Terminos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
