"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Layers, Gamepad2, Zap, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  title: string;
  icon: string;
  description: string;
}

interface ServicesProps {
  data: Service[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  layers: Layers,
  "gamepad-2": Gamepad2,
  zap: Zap,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const serviceColors = ["#6AA9FF", "#8B7CF6", "#F4B860", "#4ADE80"];

export default function Services({ data }: ServicesProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-28 sm:py-36 px-4 sm:px-6 overflow-hidden"
      aria-label="Services section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-surface/15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <motion.p variants={itemVariants} className="section-label mb-3">
            05 / Services
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-text-main leading-tight"
          >
            How I can help
            <br />
            <span className="gradient-text">your next project.</span>
          </motion.h2>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {data.map((service, i) => {
            const Icon = iconMap[service.icon] || Sparkles;
            const color = serviceColors[i % serviceColors.length];
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="glass-card rounded-2xl p-6 group hover:border-white/15 transition-all duration-400 relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                {/* Glow bg */}
                <div
                  className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% -10%, ${color}15, transparent 70%)`,
                  }}
                />

                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
                />

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>

                  <h3 className="text-base font-bold text-text-main mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-text-muted/50 group-hover:text-accent transition-colors duration-300">
                    <span className="tracking-wide">Learn more</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="text-text-muted mb-6 text-sm">
            Ready to start something extraordinary?
          </p>
          <motion.button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-background text-sm font-bold tracking-widest uppercase rounded hover:bg-accent/90 transition-all duration-200"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Let&apos;s Work Together
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
