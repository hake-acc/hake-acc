import { useEffect, useState } from "react";
import { Sparkles, Trophy, X } from "lucide-react";
import { playKonamiSuccess, playClick, playCoin } from "@/lib/sound";

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
  const [overclockActive, setOverclockActive] = useState(false);

  const activateEasterEgg = () => {
    playKonamiSuccess();
    setIsOpen(true);
    setOverclockActive(true);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl pixel-hud-card rounded-xl p-6 sm:p-8 bg-[#131622] border-2 border-amber shadow-2xl space-y-6">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-text-muted hover:text-amber p-1 transition-colors"
              aria-label="Close Easter Egg Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber/15 border border-amber/40 rounded text-amber font-silkscreen text-xs uppercase tracking-widest">
                <Trophy className="w-4 h-4 text-amber animate-bounce" />
                <span>CHEAT CODE UNLOCKED</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-retro text-amber glow-amber">
                OVERCLOCK MODE
              </h2>
              <p className="text-xs font-mono text-cyan">
                STATUS: VIP CREATOR LEVEL 99 • SCORE: 999,990 PTS
              </p>
            </div>

            {/* Secret Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] font-silkscreen text-text-muted uppercase">SYSTEM STATUS</div>
                <div className="text-sm font-bold font-retro text-success mt-1">SUPERCHARGED</div>
              </div>
              <div className="p-3 rounded bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] font-silkscreen text-text-muted uppercase">CTR MULTIPLIER</div>
                <div className="text-sm font-bold font-retro text-amber mt-1">2.8X BOOST</div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] font-silkscreen text-text-muted uppercase">RAID DEFENSE</div>
                <div className="text-sm font-bold font-retro text-purple mt-1">MAXIMUM</div>
              </div>
            </div>

            {/* Recruiter / Creator Fast-Track Code */}
            <div className="p-4 rounded-lg bg-amber/10 border border-amber/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-silkscreen text-amber font-bold">
                <Sparkles className="w-4 h-4" />
                <span>SECRET FAST-TRACK DIRECT ACCESS:</span>
              </div>
              <p className="text-xs font-readable text-text-main leading-relaxed">
                You found the secret arcade developer console! Mention code <strong className="text-amber font-mono">#ARCADE99</strong> when booking a strategy call to get an immediate priority channel audit and custom Discord bot wireframe within 24 hours.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="/contact"
                onClick={() => {
                  playCoin();
                  setIsOpen(false);
                }}
                className="pixel-btn pixel-btn-accent flex-1 text-xs py-3 rounded text-center"
              >
                Claim Priority Audit →
              </a>
              <button
                onClick={handleClose}
                className="pixel-btn pixel-btn-outline text-xs py-3 px-6 rounded"
              >
                Resume Showcase
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
