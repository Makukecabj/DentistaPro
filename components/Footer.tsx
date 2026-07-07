export default function Footer() {
  return (
    <footer className="border-t border-ink/5 py-10 mt-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-ink/40">
        <p>&copy; {new Date().getFullYear()} Estudio Dental Aguirre</p>
        <div className="flex gap-5">
          <a href="https://instagram.com/estudiodentalaguirre" className="hover:text-ink/70 transition-colors">Instagram</a>
          <a href="https://wa.me/5491145678900" className="hover:text-ink/70 transition-colors">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
