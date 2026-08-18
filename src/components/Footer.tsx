import { motion } from "framer-motion";
import { Youtube, Twitter, Github } from "lucide-react";
import PixelIcon from "@/components/PixelIcon";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Managed Channels", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/hake_acc" },
  { icon: Github, label: "GitHub", href: "https://github.com/hake-acc" },
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 overflow-hidden rounded-lg border border-accent/40 bg-accent/10 p-0.5">
                <img
                  src="/assets/hake-logo.png"
                  alt="Hake Acc logo"
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
              <span
                className="text-text-main font-bold tracking-widest text-base"
                style={{ textShadow: "0 0 20px rgba(244,184,96,0.8)" }}
              >
                HAKE ACC
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-sm">
              Social Media Manager, Discord Server Developer &amp; Creator Agency Founder scaling top YouTubers and building high-retention creator communities.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass-card border border-white/[0.07] flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-200"
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
            <p className="text-xs text-accent tracking-widest uppercase mb-4 font-semibold">Navigation</p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5">
                {navLinks.slice(0, 3).map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-sm text-text-muted hover:text-accent transition-colors duration-200 text-left"
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
            <p className="text-xs text-accent tracking-widest uppercase mb-4 font-semibold">Connect</p>
            <ul className="space-y-2.5">
              {navLinks.slice(3).map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-text-muted hover:text-accent transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="https://twitter.com/hake_acc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-accent transition-colors duration-200"
                >
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted/60 text-center sm:text-left">
            © 2026 Hake Acc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-text-muted/40 tracking-widest uppercase hidden sm:block">
              Creator Management &amp; Discord Architecture
            </span>
            <motion.button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg glass-card border border-white/[0.07] flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-200"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Back to top"
            >
              <PixelIcon name="arrow-up" className="text-current" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
