interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
      <p
        className={`font-mono text-xs tracking-[0.2em] uppercase mb-3 ${
          light ? "text-gold-light" : "text-gold"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`heading-glow font-display text-3xl md:text-4xl font-medium leading-tight ${
          light ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-[15px] leading-relaxed max-w-lg ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-paper/60" : "text-ink/50"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
