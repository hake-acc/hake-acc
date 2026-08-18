import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isSoundEnabled, toggleSound } from "@/lib/sound";

interface SoundToggleProps {
  compact?: boolean;
  className?: string;
}

export default function SoundToggle({ compact = false, className = "" }: SoundToggleProps) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isSoundEnabled());

    const handleToggle = (e: CustomEvent<boolean>) => {
      setEnabled(e.detail);
    };

    window.addEventListener("sfx-toggle" as any, handleToggle);
    return () => window.removeEventListener("sfx-toggle" as any, handleToggle);
  }, []);

  const handleToggle = () => {
    const next = toggleSound();
    setEnabled(next);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[11px] font-silkscreen transition-all duration-150 border ${
        enabled
          ? "bg-accent/15 border-accent/40 text-accent hover:bg-accent/25"
          : "bg-white/5 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/10"
      } ${className}`}
      title={enabled ? "Mute Retro Audio" : "Enable Retro Audio"}
      aria-label={enabled ? "Mute Retro Audio" : "Enable Retro Audio"}
    >
      {enabled ? (
        <>
          <Volume2 className="w-3.5 h-3.5 shrink-0" />
          {!compact && <span>SFX ON</span>}
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 shrink-0" />
          {!compact && <span>SFX OFF</span>}
        </>
      )}
    </button>
  );
}
