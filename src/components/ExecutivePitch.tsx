import { useState } from "react";
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Flame,
  ArrowRight,
  Copy,
  Check,
  Youtube,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { playClick, playCoin, playBlip } from "@/lib/sound";

const clientChannels = [
  { name: "Alex Adi XD", url: "https://youtube.com/@alexadixdofficial?si=aLvcFWUEtfCFZa3n", tag: "Gaming & Entertainment" },
  { name: "Mc thunder Playz", url: "https://youtube.com/@mcthunderxdofficial?si=ZLA57BXmSrlSPx9J", tag: "Gaming Creator" },
  { name: "Not Vangid", url: "https://youtube.com/@notvangid?si=u0Xvy79AwXL5CP1S", tag: "Creator & Content" },
  { name: "Sky Plays", url: "https://youtube.com/@oneskyplayz?si=z-opykPHHVZfbFEA", tag: "Gameplay & Streams" },
  { name: "Upper Gaming", url: "https://youtube.com/@upper_gaming?si=htZgVcKuAG_lcGCE", tag: "Gaming Network" },
  { name: "Cappy Mc (CappuXD)", url: "https://youtube.com/@cappy-mc?si=OejN4xeqeLOyf4xl", tag: "Multi-Channel" },
  { name: "Arpan GamzO", url: "https://youtube.com/@arpangamzo_official?si=xtwSqSXOWGjZKe9B", tag: "Gaming & Community" },
];

export default function ExecutivePitch() {
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyText = (text: string, type: "discord" | "email") => {
    playCoin();
    navigator.clipboard.writeText(text);
    if (type === "discord") {
      setCopiedDiscord(true);
      setTimeout(() => setCopiedDiscord(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <section
      id="executive-pitch"
      className="py-10 sm:py-14 px-4 sm:px-6 max-w-7xl mx-auto w-full"
      aria-label="15-Second Executive Summary for Hiring Managers and Creators"
    >
      <div className="pixel-hud-card rounded-2xl p-6 sm:p-10 bg-[#131622] border-2 border-amber/40 shadow-2xl relative overflow-hidden">
        {/* Top header badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
            <span className="text-xs sm:text-sm font-retro text-amber uppercase tracking-wider">
              15-SECOND EXECUTIVE PITCH // HIRING OVERVIEW
            </span>
          </div>

          <span className="pixel-badge bg-success/15 border border-success/40 text-success text-[10px]">
            ● OPEN FOR SELECT CREATOR CONTRACTS (2026)
          </span>
        </div>

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          {/* Left Column: Who I Am & Value Proposition */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-retro text-text-main leading-snug">
              I Turn YouTube Views Into
              <br />
              <span className="gradient-text">Lifelong Superfans &amp; Revenue.</span>
            </h2>

            <p className="text-text-muted text-xs sm:text-sm md:text-base font-readable leading-relaxed">
              If you run a high-growth YouTube channel or creator brand, you don&apos;t just need an editor — you need an <strong className="text-white font-semibold">end-to-end Content Strategist and Discord Architect</strong>. I engineer packaging, title hooks, video SEO, Shorts funnels, and high-security Discord bot ecosystems so you can focus 100% on creating.
            </p>

            {/* 4 Pillars in 15 seconds */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-elevated border border-border">
                <TrendingUp className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold font-retro text-text-main">+38% Average CTR</div>
                  <div className="text-[11px] font-readable text-text-muted">A/B tested thumbnail &amp; title packaging</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-elevated border border-border">
                <ShieldCheck className="w-4 h-4 text-purple shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold font-retro text-text-main">Zero-Raid Discord Hubs</div>
                  <div className="text-[11px] font-readable text-text-muted">Hardened bot security &amp; VIP perks</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-elevated border border-border">
                <Flame className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold font-retro text-text-main">Viral Shorts Scaling</div>
                  <div className="text-[11px] font-readable text-text-muted">Top-of-funnel discovery on YT/TikTok/X</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-elevated border border-border">
                <Zap className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold font-retro text-text-main">Turnkey Management</div>
                  <div className="text-[11px] font-readable text-text-muted">100% on-time uploads &amp; brand deals</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Hiring Box & Quick Connect */}
          <div className="lg:col-span-5 pixel-card rounded-xl p-6 bg-[#090a0f] border border-border shadow-pixel-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-silkscreen text-white/70 uppercase">FAST-TRACK ONBOARDING</span>
              <span className="text-xs font-mono text-amber">⚡ 24H Response</span>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-retro text-text-main">Direct 1-Click Connect:</div>

              {/* Discord Copy Button */}
              <button
                type="button"
                onClick={() => copyText("hake_acc", "discord")}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-[#5865f2]/15 border border-[#5865f2]/40 hover:bg-[#5865f2]/25 text-white transition-all active:translate-y-[1px]"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#5865f2]" />
                  <span className="text-xs font-mono">Discord: <strong>hake_acc</strong></span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-silkscreen text-amber">
                  {copiedDiscord ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-success" />
                      <span className="text-success">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY ID</span>
                    </>
                  )}
                </div>
              </button>

              {/* Email Copy Button */}
              <button
                type="button"
                onClick={() => copyText("contact@hakeacc.com", "email")}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-surface border border-border hover:bg-surface-elevated text-white transition-all active:translate-y-[1px]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono">Email: <strong>contact@hakeacc.com</strong></span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-silkscreen text-amber">
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-success" />
                      <span className="text-success">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Quick Action Button */}
            <a
              href="/contact"
              data-astro-prefetch
              onMouseEnter={() => playBlip()}
              onClick={() => playClick()}
              className="pixel-btn pixel-btn-accent w-full text-center text-xs py-3 rounded flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book 15-Min Strategy Call →</span>
            </a>
          </div>
        </div>

        {/* Live Client Channels Verification Carousel */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-silkscreen text-text-muted uppercase tracking-wider">
              VERIFIED CHANNELS &amp; CREATORS WORKED WITH:
            </span>
            <a
              href="/projects"
              data-astro-prefetch
              className="text-[10px] font-silkscreen text-amber hover:underline flex items-center gap-1"
            >
              <span>View All 8 Showcases</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {clientChannels.map((c) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playBlip()}
                onClick={() => playCoin()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface border border-border hover:border-amber/50 hover:bg-amber/10 transition-colors text-xs font-mono text-white/90 hover:text-white"
                title={`Open ${c.name} YouTube Channel`}
              >
                <Youtube className="w-3 h-3 text-error shrink-0" />
                <span className="font-bold">{c.name}</span>
                <span className="text-[10px] text-text-muted font-readable">({c.tag})</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
