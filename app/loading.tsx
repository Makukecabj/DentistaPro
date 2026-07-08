export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-paper">
      <div className="flex flex-col items-center gap-4">
        <span className="text-5xl animate-pulse-soft" role="img" aria-label="Diente">
          🦷
        </span>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-teal animate-bounce [animation-delay:0ms]" />
          <span className="h-2 w-2 rounded-full bg-gold animate-bounce [animation-delay:150ms]" />
          <span className="h-2 w-2 rounded-full bg-teal animate-bounce [animation-delay:300ms]" />
        </div>
        <p className="font-sans text-sm text-ink/60 tracking-wide">
          Cargando...
        </p>
      </div>
    </div>
  );
}
