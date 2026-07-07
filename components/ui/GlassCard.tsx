"use client";

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <div
      className={`
        glass rounded-2xl shadow-premium
        ${hover ? "transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1.5" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
