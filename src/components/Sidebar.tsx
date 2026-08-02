"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  FolderOpen,
  Code2,
  Briefcase,
  Trophy,
  Mail,
  Github,
  Linkedin,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Projects", href: "#projects", icon: FolderOpen },
  { label: "Skills", href: "#skills", icon: Code2 },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Achievements", href: "#achievements", icon: Trophy },
  { label: "Contact", href: "#contact", icon: Mail },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Globe, label: "Website", href: "#" },
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
      <div className="flex items-center justify-center mb-8 px-4">
        <div className="relative">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden"
            style={{
              background: "rgba(106,169,255,0.08)",
              border: "1px solid rgba(106,169,255,0.15)",
            }}
          >
            {/* Pixel robot avatar */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Head */}
              <rect x="10" y="8" width="20" height="16" rx="3" fill="#6AA9FF" fillOpacity="0.9" />
              {/* Eyes */}
              <rect x="14" y="13" width="4" height="4" rx="1" fill="#0d0f14" />
              <rect x="22" y="13" width="4" height="4" rx="1" fill="#0d0f14" />
              {/* Mouth */}
              <rect x="15" y="20" width="10" height="2" rx="1" fill="#0d0f14" />
              {/* Antenna */}
              <rect x="19" y="4" width="2" height="4" rx="1" fill="#8B7CF6" />
              <rect x="18" y="3" width="4" height="2" rx="1" fill="#8B7CF6" />
              {/* Body */}
              <rect x="12" y="26" width="16" height="10" rx="2" fill="#8B7CF6" fillOpacity="0.7" />
              {/* Arms */}
              <rect x="6" y="27" width="5" height="7" rx="2" fill="#8B7CF6" fillOpacity="0.5" />
              <rect x="29" y="27" width="5" height="7" rx="2" fill="#8B7CF6" fillOpacity="0.5" />
            </svg>
          </div>
          {/* Online indicator */}
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#0d0f14]" />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06] mb-6 mx-4" />

      {/* Nav Links */}
      <nav className="flex-1 flex flex-col gap-1 px-3">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.href.replace("#", "");
          return (
            <motion.button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm tracking-wide text-left transition-all duration-200 group",
                isActive
                  ? "text-white"
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
                    background: "linear-gradient(90deg, rgba(139,124,246,0.35) 0%, rgba(139,124,246,0.08) 100%)",
                    borderLeft: "2px solid #8B7CF6",
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <Icon
                className={cn(
                  "w-4 h-4 relative z-10 shrink-0",
                  isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                )}
              />
              <span className="relative z-10 font-medium">{link.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-4 mt-6">
        {/* Social icons */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-white/80 hover:border-white/25 hover:bg-white/5 transition-all duration-200"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="w-3.5 h-3.5" />
            </motion.a>
          ))}
        </div>

        {/* Colored bars */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-1 w-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
          <div className="h-1 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
        </div>

        {/* Copyright */}
        <div className="text-center text-white/25 text-[10px] leading-relaxed">
          <div>© 2025 Hake</div>
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
          borderRight: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile toggle button */}
      <motion.button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-background/90 border border-white/10 text-white/70 backdrop-blur-md"
        onClick={() => setMobileOpen(!mobileOpen)}
        whileTap={{ scale: 0.9 }}
        aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
      >
        {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
                borderRight: "1px solid rgba(255,255,255,0.05)",
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
