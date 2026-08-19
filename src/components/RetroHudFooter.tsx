import { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Mail,
  Sparkles,
  Tv,
  Volume2,
  VolumeX,
  Gamepad2,
  Check,
  Copy,
} from "lucide-react";
import { isSoundEnabled, toggleSound, playClick, playCoin, playBlip } from "@/lib/sound";
import { isCrtEnabled, toggleCrt } from "@/components/CrtOverlay";

export default function RetroHudFooter() {
  const coordsRef = useRef<HTMLSpanElement>(null);
  const [sfxOn, setSfxOn] = useState(true);
  const [crtOn, setCrtOn] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    setSfxOn(isSoundEnabled());
    setCrtOn(isCrtEnabled());

    const handleSfxToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setSfxOn(customEvent.detail);
    };

    const handleCrtToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setCrtOn(customEvent.detail);
    };

    window.addEventListener("sfx-toggle", handleSfxToggle);
    window.addEventListener("crt-toggle", handleCrtToggle);

    // High performance cursor coordinate tracking using requestAnimationFrame
    let rAF: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        if (coordsRef.current) {
          const x = String(Math.round(e.clientX)).padStart(4, "0");
          const y = String(Math.round(e.clientY)).padStart(4, "0");
          coordsRef.current.textContent = `X:${x} Y:${y}`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("sfx-toggle", handleSfxToggle);
      window.removeEventListener("crt-toggle", handleCrtToggle);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rAF);
    };
  }, []);

  const handleToggleSfx = () => {
    const next = toggleSound();
    setSfxOn(next);
  };

  const handleToggleCrt = () => {
    playClick();
    const next = toggleCrt();
    setCrtOn(next);
  };

  const handleTriggerKonami = () => {
    playCoin();
    window.dispatchEvent(new CustomEvent("trigger-konami"));
  };

  const copyContact = (text: string, key: string) => {
    playCoin();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      id="retro-hud-footer"
      className="fixed bottom-0 left-0 right-0 lg:left-[220px] z-40 h-12 bg-[#090a0f]/95 border-t border-border backdrop-blur-md px-3 sm:px-6 flex items-center justify-between text-xs font-mono select-none"
      aria-label="Retro HUD System Bar"
    >
      {/* Left side: Live system status & coordinates */}
      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="hidden sm:inline font-silkscreen text-[10px] text-white/80">
            SYS: NOMINAL
          </span>
          <span className="hidden md:inline text-white/40">•</span>
          <span className="hidden md:inline font-silkscreen text-[10px] text-cyan">
            60 FPS
          </span>
          <span className="hidden md:inline text-white/40">•</span>
          <span className="hidden md:inline text-[10px] text-success">
            WCAG AA: PASS
          </span>
        </div>

        {/* Live Cursor Coordinates */}
        <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-border text-amber font-mono text-[11px] shrink-0">
          <span ref={coordsRef}>X:0000 Y:0000</span>
        </div>
      </div>

      {/* Center / Right: Direct 1-Click Actions & Toggles */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* 1-Click Discord Copy */}
        <button
          type="button"
          onClick={() => copyContact("hake_acc", "discord")}
          onMouseEnter={() => playBlip()}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#5865f2]/15 border border-[#5865f2]/40 hover:bg-[#5865f2]/25 text-white transition-all text-[11px] font-silkscreen active:translate-y-[1px]"
          title="Click to copy Discord ID"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#5865f2]" />
          <span className="hidden sm:inline">DISCORD:</span>
          <span className="font-mono">hake_acc</span>
          {copiedKey === "discord" ? (
            <Check className="w-3 h-3 text-success animate-bounce" />
          ) : (
            <Copy className="w-3 h-3 text-white/40" />
          )}
        </button>

        {/* 1-Click Email Copy */}
        <button
          type="button"
          onClick={() => copyContact("contact@hakeacc.com", "email")}
          onMouseEnter={() => playBlip()}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface border border-border hover:border-amber/40 text-white transition-all text-[11px] font-silkscreen active:translate-y-[1px]"
          title="Click to copy Email"
        >
          <Mail className="w-3.5 h-3.5 text-amber" />
          <span>EMAIL</span>
          {copiedKey === "email" ? (
            <Check className="w-3 h-3 text-success" />
          ) : (
            <Copy className="w-3 h-3 text-white/40" />
          )}
        </button>

        {/* 1-Click Book Strategy Call */}
        <a
          href="/contact"
          onMouseEnter={() => playBlip()}
          onClick={() => playCoin()}
          className="pixel-btn pixel-btn-accent text-[10px] py-1 px-2.5 rounded hidden sm:flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          <span>BOOK CALL</span>
        </a>

        {/* CRT Toggle Button */}
        <button
          type="button"
          onClick={handleToggleCrt}
          onMouseEnter={() => playBlip()}
          className={`flex items-center gap-1 px-2 py-1 rounded border text-[10px] font-silkscreen transition-all active:translate-y-[1px] ${
            crtOn
              ? "bg-amber/20 border-amber text-amber"
              : "bg-surface border-border text-text-muted hover:text-white"
          }`}
          title={`Toggle CRT Scanlines (${crtOn ? "ON" : "OFF"})`}
          aria-label={`Toggle CRT (${crtOn ? "ON" : "OFF"})`}
        >
          <Tv className="w-3 h-3" />
          <span className="hidden sm:inline">CRT</span>
          <span className="font-mono text-[9px]">{crtOn ? "ON" : "OFF"}</span>
        </button>

        {/* SFX Mute Toggle Button */}
        <button
          type="button"
          onClick={handleToggleSfx}
          onMouseEnter={() => playBlip()}
          className={`flex items-center gap-1 px-2 py-1 rounded border text-[10px] font-silkscreen transition-all active:translate-y-[1px] ${
            sfxOn
              ? "bg-cyan/20 border-cyan text-cyan"
              : "bg-surface border-border text-text-muted hover:text-white"
          }`}
          title={`Toggle 8-bit SFX (${sfxOn ? "ON" : "OFF"})`}
          aria-label={`Toggle SFX (${sfxOn ? "ON" : "OFF"})`}
        >
          {sfxOn ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
          <span className="hidden sm:inline">SFX</span>
          <span className="font-mono text-[9px]">{sfxOn ? "ON" : "OFF"}</span>
        </button>

        {/* Konami Trigger Helper */}
        <button
          type="button"
          onClick={handleTriggerKonami}
          onMouseEnter={() => playBlip()}
          className="p-1.5 rounded bg-purple/20 border border-purple/40 text-purple hover:bg-purple/30 transition-all active:translate-y-[1px]"
          title="Trigger Konami Cheat Code Easter Egg"
          aria-label="Trigger Konami Cheat Code"
        >
          <Gamepad2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
