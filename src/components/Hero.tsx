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
    const texts = ["+100 XP!", "LEVEL UP! 🌟", "FOUNDER LEVEL 99", "CRIT BOOST! ⚡"];
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
      className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-12 pb-16"
      aria-label="Hero section"
    >
      {/* Background video */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover pixel-crisp"
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
        {/* Darkening overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/25 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 35%, rgba(13,15,20,0.65) 100%)",
          }}
        />
        <div className="absolute inset-0 scan-lines opacity-30" />
      </motion.div>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Pre-title status pill */}
        <div className="anim-enter anim-enter-d1 flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-8 sm:w-12 bg-accent/40" />
          <span className="pixel-badge bg-accent/15 border border-accent/40 text-accent font-silkscreen tracking-wider">
            <span className="w-2 h-2 rounded-sm bg-success" />
            Social Media Manager • Discord Developer • Agency Founder
          </span>
          <span className="h-px w-8 sm:w-12 bg-accent/40" />
        </div>

        {/* Interactive Pixel Title */}
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
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-retro tracking-tight leading-none text-text-main group-hover:text-white transition-colors"
              style={{ textShadow: "0 0 32px rgba(255,200,55,0.4)" }}
            >
              <span>{firstName}</span>
              <span className="block gradient-text mt-1">{lastName}</span>
            </h1>
          </button>

          {/* Floating XP Micro-interaction popups */}
          {xpPopups.map((popup) => (
            <div
              key={popup.id}
              className="xp-float-badge absolute -top-4 right-2 sm:right-10 bg-accent text-[#0D0F14] font-retro text-[10px] sm:text-xs px-2.5 py-1 rounded shadow-pixel-sm z-30"
            >
              {popup.text}
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="anim-enter anim-enter-d3 mb-4">
          <p className="text-accent text-base sm:text-lg md:text-xl font-silkscreen tracking-widest uppercase">
            {data.tagline}
          </p>
        </div>

        {/* Subtitle */}
        <div className="anim-enter anim-enter-d4 mb-8">
          <p className="text-text-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-pixel">
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
            className="inline-flex items-center gap-1.5 text-[11px] font-silkscreen text-accent/90 hover:text-accent bg-accent/10 hover:bg-accent/20 border border-accent/30 px-3.5 py-1.5 rounded transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Hiring in a hurry? Jump to 15s Executive Pitch ↓</span>
          </a>
        </div>

        {/* Mini Stats Bar with Interactive Click feedback */}
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
                className={`p-2 sm:p-2.5 rounded bg-white/5 border text-center transition-all cursor-pointer shadow-pixel-sm active:translate-y-[1px] ${
                  isSelected ? "border-accent bg-accent/20 scale-105" : "border-white/10 hover:border-accent/40"
                }`}
                title="Click to verify metric"
              >
                <div className="text-sm sm:text-base font-bold font-retro text-accent flex items-center justify-center gap-1">
                  <span>{stat.val}</span>
                  {isSelected && <Check className="w-3 h-3 text-success animate-bounce" />}
                </div>
                <div className="text-[9px] sm:text-[10px] font-silkscreen text-white/60">
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
              className="w-9 h-9 flex items-center justify-center rounded border border-white/15 text-text-muted hover:text-error hover:border-error/50 hover:bg-error/10 transition-all active:translate-y-[1px]"
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
              className="w-9 h-9 flex items-center justify-center rounded border border-white/15 text-text-muted hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all active:translate-y-[1px]"
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
              className="w-9 h-9 flex items-center justify-center rounded border border-white/15 text-text-muted hover:text-secondary hover:border-secondary/50 hover:bg-secondary/10 transition-all active:translate-y-[1px]"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="anim-enter anim-enter-d7 absolute inset-x-0 bottom-3 z-10 flex justify-center px-4">
        <a
          href="/about"
          onMouseEnter={() => playBlip()}
          onClick={() => playClick()}
          className="flex flex-col items-center gap-1.5 text-text-muted hover:text-accent transition-colors duration-200 group"
          aria-label="Explore more"
        >
          <span className="text-[10px] font-silkscreen uppercase tracking-wider text-white/50 group-hover:text-accent">
            EXPLORE PORTFOLIO ↓
          </span>
        </a>
      </div>
    </section>
  );
}
