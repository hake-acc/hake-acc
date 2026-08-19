import { useEffect, useState } from "react";

export function isCrtEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("hake_crt_mode");
  return stored === null ? true : stored === "true"; // Default to ON for retro aesthetic
}

export function setCrtEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("hake_crt_mode", String(enabled));
  window.dispatchEvent(new CustomEvent("crt-toggle", { detail: enabled }));
}

export function toggleCrt(): boolean {
  const next = !isCrtEnabled();
  setCrtEnabled(next);
  return next;
}

export default function CrtOverlay() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isCrtEnabled());

    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setEnabled(customEvent.detail);
    };

    window.addEventListener("crt-toggle", handleToggle);
    return () => window.removeEventListener("crt-toggle", handleToggle);
  }, []);

  if (!enabled) return null;

  return (
    <div
      id="crt-overlay-layer"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Scanline pattern */}
      <div className="absolute inset-0 scan-lines opacity-25" />
      {/* CRT Vignette */}
      <div className="absolute inset-0 crt-vignette opacity-50" />
      {/* Subtle Phosphor RGB Subpixel Tint */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
          backgroundSize: "100% 2px, 3px 100%",
        }}
      />
    </div>
  );
}
