import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Youtube,
  Code2,
  Briefcase,
  Layers,
  Star,
  Mail,
  Twitter,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PixelIcon from "@/components/PixelIcon";
import SoundToggle from "@/components/SoundToggle";
import { playBlip, playClick } from "@/lib/sound";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: User },
  { label: "Channels", href: "/projects", icon: Youtube },
  { label: "Skills & Stack", href: "/experience", icon: Code2 },
  { label: "Services", href: "/services", icon: Layers },
  { label: "Contact", href: "/contact", icon: Mail },
];

const socialLinks = [
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/hake_acc" },
  { icon: Github, label: "GitHub", href: "https://github.com/hake-acc" },
];

export default function Sidebar() {
  const [currentPath, setCurrentPath] = useState("/");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updatePath = () => {
      const path = window.location.pathname;
      // Normalize trailing slash
      const cleanPath = path === "" ? "/" : path.replace(/\/$/, "") || "/";
      setCurrentPath(cleanPath);
    };

    updatePath();
    window.addEventListener("popstate", updatePath);
    document.addEventListener("astro:page-load", updatePath);
    return () => {
      window.removeEventListener("popstate", updatePath);
      document.removeEventListener("astro:page-load", updatePath);
    };
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-5">
      {/* Logo / Avatar */}
      <a
        href="/"
        onClick={() => playClick()}
        className="flex flex-col items-center justify-center mb-5 px-4 group"
      >
        <div className="relative mb-2.5">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden p-0.5 transition-transform duration-200 group-hover:scale-105"
            style={{
              background: "rgba(106,169,255,0.12)",
              border: "1px solid rgba(244,184,96,0.4)",
              boxShadow: "0 0 16px rgba(244,184,96,0.25)",
            }}
          >
            <img
              src="/assets/hake-logo.png"
              alt="Hake Acc logo"
              className="h-full w-full object-cover rounded-lg pixel-crisp"
            />
          </div>
          {/* Online indicator */}
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-success rounded-full border-2 border-[#0d0f14] animate-pulse" />
        </div>
        <div className="text-center">
          <div className="font-bold text-text-main text-sm font-retro tracking-wide group-hover:text-accent transition-colors">
            HAKE ACC
          </div>
          <div className="text-[10px] text-accent font-silkscreen tracking-wider uppercase mt-0.5">
            AGENCY FOUNDER
          </div>
        </div>
      </a>

      {/* Divider */}
      <div className="h-px bg-white/[0.08] mb-3 mx-4" />

      {/* Nav Links */}
      <nav className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto">
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
              onMouseEnter={() => playBlip()}
              onClick={() => {
                playClick();
                setMobileOpen(false);
              }}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-silkscreen tracking-wide transition-all duration-150 group",
                isActive
                  ? "text-white font-bold bg-accent/15 border border-accent/30 shadow-pixel-sm"
                  : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 relative z-10 shrink-0 transition-colors",
                  isActive ? "text-accent" : "text-white/40 group-hover:text-accent"
                )}
              />
              <span className="relative z-10">{link.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              )}
            </a>
          );
        })}
      </nav>

      {/* Sound FX Toggle & Bottom section */}
      <div className="px-4 mt-3 pt-3 border-t border-white/[0.08] space-y-3">
        <div className="flex justify-center">
          <SoundToggle />
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-2">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onMouseEnter={() => playBlip()}
              onClick={() => playClick()}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-all duration-150 active:translate-y-[1px]"
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>

        {/* Status / Copyright */}
        <div className="text-center text-white/40 text-[10px] font-mono leading-relaxed">
          <div className="text-success font-silkscreen text-[9px] mb-0.5">● READY FOR CONTRACTS</div>
          <div>© 2026 Hake Acc</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-screen w-[220px] flex-col z-50 bg-[#0B0D12]/95 border-r border-white/[0.08] backdrop-blur-xl"
      >
        <SidebarContent />
      </aside>

      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-[#0d0f14]/90 border border-white/15 text-white/80 backdrop-blur-md shadow-pixel-sm active:translate-y-[1px]"
        onClick={() => {
          playClick();
          setMobileOpen(!mobileOpen);
        }}
        aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
      >
        <PixelIcon name={mobileOpen ? "close" : "menu"} className="text-current" />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[240px] z-50 bg-[#0B0D12] border-r border-white/[0.08]"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
