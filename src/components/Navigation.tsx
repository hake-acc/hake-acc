import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Youtube,
  Code2,
  Layers,
  Mail,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SoundToggle from "@/components/SoundToggle";
import { playBlip, playClick } from "@/lib/sound";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: User },
  { label: "Channels", href: "/projects", icon: Youtube },
  { label: "Services", href: "/services", icon: Layers },
  { label: "Experience", href: "/experience", icon: Code2 },
  { label: "Contact", href: "/contact", icon: Mail },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    const updatePath = () => {
      const path = window.location.pathname;
      const cleanPath = path === "" ? "/" : path.replace(/\/$/, "") || "/";
      setCurrentPath(cleanPath);
      setMobileOpen(false);
    };

    updatePath();
    window.addEventListener("popstate", updatePath);
    document.addEventListener("astro:page-load", updatePath);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("popstate", updatePath);
      document.removeEventListener("astro:page-load", updatePath);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Mobile & Tablet Header Bar (Hidden on desktop lg:) */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0B0D12]/95 border-b border-white/[0.08] backdrop-blur-md px-4 py-2.5 transition-all duration-200"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <a
            href="/"
            data-astro-prefetch
            onMouseEnter={() => playBlip()}
            onClick={() => playClick()}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-8 h-8 overflow-hidden rounded-lg border border-accent/40 bg-accent/10 p-0.5 transition-transform duration-150 group-hover:scale-105">
              <img
                src="/assets/hake-logo.png"
                alt="Hake Acc logo"
                className="h-full w-full object-cover rounded-md pixel-crisp"
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-text-main font-retro text-xs tracking-wide group-hover:text-accent transition-colors"
                style={{ textShadow: "0 0 12px rgba(244,184,96,0.6)" }}
              >
                HAKE ACC
              </span>
              <span className="text-[8px] font-silkscreen text-accent uppercase">AGENCY FOUNDER</span>
            </div>
          </a>

          {/* Right Mobile Actions */}
          <div className="flex items-center gap-2">
            <SoundToggle compact />

            <button
              onClick={() => {
                playClick();
                setMobileOpen(!mobileOpen);
              }}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-accent/40 active:translate-y-[1px] transition-colors"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.28 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-[#0d1117] border-l border-white/10 flex flex-col p-5 shadow-2xl z-10"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span className="font-retro text-xs text-accent">NAVIGATION</span>
                </div>
                <button
                  onClick={() => {
                    playClick();
                    setMobileOpen(false);
                  }}
                  className="p-1.5 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto py-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive =
                    link.href === "/"
                      ? currentPath === "/"
                      : currentPath.startsWith(link.href);

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      data-astro-prefetch
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => {
                        playClick();
                        setMobileOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs font-silkscreen uppercase tracking-wide transition-colors border",
                        isActive
                          ? "text-white bg-accent/20 border-accent/40 font-bold shadow-pixel-sm"
                          : "text-text-muted hover:text-white hover:bg-white/5 border-transparent"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-4 h-4 shrink-0",
                          isActive ? "text-accent" : "text-white/40"
                        )}
                      />
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* Bottom Quick Action */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <a
                  href="/contact"
                  data-astro-prefetch
                  onClick={() => {
                    playClick();
                    setMobileOpen(false);
                  }}
                  className="pixel-btn pixel-btn-accent w-full text-center text-xs py-2.5 rounded flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Hire Me / Book Project</span>
                </a>

                <div className="text-center text-[10px] font-mono text-white/40">
                  © 2026 Hake Acc • Ready For Contracts
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
