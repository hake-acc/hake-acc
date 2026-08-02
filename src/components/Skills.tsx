"use client";

import { useRef, type CSSProperties, type ComponentType } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Server, Palette, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

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
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const categoryColors = ["#6AA9FF", "#8B7CF6", "#F4B860", "#4ADE80"];

function SkillCard({ skill, color, index }: { skill: Skill; color: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const Icon = iconMap[skill.icon] || Monitor;

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className="glass-card rounded-2xl p-6 sm:p-7 group hover:border-white/15 transition-all duration-400 relative overflow-hidden"
      whileHover={{ y: -4 }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `${color}15` }}
      />

      {/* Icon + category */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10"
          style={{ background: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold" style={{ color }}>
            {skill.level}
            <span className="text-sm font-normal text-text-muted">%</span>
          </span>
        </div>
      </div>

      <h3 className="text-base font-bold text-text-main mb-1">{skill.category}</h3>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-surface rounded-full mb-5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
        />
      </div>

      {/* Skill items */}
      <div className="flex flex-wrap gap-2">
        {skill.items.map((item) => (
          <span
            key={item}
            className="text-[11px] text-text-muted bg-surface/80 border border-white/[0.06] px-2.5 py-1 rounded-md hover:text-text-main transition-colors duration-200 cursor-default"
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
      className="relative py-28 sm:py-36 px-4 sm:px-6 overflow-hidden"
      aria-label="Skills section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-surface/20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <motion.p variants={itemVariants} className="section-label mb-3">
            03 / Skills
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-text-main leading-tight"
          >
            Tools of the trade,
            <br />
            <span className="gradient-text">wielded with care.</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-text-muted mt-5 max-w-xl mx-auto text-base leading-relaxed"
          >
            I&apos;ve spent years refining my craft across every layer of the stack — from GPU shaders to database indexes.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-14 overflow-hidden"
          aria-hidden="true"
        >
          <div className="text-xs text-text-muted/30 tracking-[0.4em] uppercase text-center mb-4">
            Also familiar with
          </div>
          <div className="flex gap-8 items-center justify-center flex-wrap">
            {["Svelte", "Astro", "Remix", "tRPC", "Prisma", "Supabase", "Cloudflare Workers", "Rust (learning)", "WASM", "Blender", "After Effects"].map((tech) => (
              <span key={tech} className="text-xs text-text-muted/40 whitespace-nowrap hover:text-text-muted/60 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
