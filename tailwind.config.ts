import type { Config } from "tailwindcss";

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
        },
        teal: {
          DEFAULT: "#2F6B5E",
          dark: "#1F3A35",
        },
        ash: "#6B7570",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
