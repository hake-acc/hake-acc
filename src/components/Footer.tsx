"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Heart, Gamepad2, ArrowUp } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/alexchen" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/alexchen" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/alexchen" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.06] overflow-hidden" aria-label="Footer">
      <div className="absolute inset-0 bg-surface/20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center bg-accent/20 border border-accent/30 rounded">
                <Gamepad2 className="w-4 h-4 text-accent" />
              </div>
              <span className="text-text-main font-bold tracking-wider" style={{ textShadow: "0 0 20px rgba(244,184,96,0.8)" }}>
                ALEX.DEV
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Creative developer crafting immersive digital experiences at the intersection of engineering and art.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass-card border border-white/[0.07] flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
                  whileHover={{ y: -2, scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs text-accent tracking-widest uppercase mb-4">Navigation</p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5">
                {navLinks.slice(0, 4).map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-sm text-text-muted hover:text-primary transition-colors duration-200 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* More links */}
          <div>
            <p className="text-xs text-accent tracking-widest uppercase mb-4">More</p>
            <ul className="space-y-2.5">
              {navLinks.slice(4).map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-text-muted hover:text-primary transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a href="https://github.com/alexchen" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-primary transition-colors duration-200">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-text-muted hover:text-primary transition-colors duration-200">
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted/60 text-center sm:text-left">
            © 2025 Alex Chen. Built with{" "}
            <Heart className="w-3 h-3 inline text-error/60 mx-0.5" />
            using Next.js, Framer Motion &amp; Tailwind CSS.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-text-muted/40 tracking-widest uppercase hidden sm:block">
              Inspired by Hyper Light Drifter &amp; Sea of Stars
            </span>
            <motion.button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg glass-card border border-white/[0.07] flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-200"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
