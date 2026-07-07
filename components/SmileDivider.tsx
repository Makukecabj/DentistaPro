export default function SmileDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`w-full flex justify-center py-4 ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg width="160" height="8" viewBox="0 0 160 8" fill="none">
        <defs>
          <linearGradient id="gold-gradient" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C9974A" stopOpacity="0" />
            <stop offset="50%" stopColor="#C9974A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C9974A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="4" x2="160" y2="4" stroke="url(#gold-gradient)" strokeWidth="1" />
        <circle cx="80" cy="4" r="2" fill="#C9974A" fillOpacity="0.3" />
      </svg>
    </div>
  );
}
