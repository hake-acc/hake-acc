import { Youtube, Twitter, Github, ArrowUp, Mail, MessageSquare } from "lucide-react";
import PixelIcon from "@/components/PixelIcon";
import { playBlip, playClick } from "@/lib/sound";

const sitemapLinks = [
  { label: "Home", href: "/" },
  { label: "About Hake", href: "/about" },
  { label: "Creator Channels", href: "/projects" },
  { label: "Skills & Stack", href: "/experience" },
  { label: "Services & Scope", href: "/services" },
  { label: "Contact & Booking", href: "/contact" },
];

const socialLinks = [
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/hake_acc" },
  { icon: Github, label: "GitHub", href: "https://github.com/hake-acc" },
  { icon: MessageSquare, label: "Discord", href: "https://discord.gg" },
];

export default function Footer() {
  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#0A0D13] overflow-hidden" aria-label="Footer">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-3">
            <a
              href="/"
              onMouseEnter={() => playBlip()}
              onClick={() => playClick()}
              className="flex items-center gap-2.5 group inline-flex"
            >
              <div className="w-9 h-9 overflow-hidden rounded-lg border border-accent/40 bg-accent/10 p-0.5 transition-transform group-hover:scale-105">
                <img
                  src="/assets/hake-logo.png"
                  alt="Hake Acc logo"
                  className="h-full w-full object-cover rounded-md pixel-crisp"
                />
              </div>
              <span
                className="text-text-main font-retro text-sm tracking-wide group-hover:text-accent transition-colors"
                style={{ textShadow: "0 0 16px rgba(244,184,96,0.6)" }}
              >
                HAKE ACC
              </span>
            </a>
            <p className="text-text-muted text-xs sm:text-sm leading-relaxed max-w-md font-pixel">
              Social Media Manager, Discord Server Developer &amp; Creator Agency Founder scaling top YouTubers and engineering high-retention creator ecosystems.
            </p>
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onMouseEnter={() => playBlip()}
                  onClick={() => playClick()}
                  className="w-8 h-8 rounded-lg pixel-card flex items-center justify-center text-white/50 hover:text-accent hover:border-accent/40 transition-all active:translate-y-[1px]"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sitemap */}
          <div>
            <p className="text-xs font-silkscreen text-accent tracking-wider uppercase mb-3 font-semibold">
              SITEMAP
            </p>
            <ul className="space-y-2">
              {sitemapLinks.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onMouseEnter={() => playBlip()}
                    onClick={() => playClick()}
                    className="text-xs font-silkscreen text-white/60 hover:text-accent transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div>
            <p className="text-xs font-silkscreen text-accent tracking-wider uppercase mb-3 font-semibold">
              EXPLORE
            </p>
            <ul className="space-y-2">
              {sitemapLinks.slice(3).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onMouseEnter={() => playBlip()}
                    onClick={() => playClick()}
                    className="text-xs font-silkscreen text-white/60 hover:text-accent transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span>OPERATIONAL STATUS: READY FOR CREATOR CONTRACTS</span>
          </div>

          <div className="flex items-center gap-4">
            <span>© 2026 Hake Acc. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              className="pixel-btn pixel-btn-outline text-[10px] py-1 px-2.5 rounded flex items-center gap-1"
              aria-label="Scroll back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
