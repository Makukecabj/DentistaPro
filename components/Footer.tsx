export default function Footer() {
  return (
    <footer className="border-t border-ink/10 py-8 mt-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink/50">
        <p>© {new Date().getFullYear()} Estudio Dental Aguirre. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          <a href="https://instagram.com/estudiodentalaguirre" className="hover:text-ink/80">Instagram</a>
          <a href="https://wa.me/5491145678900" className="hover:text-ink/80">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
