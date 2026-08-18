import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Youtube, MessageSquare, ExternalLink, Flame, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import PixelIcon from "@/components/PixelIcon";

interface Project {
  id: string;
  title: string;
  channelName?: string;
  description: string;
  metrics?: string;
  role?: string;
  tech: string[];
  youtubeUrl?: string;
  discordUrl?: string;
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

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const isFeatured = project.featured;

  return (
    <motion.article
      variants={itemVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "group relative glass-card rounded-2xl overflow-hidden transition-all duration-500 flex flex-col",
        isFeatured ? "col-span-1" : "col-span-1"
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
          background: `radial-gradient(ellipse at 50% 0%, ${project.color}15 0%, transparent 70%)`,
        }}
      />

      <div className="p-6 sm:p-7 flex flex-col h-full relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10"
            style={{ background: `${project.color}20` }}
          >
            <Youtube className="w-5 h-5" style={{ color: project.color }} />
          </div>
          <div className="flex items-center gap-2">
            {project.metrics && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-accent bg-accent/10 border border-accent/25 px-2.5 py-0.5 rounded-full">
                <Flame className="w-3 h-3 text-accent" />
                {project.metrics}
              </span>
            )}
          </div>
        </div>

        {/* Channel Name / Role */}
        <div className="mb-2">
          <div className="text-xs uppercase tracking-wider text-text-muted/70 font-mono mb-1">
            {project.role || "Managed Channel"}
          </div>
          <h3
            className="text-xl font-bold text-text-main group-hover:transition-colors duration-200"
            style={{ color: hovered ? project.color : undefined }}
          >
            {project.channelName || project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Tech/Strategy Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium text-text-muted bg-surface/60 border border-white/[0.06] px-2.5 py-0.5 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions / Channel Links */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] gap-2">
          {project.youtubeUrl && (
            <motion.a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-background bg-error/90 hover:bg-error px-3.5 py-1.5 rounded-lg transition-colors duration-200 tracking-wide"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label={`Visit YouTube channel for ${project.channelName || project.title}`}
            >
              <Youtube className="w-3.5 h-3.5" />
              YouTube Channel
            </motion.a>
          )}

          {project.discordUrl && (
            <motion.a
              href={project.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-secondary transition-colors duration-200 font-medium tracking-wide"
              whileHover={{ x: 2 }}
              aria-label={`Join Discord for ${project.channelName || project.title}`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Discord
            </motion.a>
          )}
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
      aria-label="Managed YouTubers section"
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
              02 / Managed Creators &amp; Channels
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-text-main leading-tight"
            >
              Top YouTubers &amp;
              <br />
              <span className="gradient-text">Communities I&apos;ve Scaled.</span>
            </motion.h2>
          </div>
          <motion.a
            variants={itemVariants}
            href="#contact"
            className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 font-medium transition-colors duration-200 self-start sm:self-auto"
            whileHover={{ x: 3 }}
          >
            Submit Channel for Management <PixelIcon name="arrow-right" className="text-current" />
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
            {displayed.map((project) => (
              <ProjectCard key={project.id} project={project} />
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
              View All Managed Channels
              <PixelIcon name="arrow-right" className="text-current" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
