import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, ShieldCheck, Youtube, MessageSquare, ArrowRight, Star } from "lucide-react";
import { playBlip, playClick } from "@/lib/sound";

interface AboutProps {
  data: {
    bio: string;
    facts: { label: string; value: string }[];
  };
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function About({ data }: AboutProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
      aria-label="About section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 sm:mb-16"
        >
          <motion.p variants={itemVariants} className="section-label mb-2">
            01 // About Hake Acc
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-retro text-text-main leading-tight"
          >
            Scaling creator brands,
            <br />
            <span className="gradient-text">driving real engagement.</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Avatar + facts */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {/* Avatar card */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="pixel-hud-card rounded-xl p-6 sm:p-8 relative overflow-hidden text-center bg-[#131622] border border-border">
                {/* Pixel avatar */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl p-1 mb-5 mx-auto bg-gradient-to-br from-amber/20 via-cyan/20 to-purple/20 border border-white/20 overflow-hidden shadow-pixel-md">
                  <img
                    src="/assets/hake-logo.png"
                    alt="Hake Acc avatar logo"
                    className="w-full h-full object-cover rounded-lg pixel-crisp"
                  />
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-success rounded-full border-2 border-[#131622]" />
                </div>

                <div className="mb-5">
                  <h3 className="text-xl sm:text-2xl font-bold font-retro text-text-main mb-1">
                    Hake Acc
                  </h3>
                  <p className="text-amber text-xs font-silkscreen tracking-wider uppercase">
                    Senior Content Strategist • Discord Architect • Agency Founder
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { icon: Youtube, label: "YouTuber Strategist" },
                    { icon: MessageSquare, label: "Discord Architect" },
                    { icon: ShieldCheck, label: "Anti-Raid Security" },
                    { icon: Trophy, label: "Agency Founder" },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="pixel-badge bg-surface-elevated border border-border text-text-muted hover:text-text-main transition-colors"
                    >
                      <Icon className="w-3 h-3 text-amber shrink-0" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stats grid with strictly retro numbers */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {data.facts.map((fact) => (
                <motion.div
                  key={fact.label}
                  variants={itemVariants}
                  onMouseEnter={() => playBlip()}
                  className="pixel-card rounded-lg p-4 sm:p-5 text-center group hover:border-amber/50 transition-all duration-150 bg-[#131622] border border-border"
                >
                  <div className="text-2xl sm:text-3xl font-bold font-retro text-amber glow-amber mb-1">
                    {fact.value}
                  </div>
                  <div className="text-[10px] sm:text-xs font-silkscreen text-text-muted tracking-wider uppercase">
                    {fact.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio text in readable accessible typography */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-4 font-readable">
              <p className="text-text-main text-base sm:text-lg leading-relaxed">
                {data.bio}
              </p>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                Whether taking a gaming channel from thousands of views to millions, engineering bulletproof Discord community servers with custom bot automation, or negotiating key sponsorships, my goal is simple: deliver explosive, sustainable creator growth.
              </p>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                I partner with high-ambition YouTubers, stream collectives, and gaming organizations to manage every detail behind the scenes so creators can focus purely on creating great content.
              </p>
            </motion.div>

            {/* Currently block */}
            <motion.div
              variants={itemVariants}
              className="pixel-card rounded-lg p-5 sm:p-6 border-l-4 border-amber bg-[#131622]"
            >
              <p className="text-xs font-silkscreen text-amber tracking-widest uppercase mb-3 font-semibold">
                CURRENT DIRECTIVES
              </p>
              <div className="space-y-2 text-text-muted text-xs sm:text-sm font-mono">
                <div className="flex items-start gap-2">
                  <span className="text-amber mt-0.5 font-retro text-[10px]">▶</span>
                  <span>Founder &amp; Talent Strategist @ Hake Acc Agency</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success mt-0.5 font-retro text-[10px]">▶</span>
                  <span>Managing 25+ top gaming &amp; entertainment YouTube channels</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan mt-0.5 font-retro text-[10px]">▶</span>
                  <span>Architecting high-security 50K+ creator Discord communities</span>
                </div>
              </div>
            </motion.div>

            {/* Strategy tags & Action */}
            <motion.div variants={itemVariants} className="space-y-4 pt-2">
              <div className="flex flex-wrap gap-1.5">
                {[
                  "YouTube Studio",
                  "Video SEO",
                  "CTR Strategy",
                  "Discord Architecture",
                  "Custom Bots",
                  "Shorts Scaling",
                  "Retention Analytics",
                  "Brand Sponsorships",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="pixel-badge text-[10px] text-cyan bg-cyan/10 border border-cyan/25"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div>
                <a
                  href="/about"
                  onMouseEnter={() => playBlip()}
                  onClick={() => playClick()}
                  className="pixel-btn pixel-btn-accent text-xs py-2 px-4 rounded inline-flex"
                >
                  Read Full Story &amp; Toolkit <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
