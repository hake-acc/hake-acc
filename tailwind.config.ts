import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ["'Pixelify Sans'", "var(--font-pixel)", "sans-serif"],
        retro: ["'Press Start 2P'", "var(--font-retro)", "monospace"],
        silkscreen: ["'Silkscreen'", "var(--font-silkscreen)", "monospace"],
        vt323: ["'VT323'", "var(--font-vt323)", "monospace"],
        mono: ["'Space Mono'", "var(--font-mono)", "monospace"],
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
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "scan-line": "scanLine 8s linear infinite",
        "pixel-blink": "pixelBlink 1s steps(1) infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-3px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 12px rgba(244,184,96,0.3)" },
          "50%": { boxShadow: "0 0 24px rgba(244,184,96,0.7)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        pixelBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-primary": "0 0 20px rgba(106,169,255,0.35)",
        "glow-accent": "0 0 20px rgba(244,184,96,0.45)",
        "glow-secondary": "0 0 20px rgba(139,124,246,0.35)",
        "pixel-sm": "2px 2px 0px rgba(0,0,0,0.8)",
        "pixel-md": "3px 3px 0px rgba(0,0,0,0.9)",
        "pixel-accent": "3px 3px 0px #F4B860",
        "pixel-primary": "3px 3px 0px #6AA9FF",
        "pixel-inset": "inset 1px 1px 0px rgba(255,255,255,0.15), inset -1px -1px 0px rgba(0,0,0,0.5)",
        "card": "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;

