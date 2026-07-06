export default function SmileDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`w-full flex justify-center py-6 ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg width="120" height="24" viewBox="0 0 120 24" fill="none">
        <path
          d="M4 4C20 22 100 22 116 4"
          stroke="#C9974A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
