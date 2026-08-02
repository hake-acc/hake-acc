"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Github, Twitter, Linkedin } from "lucide-react";

interface HeroProps {
  data: {
    title: string;
    tagline: string;
    subtitle: string;
    ctaLabel: string;
    ctaSecondary: string;
  };
  contact: {
    github: string;
    twitter: string;
    linkedin: string;
  };
}

const socialLinks = [
  { icon: Github, label: "GitHub", key: "github" as const },
  { icon: Twitter, label: "Twitter", key: "twitter" as const },
  { icon: Linkedin, label: "LinkedIn", key: "linkedin" as const },
];

export default function Hero({ data, contact }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force-play in environments where autoPlay alone is insufficient (e.g. Replit iframe proxy)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const tryPlay = () => {
      video.play().catch(() => {
        // Retry once on user gesture if policy blocks it
      });
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
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background video — parallax via Framer (layout only, not visibility) */}
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
        {/* Darkening overlays — kept light so the video breathes through */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/10 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 45%, rgba(13,15,20,0.55) 100%)"
        }} />
        <div className="absolute inset-0 scan-lines opacity-30" />
      </motion.div>

      {/* All text uses CSS entrance animations — visible immediately from SSR */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Pre-title */}
        <div className="anim-enter anim-enter-d1 flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-12 bg-accent/50" />
          <span className="section-label tracking-[0.3em]">Portfolio 2025</span>
          <span className="h-px w-12 bg-accent/50" />
        </div>

        {/* Name */}
        <div className="anim-enter anim-enter-d2 mb-6">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
            <span className="block text-text-main" style={{ textShadow: "0 0 40px rgba(106,169,255,0.5)" }}>
              {data.title.split(" ")[0]}
            </span>
            <span className="block gradient-text">{data.title.split(" ")[1]}</span>
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
        <div className="anim-enter anim-enter-d5 flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <motion.button
            onClick={scrollToWork}
            className="group relative px-8 py-3.5 bg-accent text-background text-sm font-bold tracking-widest uppercase rounded overflow-hidden transition-all duration-300"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{ boxShadow: "0 0 28px rgba(244,184,96,0.5)" }}
          >
            <span className="relative z-10">{data.ctaLabel}</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          </motion.button>

          <motion.button
            className="px-8 py-3.5 border border-white/15 text-text-muted text-sm font-medium tracking-widest uppercase rounded hover:border-primary/50 hover:text-primary transition-all duration-300"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            {data.ctaSecondary}
          </motion.button>
        </div>

        {/* Social links */}
        <div className="anim-enter anim-enter-d6 flex items-center justify-center gap-4">
          {socialLinks.map(({ icon: Icon, label, key }) => (
            <motion.a
              key={key}
              href={contact[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded border border-white/10 text-text-muted hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Scroll to Explore indicator */}
      <div className="anim-enter anim-enter-d7 absolute inset-x-0 bottom-8 z-10 flex justify-center px-4 sm:bottom-10">
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-3 text-text-muted hover:text-white transition-colors duration-300 group"
          aria-label="Scroll to explore"
        >
          {/* Mouse icon */}
          <div className="relative w-6 h-9 rounded-full border-2 border-white/40 group-hover:border-white/70 transition-colors duration-300 flex items-start justify-center pt-1.5">
            <motion.div
              className="w-1 h-2 bg-white/60 rounded-full group-hover:bg-white/90 transition-colors duration-300"
              animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </div>
          {/* Label */}
          <span className="text-xs tracking-[0.18em] uppercase text-white/50 group-hover:text-white/80 transition-colors duration-300">
            Scroll to explore
          </span>
          {/* Chevron */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
          </motion.div>
        </button>
      </div>

      {/* Corner decorations */}
      <div className="anim-enter anim-enter-d7 absolute top-20 left-6 z-10 hidden lg:block">
        <div className="text-text-muted/30 text-xs font-mono space-y-1">
          <div>{"// v1.0.0"}</div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
            <span>Available for hire</span>
          </div>
        </div>
      </div>

      <div className="anim-enter anim-enter-d7 absolute top-20 right-6 z-10 hidden lg:block">
        <div className="text-text-muted/30 text-xs font-mono text-right space-y-1">
          <div>San Francisco, CA</div>
          <div>UTC-7</div>
        </div>
      </div>
    </section>
  );
}
