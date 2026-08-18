import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ["var(--font-pixelify)", "'Pixelify Sans'", "monospace"],
      },
      colors: {
        primary: "#6AA9FF",
        secondary: "#8B7CF6",
        accent: "#F4B860",
        background: "#0D0F14",
        surface: "#1A1F2B",
        "text-main": "#F5F7FA",
        "text-muted": "#A7B0C0",
        border: "rgba(255,255,255,0.08)",
        success: "#4ADE80",
        warning: "#FBBF24",
        error: "#F87171",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "scan-line": "scanLine 8s linear infinite",
        "pixel-blink": "pixelBlink 1s steps(1) infinite",
        "typewriter": "typewriter 2.5s steps(40) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 12px rgba(244,184,96,0.3)" },
          "50%": { boxShadow: "0 0 28px rgba(244,184,96,0.7)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        pixelBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-primary": "0 0 20px rgba(106,169,255,0.3)",
        "glow-accent": "0 0 20px rgba(244,184,96,0.4)",
        "glow-secondary": "0 0 20px rgba(139,124,246,0.3)",
        "card": "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
