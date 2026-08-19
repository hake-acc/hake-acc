import { useState, useRef, type CSSProperties, type ComponentType } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Server, Palette, Cloud, Sparkles } from "lucide-react";
import { playBlip, playCoin } from "@/lib/sound";

interface Skill {
  category: string;
  icon: string;
  level: number;
  items: string[];
}

interface SkillsProps {
  data: Skill[];
}

const iconMap: Record<string, ComponentType<{ className?: string; style?: CSSProperties }>> = {
  monitor: Monitor,
  server: Server,
  palette: Palette,
  cloud: Cloud,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const categoryColors = ["#38bdf8", "#818cf8", "#f59e0b", "#10b981"];

function SkillCard({ skill, color, index }: { skill: Skill; color: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [boosted, setBoosted] = useState(false);
  const Icon = iconMap[skill.icon] || Monitor;

  const handleCardClick = () => {
    playCoin();
    setBoosted(true);
    setTimeout(() => setBoosted(false), 1200);
  };

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      onClick={handleCardClick}
      onMouseEnter={() => playBlip()}
      className={`pixel-hud-card rounded-xl p-5 sm:p-6 group relative overflow-hidden flex flex-col cursor-pointer transition-all active:translate-y-[1px] bg-[#131622] border border-border ${
        boosted ? "border-amber bg-amber/15 scale-102" : ""
      }`}
      title="Click to boost skill XP"
    >
      {/* Icon + category */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 shadow-pixel-sm bg-black/40"
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className="text-right">
          <span className="text-xl sm:text-2xl font-bold font-retro" style={{ color }}>
            {boosted ? skill.level + 4 : skill.level}
            <span className="text-xs font-silkscreen text-text-muted ml-0.5">XP</span>
          </span>
        </div>
      </div>

      <h3 className="text-sm sm:text-base font-bold font-silkscreen text-text-main mb-3 uppercase tracking-wide flex items-center justify-between">
        <span>{skill.category}</span>
        {boosted && <Sparkles className="w-3.5 h-3.5 text-amber animate-spin" />}
      </h3>

      {/* Retro Pixel Progress bar */}
      <div className="w-full h-2.5 bg-[#090a0f] border border-border rounded-sm mb-5 overflow-hidden p-0.5">
        <motion.div
          className="h-full rounded-sm pixel-crisp"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${boosted ? 100 : skill.level}%` } : { width: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
        />
      </div>

      {/* Skill items */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {skill.items.map((item) => (
          <span
            key={item}
            className="text-[10px] font-silkscreen text-text-muted bg-surface-elevated border border-border px-2 py-1 rounded hover:text-white hover:border-amber/40 transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills({ data }: SkillsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
      aria-label="Skills section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 text-center"
        >
          <motion.p variants={itemVariants} className="section-label mb-2">
            03 // Skill Proficiency
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-retro text-text-main leading-tight"
          >
            Tools of the trade,
            <br />
            <span className="gradient-text">wielded with mastery.</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-text-muted mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-readable"
          >
            End-to-end creator growth stack — from video packaging and SEO to Discord bot architecture and viral content systems.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {data.map((skill, i) => (
            <SkillCard
              key={skill.category}
              skill={skill}
              color={categoryColors[i % categoryColors.length]}
              index={i}
            />
          ))}
        </motion.div>

        {/* All technologies marquee */}
        <div className="mt-12 text-center">
          <div className="text-[10px] font-silkscreen text-text-muted/60 tracking-[0.3em] uppercase mb-3">
            CREATOR TOOLBOX &amp; ECOSYSTEMS
          </div>
          <div className="flex gap-4 sm:gap-6 items-center justify-center flex-wrap">
            {["Photoshop", "Premiere Pro", "CapCut", "VidIQ", "TubeBuddy", "SocialBlade", "Discord.js", "OBS Studio", "Patreon", "Notion CMS", "OpenAI / Claude"].map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-text-muted hover:text-amber transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
