"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Code2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperienceItem {
  position: string;
  company: string;
  date: string;
  type: string;
  details: string[];
}

interface ExperienceProps {
  data: ExperienceItem[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Experience({ data }: ExperienceProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="experience"
      className="relative py-28 sm:py-36 px-4 sm:px-6 overflow-hidden"
      aria-label="Experience section"
    >
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.p variants={itemVariants} className="section-label mb-3">
            04 / Experience
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-text-main leading-tight"
          >
            The journey so far,
            <br />
            <span className="gradient-text">chapter by chapter.</span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 sm:left-8 top-2 bottom-2 w-px bg-gradient-to-b from-accent/30 via-primary/20 to-transparent" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-10"
          >
            {data.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                variants={itemVariants}
                className="relative pl-16 sm:pl-20 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 sm:left-3 top-1 w-10 h-10 sm:w-10 sm:h-10 rounded-xl glass-card border border-white/10 flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-300">
                  {exp.type === "freelance" ? (
                    <Code2 className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                  ) : (
                    <Briefcase className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                  )}
                </div>

                {/* Card */}
                <div className="glass-card rounded-2xl p-6 sm:p-7 group-hover:border-white/12 transition-all duration-300 relative overflow-hidden">
                  {/* Hover glow */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-text-main group-hover:text-accent transition-colors duration-200">
                        {exp.position}
                      </h3>
                      <p className="text-primary text-sm font-medium mt-0.5">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={cn(
                          "text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border",
                          exp.type === "freelance"
                            ? "text-secondary bg-secondary/10 border-secondary/20"
                            : "text-success bg-success/10 border-success/20"
                        )}
                      >
                        {exp.type}
                      </span>
                      <span className="text-xs text-text-muted bg-surface/60 border border-white/[0.06] px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.date}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <ul className="space-y-2.5">
                    {exp.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-text-muted">
                        <CheckCircle2 className="w-4 h-4 text-accent/60 mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
