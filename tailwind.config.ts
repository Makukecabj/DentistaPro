import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17302B",
        paper: "#F6F4EF",
        sage: "#E4ECE6",
        gold: {
          DEFAULT: "#C9974A",
          dark: "#9C6F2E",
          light: "#D4A85A",
        },
        teal: {
          DEFAULT: "#2F6B5E",
          dark: "#1F3A35",
          light: "#3A7D6E",
        },
        ash: "#6B7570",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(23, 48, 43, 0.07), 0 10px 20px -2px rgba(23, 48, 43, 0.04)",
        card: "0 4px 25px -5px rgba(23, 48, 43, 0.08), 0 10px 30px -5px rgba(23, 48, 43, 0.05)",
        elevated: "0 10px 40px -10px rgba(23, 48, 43, 0.12), 0 20px 50px -10px rgba(23, 48, 43, 0.08)",
        glow: "0 0 20px rgba(201, 151, 74, 0.3), 0 0 40px rgba(201, 151, 74, 0.15)",
        "glow-lg": "0 0 30px rgba(201, 151, 74, 0.4), 0 0 60px rgba(201, 151, 74, 0.2)",
        "glow-teal": "0 0 20px rgba(47, 107, 94, 0.3), 0 0 40px rgba(47, 107, 94, 0.15)",
        "glow-whatsapp": "0 0 20px rgba(37, 211, 102, 0.4), 0 0 40px rgba(37, 211, 102, 0.2)",
        "inner-soft": "inset 0 2px 4px 0 rgba(23, 48, 43, 0.04)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(1deg)" },
          "66%": { transform: "translateY(-6px) rotate(-1deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "slide-down": "slide-down 0.3s ease-out forwards",
        "gradient-shift": "gradient-shift 15s ease infinite",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "spin-slow": "spin-slow 3s linear infinite",
      },
    },
  },
  plugins: [typography],
};

export default config;
