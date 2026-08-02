"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  color: string;
}

interface ProjectsProps {
  data: Project[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isFeatured = project.featured;

  return (
    <motion.article
      variants={itemVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "group relative glass-card rounded-2xl overflow-hidden transition-all duration-500 flex flex-col",
        isFeatured ? "col-span-1 md:col-span-1" : "col-span-1"
      )}
      whileHover={{ y: -6, scale: 1.01 }}
    >
      {/* Color accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
      />

      {/* Glow bg */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${project.color}12 0%, transparent 70%)`,
        }}
      />

      <div className="p-6 sm:p-7 flex flex-col h-full relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10"
            style={{ background: `${project.color}20` }}
          >
            <Layers className="w-5 h-5" style={{ color: project.color }} />
          </div>
          <div className="flex items-center gap-2">
            {project.featured && (
              <span className="text-[10px] tracking-widest uppercase text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Title & description */}
        <h3
          className="text-lg font-bold text-text-main mb-2 group-hover:transition-colors duration-200"
          style={{ color: hovered ? project.color : undefined }}
        >
          {project.title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium text-text-muted bg-surface/60 border border-white/[0.06] px-2.5 py-1 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
          <motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors duration-200 font-medium tracking-wide"
            whileHover={{ x: 2 }}
            aria-label={`View live demo of ${project.title}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </motion.a>
          <span className="text-white/10">|</span>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-main transition-colors duration-200 font-medium tracking-wide"
            whileHover={{ x: 2 }}
            aria-label={`View source code of ${project.title}`}
          >
            <Github className="w-3.5 h-3.5" />
            Source
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ data }: ProjectsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? data : data.filter((p) => p.featured);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-28 sm:py-36 px-4 sm:px-6 overflow-hidden"
      aria-label="Projects section"
    >
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <motion.p variants={itemVariants} className="section-label mb-3">
              02 / Featured Work
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-text-main leading-tight"
            >
              Things I&apos;ve
              <br />
              <span className="gradient-text">shipped with pride.</span>
            </motion.h2>
          </div>
          <motion.a
            variants={itemVariants}
            href="https://github.com/hake-acc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors duration-200 self-start sm:self-auto"
            whileHover={{ x: 3 }}
          >
            All repos <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"
        >
          <AnimatePresence>
            {displayed.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more */}
        {!showAll && data.length > displayed.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 px-7 py-3 border border-white/15 text-text-muted text-sm tracking-widest uppercase rounded hover:border-primary/40 hover:text-primary transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
