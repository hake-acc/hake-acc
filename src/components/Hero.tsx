import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Youtube, Twitter, Github, ArrowRight, Gamepad2 } from "lucide-react";
import { playClick, playBlip } from "@/lib/sound";

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
        {/* Pre-title status pill - Clean solid indicator */}
        <div className="anim-enter anim-enter-d1 flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-8 sm:w-12 bg-accent/40" />
          <span className="pixel-badge bg-accent/15 border border-accent/40 text-accent font-silkscreen tracking-wider">
            <span className="w-2 h-2 rounded-sm bg-success" />
            Social Media Manager • Discord Developer • Agency Founder
          </span>
          <span className="h-px w-8 sm:w-12 bg-accent/40" />
        </div>

        {/* Pixel Title */}
        <div className="anim-enter anim-enter-d2 mb-5">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-retro tracking-tight leading-none text-text-main" style={{ textShadow: "0 0 32px rgba(106,169,255,0.6)" }}>
            <span>{firstName}</span>
            <span className="block gradient-text mt-1">{lastName}</span>
          </h1>
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

        {/* CTAs - Clean tactile pixel buttons without weird shining sweeps */}
        <div className="anim-enter anim-enter-d5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
          <a
            href="/projects"
            onClick={() => playClick()}
            className="pixel-btn pixel-btn-accent text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded flex items-center gap-2"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>{data.ctaLabel}</span>
          </a>

          <a
            href="/contact"
            onMouseEnter={() => playBlip()}
            onClick={() => playClick()}
            className="pixel-btn pixel-btn-outline text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded flex items-center gap-1.5"
          >
            <span>{data.ctaSecondary}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mini Stats Bar */}
        <div className="anim-enter anim-enter-d6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl mx-auto mb-8">
          {[
            { label: "CREATORS MANAGED", val: "25+" },
            { label: "VIEWS DRIVEN", val: "150M+" },
            { label: "DISCORD REACH", val: "100K+" },
            { label: "AVG CTR GAIN", val: "+38%" },
          ].map((stat) => (
            <div
              key={stat.label}
              onMouseEnter={() => playBlip()}
              className="p-2 sm:p-2.5 rounded bg-white/5 border border-white/10 hover:border-accent/30 transition-colors shadow-pixel-sm"
            >
              <div className="text-sm sm:text-base font-bold font-retro text-accent">{stat.val}</div>
              <div className="text-[9px] sm:text-[10px] font-silkscreen text-white/50">{stat.label}</div>
            </div>
          ))}
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
