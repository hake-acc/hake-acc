"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { User, MapPin, Coffee, Music } from "lucide-react";

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
            Crafting worlds,
            <br />
            <span className="gradient-text">one pixel at a time.</span>
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
              <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
                {/* Pixel avatar placeholder */}
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-white/10 flex items-center justify-center mb-6 mx-auto">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-text-main mb-1">Alex Chen</h3>
                  <p className="text-accent text-sm tracking-wide">Creative Developer</p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    { icon: MapPin, label: "San Francisco" },
                    { icon: Coffee, label: "Coffee Lover" },
                    { icon: Music, label: "Chiptune Composer" },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="flex items-center gap-1.5 text-xs text-text-muted bg-surface/80 border border-white/[0.06] px-3 py-1.5 rounded-full"
                    >
                      <Icon className="w-3 h-3 text-accent" />
                      {label}
                    </span>
                  ))}
                </div>
                {/* Shimmer */}
                <div className="absolute inset-0 shimmer opacity-40 pointer-events-none rounded-2xl" />
              </div>
              <div className="absolute -inset-px bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {data.facts.map((fact, i) => (
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
                My work lives at the edge of what&apos;s possible in a browser — pushing WebGL shaders to their limits, crafting pixel-perfect component systems, and building tools that feel genuinely delightful to use.
              </p>
              <p className="text-text-muted leading-relaxed">
                I believe the best software is invisible in the best way: it disappears into the experience, leaving only the feeling of something that just <em className="text-primary not-italic">works beautifully</em>.
              </p>
            </motion.div>

            {/* Currently block */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-xl p-6 border-l-2 border-accent"
            >
              <p className="text-xs text-accent tracking-widest uppercase mb-3">Currently</p>
              <div className="space-y-2 text-text-muted text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">▸</span>
                  <span>Senior Creative Engineer @ Luminary Studios</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success mt-0.5">▸</span>
                  <span>Open to freelance & consulting projects</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">▸</span>
                  <span>Building PixelCraft Editor in public</span>
                </div>
              </div>
            </motion.div>

            {/* Tech tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "WebGL", "Framer Motion", "Node.js", "PostgreSQL", "Figma"].map((tag) => (
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
