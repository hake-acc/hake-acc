import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import PixelIcon from "@/components/PixelIcon";
import SoundToggle from "@/components/SoundToggle";
import { playBlip, playClick } from "@/lib/sound";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Channels", href: "/projects" },
  { label: "Skills", href: "/experience" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    const updatePath = () => {
      const path = window.location.pathname;
      const cleanPath = path === "" ? "/" : path.replace(/\/$/, "") || "/";
      setCurrentPath(cleanPath);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("popstate", updatePath);
    document.addEventListener("astro:page-load", updatePath);
    updatePath();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", updatePath);
      document.removeEventListener("astro:page-load", updatePath);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "anim-nav fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "glass-card border-b border-white/[0.08] shadow-pixel-sm py-2"
            : "bg-transparent py-3"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <a
              href="/"
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
              <span
                className="text-text-main font-retro text-xs sm:text-sm tracking-wide group-hover:text-accent transition-colors"
                style={{ textShadow: "0 0 16px rgba(244,184,96,0.6)" }}
              >
                HAKE ACC
              </span>
            </a>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? currentPath === "/"
                    : currentPath.startsWith(link.href);

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => playBlip()}
                    onClick={() => playClick()}
                    className={cn(
                      "relative px-3.5 py-1.5 text-xs font-silkscreen tracking-wide transition-all duration-150 rounded",
                      isActive
                        ? "text-accent bg-accent/10 border border-accent/30 shadow-pixel-sm font-bold"
                        : "text-text-muted hover:text-text-main hover:bg-white/5 border border-transparent"
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}

              <div className="ml-2 pl-2 border-l border-white/10 flex items-center gap-2">
                <SoundToggle compact />
                <a
                  href="/contact"
                  onMouseEnter={() => playBlip()}
                  onClick={() => playClick()}
                  className="pixel-btn pixel-btn-accent text-[11px] py-1.5 px-3.5 rounded"
                >
                  Hire Me
                </a>
              </div>
            </nav>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-2">
              <SoundToggle compact />
              <button
                className="p-2 text-text-muted hover:text-text-main bg-white/5 rounded border border-white/10 active:translate-y-[1px]"
                onClick={() => {
                  playClick();
                  setMobileOpen(!mobileOpen);
                }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <PixelIcon name={mobileOpen ? "close" : "menu"} className="text-current" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div
              className="absolute inset-0 bg-[#0d0f14]/80 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-72 bg-[#0d1117] border-l border-white/10 flex flex-col pt-16 px-6 gap-2 shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-2 border-b border-white/10">
                <span className="font-retro text-xs text-accent">MENU NAVIGATION</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 text-white/50 hover:text-white"
                >
                  <PixelIcon name="close" />
                </button>
              </div>

              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? currentPath === "/"
                    : currentPath.startsWith(link.href);

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      playClick();
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "text-left px-4 py-2.5 text-xs font-silkscreen uppercase rounded transition-all duration-150 border",
                      isActive
                        ? "text-accent bg-accent/15 border-accent/40 font-bold"
                        : "text-text-muted hover:text-white hover:bg-white/5 border-transparent"
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}

              <a
                href="/contact"
                onClick={() => {
                  playClick();
                  setMobileOpen(false);
                }}
                className="pixel-btn pixel-btn-accent text-center mt-4 text-xs py-3 rounded"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
