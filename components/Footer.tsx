export default function Footer() {
  return (
    <footer className="border-t border-ink/10 py-8 mt-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink/50">
        <p>© {new Date().getFullYear()} Sonríe Dental. Todos los derechos reservados.</p>
        {/* TODO: reemplazar por los links reales de redes sociales */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-ink/80">Instagram</a>
          <a href="#" className="hover:text-ink/80">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
