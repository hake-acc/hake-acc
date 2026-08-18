import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Youtube, MessageSquare, Twitter, Github, Sparkles } from "lucide-react";
import PixelIcon from "@/components/PixelIcon";

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
  const [namePopKey, setNamePopKey] = useState(0);
  const [mineKey, setMineKey] = useState(0);

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
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  const scrollToWork = () => {
    setMineKey((key) => key + 1);
    window.setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }, 440);
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const celebrateName = () => setNamePopKey((key) => key + 1);

  const titleParts = data.title.split(" ");
  const firstName = titleParts[0] || "Hake";
  const lastName = titleParts.slice(1).join(" ") || "Acc";

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background video */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
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
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/10 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 45%, rgba(13,15,20,0.55) 100%)",
          }}
        />
        <div className="absolute inset-0 scan-lines opacity-30" />
      </motion.div>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Pre-title status pill */}
        <div className="anim-enter anim-enter-d1 flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-10 bg-accent/50" />
          <span className="section-label tracking-[0.3em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Social Media Manager • Discord Developer • Agency Founder
          </span>
          <span className="h-px w-10 bg-accent/50" />
        </div>

        {/* Name */}
        <div className="anim-enter anim-enter-d2 mb-6">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
            <button
              type="button"
              onClick={celebrateName}
              className="name-celebration-trigger relative block mx-auto cursor-pointer text-text-main"
              aria-label={`Celebrate ${data.title}`}
              style={{ textShadow: "0 0 40px rgba(106,169,255,0.5)" }}
            >
              <span className="name-celebration-label">{firstName}</span>
              {namePopKey > 0 && (
                <span key={namePopKey} className="name-heart-pop" aria-hidden="true">
                  <span className="name-heart-pixel" />
                  <span className="name-pop-burst name-pop-burst-left" />
                  <span className="name-pop-burst name-pop-burst-right" />
                </span>
              )}
            </button>
            <span className="block gradient-text">{lastName}</span>
          </h1>
        </div>

        {/* Tagline */}
        <div className="anim-enter anim-enter-d3 mb-5">
          <p className="text-accent text-lg sm:text-xl font-medium tracking-[0.12em] uppercase">
            {data.tagline}
          </p>
        </div>

        {/* Subtitle */}
        <div className="anim-enter anim-enter-d4 mb-10">
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* CTAs */}
        <div className="anim-enter anim-enter-d5 flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <motion.button
            onClick={scrollToWork}
            className="group mine-work-button relative px-8 py-3.5 bg-accent text-background text-sm font-bold tracking-widest uppercase rounded overflow-hidden transition-all duration-300"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{ boxShadow: "0 0 28px rgba(244,184,96,0.5)" }}
          >
            <span className="relative z-10">{data.ctaLabel}</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            {mineKey > 0 && (
              <span key={mineKey} className="mine-pickaxe-swing" aria-hidden="true">
                <span className="mine-pickaxe-head" />
                <span className="mine-pickaxe-handle" />
                <span className="mine-spark mine-spark-one" />
                <span className="mine-spark mine-spark-two" />
                <span className="mine-spark mine-spark-three" />
              </span>
            )}
          </motion.button>

          <motion.button
            onClick={scrollToContact}
            className="px-8 py-3.5 border border-white/15 text-text-muted text-sm font-medium tracking-widest uppercase rounded hover:border-primary/50 hover:text-primary transition-all duration-300"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            {data.ctaSecondary}
          </motion.button>
        </div>

        {/* Social links */}
        <div className="anim-enter anim-enter-d6 flex items-center justify-center gap-4 pb-32 sm:pb-36">
          {contact.youtube && (
            <motion.a
              href={contact.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 flex items-center justify-center rounded border border-white/10 text-text-muted hover:text-error hover:border-error/40 hover:bg-error/10 transition-all duration-200"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Youtube className="w-4 h-4" />
            </motion.a>
          )}
          {contact.twitter && (
            <motion.a
              href={contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="w-10 h-10 flex items-center justify-center rounded border border-white/10 text-text-muted hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter className="w-4 h-4" />
            </motion.a>
          )}
          {contact.github && (
            <motion.a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 flex items-center justify-center rounded border border-white/10 text-text-muted hover:text-secondary hover:border-secondary/40 hover:bg-secondary/10 transition-all duration-200"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="anim-enter anim-enter-d7 absolute inset-x-0 bottom-5 z-10 flex justify-center px-4 sm:bottom-8">
        <button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="flex flex-col items-center gap-3 text-text-muted hover:text-white transition-colors duration-300 group"
          aria-label="Scroll to explore"
        >
          <div className="relative w-6 h-9 rounded-full border-2 border-white/40 group-hover:border-white/70 transition-colors duration-300 flex items-start justify-center pt-1.5">
            <motion.div
              className="w-1 h-2 bg-white/60 rounded-full group-hover:bg-white/90 transition-colors duration-300"
              animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </div>
          <span className="text-xs tracking-[0.18em] uppercase text-white/50 group-hover:text-white/80 transition-colors duration-300">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.2 }}
          >
            <PixelIcon name="chevron-down" className="text-white/40 group-hover:text-white/70 transition-colors duration-300" />
          </motion.div>
        </button>
      </div>

      {/* Corner decorations */}
      <div className="anim-enter anim-enter-d7 absolute top-20 left-6 z-10 hidden lg:block">
        <div className="text-text-muted/30 text-xs font-mono space-y-1">
          <div>{"// Agency Founder & Strategist"}</div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
            <span className="text-success/80">Accepting new creators</span>
          </div>
        </div>
      </div>

      <div className="anim-enter anim-enter-d7 absolute top-20 right-6 z-10 hidden lg:block">
        <div className="text-text-muted/30 text-xs font-mono text-right space-y-1">
          <div>Worldwide</div>
          <div>EST / PST / UTC</div>
        </div>
      </div>
    </section>
  );
}
