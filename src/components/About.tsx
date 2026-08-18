import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Trophy, ShieldCheck, Flame, Users, Sparkles, Youtube, MessageSquare } from "lucide-react";

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
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function About({ data }: AboutProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-28 sm:py-36 px-4 sm:px-6 overflow-hidden"
      aria-label="About section"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 sm:mb-20"
        >
          <motion.p variants={itemVariants} className="section-label mb-3">
            01 / About Me
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-text-main leading-tight"
          >
            Scaling creator brands,
            <br />
            <span className="gradient-text">driving real engagement.</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Avatar + facts */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Avatar card */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="glass-card rounded-2xl p-8 relative overflow-hidden text-center">
                {/* Pixel avatar */}
                <div className="relative w-28 h-28 rounded-2xl p-1 mb-6 mx-auto bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 border border-white/15 overflow-hidden group-hover:border-accent/40 transition-all duration-300 shadow-xl">
                  <img
                    src="/assets/hake-logo.png"
                    alt="Hake Acc avatar logo"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-success rounded-full border-2 border-[#1A1F2B]" />
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-text-main mb-1 tracking-tight">Hake Acc</h3>
                  <p className="text-accent text-sm tracking-wider uppercase font-semibold">
                    Social Media Manager • Discord Architect • Agency Founder
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 justify-center">
                  {[
                    { icon: Youtube, label: "YouTuber Strategist" },
                    { icon: MessageSquare, label: "Discord Developer" },
                    { icon: ShieldCheck, label: "Community Security" },
                    { icon: Trophy, label: "Agency Founder" },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="flex items-center gap-1.5 text-xs text-text-muted bg-surface/80 border border-white/[0.06] px-3 py-1.5 rounded-full hover:text-text-main transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-accent" />
                      {label}
                    </span>
                  ))}
                </div>
                {/* Shimmer */}
                <div className="absolute inset-0 shimmer opacity-30 pointer-events-none rounded-2xl" />
              </div>
              <div className="absolute -inset-px bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {data.facts.map((fact) => (
                <motion.div
                  key={fact.label}
                  variants={itemVariants}
                  className="glass-card rounded-xl p-5 text-center group hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-accent glow-accent mb-1">
                    {fact.value}
                  </div>
                  <div className="text-xs text-text-muted tracking-wide uppercase">
                    {fact.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-5">
              <p className="text-text-muted text-lg leading-relaxed">
                {data.bio}
              </p>
              <p className="text-text-muted leading-relaxed">
                Whether taking a gaming channel from thousands of views to millions, engineering bulletproof Discord community servers with custom bot automation, or negotiating key sponsorships, my goal is simple: deliver explosive, sustainable creator growth.
              </p>
              <p className="text-text-muted leading-relaxed">
                I partner with high-ambition YouTubers, stream collectives, and gaming organizations to manage every detail behind the scenes so creators can focus purely on creating great content.
              </p>
            </motion.div>

            {/* Currently block */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-xl p-6 border-l-2 border-accent"
            >
              <p className="text-xs text-accent tracking-widest uppercase mb-3 font-semibold">Currently</p>
              <div className="space-y-2.5 text-text-muted text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">▸</span>
                  <span>Founder &amp; Talent Strategist @ Hake Acc Agency</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success mt-0.5">▸</span>
                  <span>Managing 25+ top gaming &amp; entertainment YouTube channels</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">▸</span>
                  <span>Architecting high-security 50K+ creator Discord communities</span>
                </div>
              </div>
            </motion.div>

            {/* Tech & Strategy tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
              {[
                "YouTube Studio",
                "Video SEO",
                "CTR & Packaging",
                "Discord Architecture",
                "Custom Bots",
                "Shorts Scaling",
                "Audience Retention",
                "Brand Sponsorships",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full hover:bg-primary/20 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
