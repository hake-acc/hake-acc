import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Youtube, Twitter, Github, ArrowRight, Gamepad2, Sparkles, Check } from "lucide-react";
import { playClick, playBlip, playLevelUp, playChime } from "@/lib/sound";

interface HeroProps {
  data: {
    title: string;
    tagline: string;
    subtitle: string;
    ctaLabel: string;
    ctaSecondary: string;
  };
  contact: {
    email: string;
    discord?: string;
    twitter?: string;
    github?: string;
    youtube?: string;
  };
}

export default function Hero({ data, contact }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [xpPopups, setXpPopups] = useState<{ id: number; text: string }[]>([]);
  const [clickedStat, setClickedStat] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const tryPlay = () => {
      video.play().catch(() => {});
    };
    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }
    return () => video.removeEventListener("canplay", tryPlay);
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 80]);

  const titleParts = data.title.split(" ");
  const firstName = titleParts[0] || "Hake";
  const lastName = titleParts.slice(1).join(" ") || "Acc";

  const triggerTitleInteraction = () => {
    playLevelUp();
    const id = Date.now();
    const texts = ["+100 XP!", "LEVEL UP! 🌟", "ARCHITECT LVL 99", "CRIT BOOST! ⚡"];
    const text = texts[Math.floor(Math.random() * texts.length)];
    setXpPopups((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setXpPopups((prev) => prev.filter((p) => p.id !== id));
    }, 850);
  };

  const handleStatClick = (label: string) => {
    playChime();
    setClickedStat(label);
    setTimeout(() => setClickedStat(null), 1200);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[88vh] flex flex-col items-center justify-center overflow-hidden pt-10 pb-16"
      aria-label="Hero section"
    >
      {/* Background video with arcade overlay */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover pixel-crisp opacity-45"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/assets/pixelart-bg.webm" type="video/webm" />
          <source src="/assets/pixelart-bg.mp4" type="video/mp4" />
        </video>
        {/* Darkening overlays for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090a0f]/85 via-[#090a0f]/40 to-[#090a0f]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0f]/50 via-transparent to-[#090a0f]/50" />
      </motion.div>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Pre-title status pill */}
        <div className="anim-enter anim-enter-d1 flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-8 sm:w-12 bg-amber/40" />
          <span className="pixel-badge bg-amber/15 border border-amber/40 text-amber font-silkscreen tracking-wider">
            <span className="w-2 h-2 rounded-sm bg-success animate-pulse" />
            Senior Content Strategist • Discord Architect • Agency Founder
          </span>
          <span className="h-px w-8 sm:w-12 bg-amber/40" />
        </div>

        {/* Strictly Display Pixel Title */}
        <div className="anim-enter anim-enter-d2 mb-5 relative inline-block">
          <button
            type="button"
            onClick={triggerTitleInteraction}
            onMouseEnter={() => playBlip()}
            className="cursor-pointer text-left focus:outline-none transition-transform active:scale-95 group"
            title="Click for Easter Egg Sound & XP"
            aria-label={`Interactive Title: ${data.title}`}
          >
            <h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-retro tracking-tight leading-none text-text-main group-hover:text-white transition-colors select-none"
              style={{ textShadow: "0 0 32px rgba(245,158,11,0.4)" }}
            >
              <span>{firstName}</span>
              <span className="block gradient-text mt-1">{lastName}</span>
            </h1>
          </button>

          {/* Floating XP Popups */}
          {xpPopups.map((popup) => (
            <div
              key={popup.id}
              className="xp-float-badge absolute -top-4 right-2 sm:right-10 bg-amber text-canvas font-retro text-[10px] sm:text-xs px-2.5 py-1 rounded shadow-pixel-sm z-30"
            >
              {popup.text}
            </div>
          ))}
        </div>

        {/* Tagline in Silkscreen */}
        <div className="anim-enter anim-enter-d3 mb-4">
          <p className="text-amber text-sm sm:text-base md:text-lg font-silkscreen tracking-widest uppercase">
            {data.tagline}
          </p>
        </div>

        {/* Subtitle in Ultra-Readable Inter for WCAG AA compliance */}
        <div className="anim-enter anim-enter-d4 mb-8">
          <p className="text-text-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-readable">
            {data.subtitle}
          </p>
        </div>

        {/* CTAs */}
        <div className="anim-enter anim-enter-d5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-5">
          <a
            href="/contact"
            onClick={() => playClick()}
            className="pixel-btn pixel-btn-accent text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded flex items-center gap-2"
          >
            <span>{data.ctaSecondary}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="/projects"
            onMouseEnter={() => playBlip()}
            onClick={() => playClick()}
            className="pixel-btn pixel-btn-outline text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded flex items-center gap-2"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>{data.ctaLabel}</span>
          </a>
        </div>

        {/* 15-Second Recruiter Fast Track link */}
        <div className="anim-enter anim-enter-d5 mb-8">
          <a
            href="#executive-pitch"
            onMouseEnter={() => playBlip()}
            onClick={() => playClick()}
            className="inline-flex items-center gap-1.5 text-xs font-silkscreen text-amber/90 hover:text-amber bg-amber/10 hover:bg-amber/20 border border-amber/30 px-3.5 py-1.5 rounded transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber" />
            <span>Hiring in a hurry? Jump to 15s Executive Pitch ↓</span>
          </a>
        </div>

        {/* Key Metrics Bar with Pixel Numerals and Accessible Labels */}
        <div className="anim-enter anim-enter-d6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl mx-auto mb-8">
          {[
            { label: "CREATORS MANAGED", val: "25+" },
            { label: "VIEWS DRIVEN", val: "150M+" },
            { label: "DISCORD REACH", val: "100K+" },
            { label: "AVG CTR GAIN", val: "+38%" },
          ].map((stat) => {
            const isSelected = clickedStat === stat.label;
            return (
              <button
                type="button"
                key={stat.label}
                onClick={() => handleStatClick(stat.label)}
                onMouseEnter={() => playBlip()}
                className={`p-2.5 sm:p-3 rounded-lg bg-surface border text-center transition-all cursor-pointer shadow-pixel-sm active:translate-y-[1px] ${
                  isSelected
                    ? "border-amber bg-amber/20 scale-105"
                    : "border-border hover:border-amber/50"
                }`}
                title="Click to verify metric"
              >
                <div className="text-sm sm:text-base font-bold font-retro text-amber flex items-center justify-center gap-1">
                  <span>{stat.val}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-success animate-bounce" />}
                </div>
                <div className="text-[9px] sm:text-[10px] font-silkscreen text-text-muted mt-0.5">
                  {isSelected ? "VERIFIED RECORD" : stat.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Social links */}
        <div className="anim-enter anim-enter-d6 flex items-center justify-center gap-3">
          {contact.youtube && (
            <a
              href={contact.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              onMouseEnter={() => playBlip()}
              onClick={() => playClick()}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:text-error hover:border-error/50 hover:bg-error/10 transition-all active:translate-y-[1px]"
            >
              <Youtube className="w-4 h-4" />
            </a>
          )}
          {contact.twitter && (
            <a
              href={contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              onMouseEnter={() => playBlip()}
              onClick={() => playClick()}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:text-cyan hover:border-cyan/50 hover:bg-cyan/10 transition-all active:translate-y-[1px]"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              onMouseEnter={() => playBlip()}
              onClick={() => playClick()}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:text-purple hover:border-purple/50 hover:bg-purple/10 transition-all active:translate-y-[1px]"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
