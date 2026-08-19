import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, ArrowLeftRight } from "lucide-react";
import { playSliderTick, playClick } from "@/lib/sound";

type ComparisonMode = "thumbnail" | "discord";

export default function BeforeAfterSlider() {
  const [mode, setMode] = useState<ComparisonMode>("thumbnail");
  const [sliderPos, setSliderPos] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSoundPos = useRef(50);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
      setSliderPos(percent);

      // Play tick sound when moved at least 6%
      if (Math.abs(percent - lastSoundPos.current) > 6) {
        playSliderTick();
        lastSoundPos.current = percent;
      }
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPos((p) => Math.max(0, p - 5));
      playSliderTick();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPos((p) => Math.min(100, p + 5));
      playSliderTick();
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPos(0);
      playSliderTick();
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPos(100);
      playSliderTick();
    }
  };

  return (
    <div className="w-full pixel-hud-card rounded-xl p-5 sm:p-8 bg-[#131622] border border-border space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber" />
            <span className="section-label text-xs">
              03 // CLIENT-SIDE BENCHMARK COMPARATOR
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-retro text-text-main">
            Interactive Before &amp; After Showcase
          </h3>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-[#090a0f] p-1 rounded-lg border border-border">
          <button
            type="button"
            onClick={() => {
              playClick();
              setMode("thumbnail");
              setSliderPos(50);
            }}
            className={`px-3 py-1.5 rounded text-xs font-silkscreen uppercase transition-all duration-150 ${
              mode === "thumbnail"
                ? "bg-amber text-canvas font-bold shadow-pixel-sm"
                : "text-text-muted hover:text-white"
            }`}
            aria-pressed={mode === "thumbnail"}
          >
            YouTube Packaging
          </button>
          <button
            type="button"
            onClick={() => {
              playClick();
              setMode("discord");
              setSliderPos(50);
            }}
            className={`px-3 py-1.5 rounded text-xs font-silkscreen uppercase transition-all duration-150 ${
              mode === "discord"
                ? "bg-purple text-canvas font-bold shadow-pixel-sm"
                : "text-text-muted hover:text-white"
            }`}
            aria-pressed={mode === "discord"}
          >
            Discord Architecture
          </button>
        </div>
      </div>

      {/* Subtitle description */}
      <p className="text-text-muted text-xs sm:text-sm font-readable leading-relaxed">
        {mode === "thumbnail"
          ? "Drag the central slider below to compare standard un-optimized creator packaging against Hake Acc’s high-contrast, retention-engineered thumbnails and title formulation."
          : "Drag the slider to inspect the architectural difference between a chaotic, raid-vulnerable creator Discord and a custom-hardened, automated VIP community superhub."}
      </p>

      {/* Interactive Draggable Split View Box */}
      <div
        ref={containerRef}
        tabIndex={0}
        role="slider"
        aria-label="Comparison split slider between before and after results"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          if (e.touches[0]) {
            setIsDragging(true);
            handleMove(e.touches[0].clientX);
          }
        }}
        className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] rounded-xl overflow-hidden select-none border-2 border-border cursor-ew-resize bg-[#090a0f] focus:outline-none focus:ring-2 focus:ring-amber"
      >
        {/* RIGHT (AFTER) LAYER - FULL BACKGROUND */}
        <div className="absolute inset-0 bg-[#0d121f] flex flex-col justify-between p-5 sm:p-8">
          {/* Top Label */}
          <div className="flex items-center justify-end">
            <span className="pixel-badge bg-amber/20 border border-amber/50 text-amber font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              AFTER: HAKE ACC PACKAGING
            </span>
          </div>

          {/* Center Graphic / Transformation Visual */}
          <div className="max-w-md ml-auto text-right space-y-3">
            {mode === "thumbnail" ? (
              <>
                <div className="inline-block p-4 rounded-lg bg-[#182035]/90 border border-amber/40 shadow-pixel-md text-left">
                  <div className="text-xs font-silkscreen text-amber uppercase mb-1">
                    ✓ High-CTR Focal Art + Viral Hook
                  </div>
                  <div className="text-sm sm:text-base font-bold font-readable text-white">
                    &quot;I Survived 100 Days In Hardcore (AND FOUND THIS)&quot;
                  </div>
                  <div className="flex items-center gap-3 mt-3 text-xs font-mono text-cyan">
                    <span className="font-bold text-amber">CTR: 11.8% (+180%)</span>
                    <span>•</span>
                    <span>145,000 Views</span>
                  </div>
                </div>
                <p className="text-xs font-readable text-white/90">
                  Engineered 3-point contrast hierarchy, expressive facial reaction, saturated lighting, and 0.5s visual hook comprehension.
                </p>
              </>
            ) : (
              <>
                <div className="inline-block p-4 rounded-lg bg-[#182035]/90 border border-purple/40 shadow-pixel-md text-left">
                  <div className="text-xs font-silkscreen text-purple uppercase mb-1">
                    ✓ Hardened 50K+ Superfan Superhub
                  </div>
                  <div className="text-sm sm:text-base font-bold font-readable text-white">
                    #welcome-rules • #stream-alerts • #vip-lounge
                  </div>
                  <div className="flex items-center gap-3 mt-3 text-xs font-mono text-success">
                    <span className="font-bold text-success">0 Raids (100% Secure)</span>
                    <span>•</span>
                    <span>45% Active Engagement</span>
                  </div>
                </div>
                <p className="text-xs font-readable text-white/90">
                  Multi-tier role verification, custom bot leveling rewards, automated YouTube stream sync, and dedicated Nitro VIP perks.
                </p>
              </>
            )}
          </div>

          {/* Bottom Metrics Bar */}
          <div className="flex justify-end gap-2 text-[10px] font-silkscreen text-white/70">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-success">
              +38% AVG CONVERSION
            </span>
          </div>
        </div>

        {/* LEFT (BEFORE) LAYER - CLIPPED */}
        <div
          className="absolute inset-0 bg-[#16171d] flex flex-col justify-between p-5 sm:p-8 overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        >
          {/* Top Label */}
          <div className="flex items-center justify-start">
            <span className="pixel-badge bg-white/10 border border-white/20 text-white/80">
              BEFORE: UNOPTIMIZED BASELINE
            </span>
          </div>

          {/* Center Graphic */}
          <div className="max-w-md text-left space-y-3">
            {mode === "thumbnail" ? (
              <>
                <div className="inline-block p-4 rounded-lg bg-black/60 border border-white/10 text-left">
                  <div className="text-xs font-silkscreen text-error uppercase mb-1">
                    ✗ Low Contrast &amp; Cluttered Text
                  </div>
                  <div className="text-sm sm:text-base font-readable text-white/70">
                    &quot;Playing Minecraft Episode 14 - building my base&quot;
                  </div>
                  <div className="flex items-center gap-3 mt-3 text-xs font-mono text-text-muted">
                    <span className="text-error font-semibold">CTR: 4.2% (Low)</span>
                    <span>•</span>
                    <span>18,000 Views</span>
                  </div>
                </div>
                <p className="text-xs font-readable text-text-muted">
                  Generic title format, cluttered in-game screenshot, muddy dark background, no clear focal point to drive click intent.
                </p>
              </>
            ) : (
              <>
                <div className="inline-block p-4 rounded-lg bg-black/60 border border-white/10 text-left">
                  <div className="text-xs font-silkscreen text-error uppercase mb-1">
                    ✗ Unmoderated &amp; Unstructured
                  </div>
                  <div className="text-sm sm:text-base font-readable text-white/70">
                    #general • #spam • #unverified-chat
                  </div>
                  <div className="flex items-center gap-3 mt-3 text-xs font-mono text-text-muted">
                    <span className="text-error font-semibold">Frequent Spam Raids</span>
                    <span>•</span>
                    <span>3% Active Retention</span>
                  </div>
                </div>
                <p className="text-xs font-readable text-text-muted">
                  Generic default permissions, spam bot vulnerabilities, ghost members, confusing channels, and high subscriber attrition.
                </p>
              </>
            )}
          </div>

          {/* Bottom Metrics Bar */}
          <div className="flex justify-start gap-2 text-[10px] font-silkscreen text-text-muted">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-error font-semibold">
              BASELINE BENCHMARK
            </span>
          </div>
        </div>

        {/* DIVIDER HANDLE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-amber z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Glowing Vertical Line */}
          <div className="absolute inset-0 bg-amber shadow-glow-amber" />

          {/* Center Grab Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-amber text-canvas border-2 border-white flex items-center justify-center shadow-pixel-md">
            <ArrowLeftRight className="w-4 h-4 font-bold" />
          </div>
        </div>
      </div>

      {/* Helper drag tip */}
      <div className="flex items-center justify-between text-xs font-mono text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
          <span>Interactive: Drag anywhere or use Left/Right arrow keys</span>
        </span>
        <span className="font-silkscreen text-amber">
          SPLIT: {Math.round(sliderPos)}%
        </span>
      </div>
    </div>
  );
}
