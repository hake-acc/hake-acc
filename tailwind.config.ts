import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        retro: ["'Press Start 2P'", "var(--font-retro)", "monospace"],
        silkscreen: ["'Silkscreen'", "var(--font-silkscreen)", "monospace"],
        pixel: ["'Pixelify Sans'", "var(--font-pixel)", "sans-serif"],
        sans: ["'Inter'", "var(--font-readable)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Space Mono'", "var(--font-mono-readable)", "monospace"],
        vt323: ["'VT323'", "var(--font-vt323)", "monospace"],
      },
      colors: {
        canvas: "#090a0f",
        surface: "#131622",
        "surface-elevated": "#1a1e2e",
        border: "#262a3d",
        "border-bright": "#3b425e",
        amber: {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
          dark: "#d97706",
        },
        cyan: {
          DEFAULT: "#38bdf8",
          light: "#7dd3fc",
          dark: "#0284c7",
        },
        purple: {
          DEFAULT: "#818cf8",
          light: "#a5b4fc",
          dark: "#6366f1",
        },
        accent: "#f59e0b",
        primary: "#38bdf8",
        secondary: "#818cf8",
        background: "#090a0f",
        "text-main": "#f8fafc",
        "text-muted": "#94a3b8",
        "text-dim": "#64748b",
        success: "#10b981",
        warning: "#fbbf24",
        error: "#f43f5e",
      },
      boxShadow: {
        "pixel-sm": "2px 2px 0px rgba(0,0,0,0.85)",
        "pixel-md": "4px 4px 0px rgba(0,0,0,0.9)",
        "pixel-amber": "3px 3px 0px #f59e0b",
        "glow-amber": "0 0 20px rgba(245,158,11,0.4)",
        "glow-cyan": "0 0 20px rgba(56,189,248,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
