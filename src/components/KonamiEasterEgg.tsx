import { useEffect, useState } from "react";
import { Sparkles, Trophy, X, Gamepad2 } from "lucide-react";
import { playKonamiSuccess, playClick, playCoin } from "@/lib/sound";
import ChannelDefenderGame from "@/components/ChannelDefenderGame";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function KonamiEasterEgg() {
  const [inputIndex, setInputIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const activateEasterEgg = () => {
    playKonamiSuccess();
    setIsOpen(true);
    document.body.classList.add("overclock-active");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey = KONAMI_CODE[inputIndex].toLowerCase();

      if (key === expectedKey) {
        const nextIndex = inputIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          activateEasterEgg();
          setInputIndex(0);
        } else {
          setInputIndex(nextIndex);
        }
      } else {
        // Reset if key is ArrowUp, start anew
        if (key === "arrowup") {
          setInputIndex(1);
        } else {
          setInputIndex(0);
        }
      }
    };

    const handleCustomTrigger = () => {
      activateEasterEgg();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("trigger-konami", handleCustomTrigger);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("trigger-konami", handleCustomTrigger);
    };
  }, [inputIndex]);

  const handleClose = () => {
    playClick();
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#131622] border-2 border-amber/60 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-auto max-h-[95vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-text-muted hover:text-white p-2 rounded-lg bg-surface border border-border hover:border-amber/50 transition-colors z-20"
              aria-label="Close Arcade Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber/15 border border-amber/40 rounded text-amber font-silkscreen text-xs uppercase tracking-widest font-semibold">
                <Trophy className="w-4 h-4 text-amber animate-bounce" />
                <span>SECRET ARCADE CABINET UNLOCKED</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-retro text-amber glow-amber">
                OVERCLOCK ARCADE
              </h2>
              <p className="text-xs font-mono text-cyan">
                STATUS: VIP CREATOR LEVEL 99 • PURE RETRO GLORY
              </p>
            </div>

            {/* Playable Channel Defender Mini-Game */}
            <div className="pt-2">
              <ChannelDefenderGame />
            </div>

            {/* Secret Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded bg-[#090a0f] border border-border text-center">
                <div className="text-[10px] font-silkscreen text-text-muted uppercase">SYSTEM STATUS</div>
                <div className="text-sm font-bold font-retro text-success mt-1">SUPERCHARGED</div>
              </div>
              <div className="p-3 rounded bg-[#090a0f] border border-border text-center">
                <div className="text-[10px] font-silkscreen text-text-muted uppercase">CTR MULTIPLIER</div>
                <div className="text-sm font-bold font-retro text-amber mt-1">2.8X BOOST</div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded bg-[#090a0f] border border-border text-center">
                <div className="text-[10px] font-silkscreen text-text-muted uppercase">RAID DEFENSE</div>
                <div className="text-sm font-bold font-retro text-purple mt-1">MAXIMUM</div>
              </div>
            </div>

            {/* Secret Perk Code */}
            <div className="p-4 rounded-lg bg-amber/10 border border-amber/30 space-y-1.5 font-readable text-xs">
              <div className="flex items-center gap-2 font-silkscreen text-amber font-bold">
                <Sparkles className="w-4 h-4" />
                <span>SECRET FAST-TRACK ACCESS:</span>
              </div>
              <p className="text-text-muted leading-relaxed">
                Mention secret code <strong className="text-amber font-mono">#ARCADE99</strong> when submitting an inquiry for priority channel auditing and Discord security analysis within 24 hours.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href="/contact"
                onClick={() => {
                  playCoin();
                  setIsOpen(false);
                }}
                className="pixel-btn pixel-btn-accent flex-1 text-xs py-3 rounded text-center font-bold"
              >
                Inquire For Channel Growth →
              </a>
              <button
                onClick={handleClose}
                className="pixel-btn pixel-btn-outline text-xs py-3 px-6 rounded"
              >
                Resume Browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
