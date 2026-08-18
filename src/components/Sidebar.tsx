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
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PixelIcon from "@/components/PixelIcon";

const navLinks = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Channels", href: "#projects", icon: Youtube },
  { label: "Skills", href: "#skills", icon: Code2 },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Services", href: "#services", icon: Layers },
  { label: "Reviews", href: "#testimonials", icon: Star },
  { label: "Contact", href: "#contact", icon: Mail },
];

const socialLinks = [
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/hake_acc" },
  { icon: Github, label: "GitHub", href: "https://github.com/hake-acc" },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-6">
      {/* Logo / Avatar */}
      <div className="flex flex-col items-center justify-center mb-6 px-4">
        <div className="relative mb-3">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden p-0.5"
            style={{
              background: "rgba(106,169,255,0.12)",
              border: "1px solid rgba(244,184,96,0.3)",
              boxShadow: "0 0 16px rgba(244,184,96,0.2)",
            }}
          >
            <img
              src="/assets/hake-logo.png"
              alt="Hake Acc logo"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
          {/* Online indicator */}
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-success rounded-full border-2 border-[#0d0f14]" />
        </div>
        <div className="text-center">
          <div className="font-bold text-text-main text-sm tracking-wide">Hake Acc</div>
          <div className="text-[10px] text-accent font-medium tracking-wider uppercase">Agency Founder</div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06] mb-4 mx-4" />

      {/* Nav Links */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.href.replace("#", "");
          return (
            <motion.button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={cn(
                "relative flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs tracking-wide text-left transition-all duration-200 group",
                isActive
                  ? "text-white font-semibold"
                  : "text-white/50 hover:text-white/80"
              )}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.97 }}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "linear-gradient(90deg, rgba(244,184,96,0.25) 0%, rgba(244,184,96,0.05) 100%)",
                    borderLeft: "2px solid #F4B860",
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <Icon
                className={cn(
                  "w-4 h-4 relative z-10 shrink-0",
                  isActive ? "text-accent" : "text-white/40 group-hover:text-white/70"
                )}
              />
              <span className="relative z-10">{link.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-4 mt-4 pt-3 border-t border-white/[0.06]">
        {/* Social icons */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-all duration-200"
              whileHover={{ y: -2, scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="w-3.5 h-3.5" />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-white/30 text-[10px] leading-relaxed">
          <div>© 2026 Hake Acc</div>
          <div>All rights reserved.</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-screen w-[220px] flex-col z-50"
        style={{
          background: "rgba(11, 13, 18, 0.97)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile toggle button */}
      <motion.button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-[#0d0f14]/90 border border-white/10 text-white/70 backdrop-blur-md"
        onClick={() => setMobileOpen(!mobileOpen)}
        whileTap={{ scale: 0.9 }}
        aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
      >
        <PixelIcon name={mobileOpen ? "close" : "menu"} className="text-current" />
      </motion.button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[220px] z-50"
              style={{
                background: "rgba(11, 13, 18, 0.99)",
                borderRight: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
