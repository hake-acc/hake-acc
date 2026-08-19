import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Youtube, MessageSquare, Flame, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import PixelIcon from "@/components/PixelIcon";
import { playBlip, playClick, playCoin } from "@/lib/sound";

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
  showFilterTabs?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      variants={itemVariants}
      onHoverStart={() => {
        setHovered(true);
        playBlip();
      }}
      onHoverEnd={() => setHovered(false)}
      className="group relative pixel-hud-card rounded-xl overflow-hidden flex flex-col transition-all duration-200"
    >
      {/* Top color accent bar */}
      <div
        className="h-1.5 w-full"
        style={{ background: `linear-gradient(90deg, ${project.color}, #FFC837)` }}
      />

      <div className="p-5 sm:p-6 flex flex-col h-full relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/15 shadow-pixel-sm"
            style={{ background: `${project.color}25` }}
          >
            <Youtube className="w-5 h-5" style={{ color: project.color }} />
          </div>
          {project.metrics && (
            <span className="pixel-badge bg-accent/15 border border-accent/40 text-accent font-bold">
              <Flame className="w-3.5 h-3.5 text-accent shrink-0" />
              {project.metrics}
            </span>
          )}
        </div>

        {/* Role & Channel Name */}
        <div className="mb-3">
          <div className="text-[10px] uppercase font-silkscreen text-white/50 mb-1 tracking-wider">
            {project.role || "Managed Channel"}
          </div>
          <h3
            className="text-lg sm:text-xl font-bold font-retro text-text-main group-hover:text-accent transition-colors"
            style={{ color: hovered ? project.color : undefined }}
          >
            {project.channelName || project.title}
          </h3>
        </div>

        {/* Description with enhanced legibility */}
        <p className="text-white/85 text-xs sm:text-sm leading-relaxed mb-5 flex-1 font-pixel font-medium">
          {project.description}
        </p>

        {/* Tech/Strategy Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] font-silkscreen text-white/75 bg-white/5 border border-white/10 px-2 py-0.5 rounded"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions / Channel Links */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] gap-2">
          {project.youtubeUrl && (
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playCoin()}
              className="pixel-btn pixel-btn-accent text-[10px] py-1.5 px-3 rounded flex items-center gap-1.5 font-bold"
              aria-label={`Visit YouTube channel for ${project.channelName || project.title}`}
            >
              <Youtube className="w-3.5 h-3.5 text-black" />
              <span>Visit Channel →</span>
            </a>
          )}

          {project.discordUrl && (
            <a
              href={project.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="flex items-center gap-1 text-xs font-silkscreen text-white/60 hover:text-secondary transition-colors"
              aria-label={`Join Discord for ${project.channelName || project.title}`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Discord Hub</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ data, showFilterTabs = false }: ProjectsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filters = [
    { id: "all", label: "ALL CHANNELS" },
    { id: "youtube", label: "YOUTUBE GROWTH" },
    { id: "discord", label: "DISCORD HUBS" },
  ];

  let filtered = data;
  if (selectedFilter === "youtube") {
    filtered = data.filter((p) => p.tech.some((t) => t.toLowerCase().includes("youtube") || t.toLowerCase().includes("seo") || t.toLowerCase().includes("ctr")));
  } else if (selectedFilter === "discord") {
    filtered = data.filter((p) => p.tech.some((t) => t.toLowerCase().includes("discord") || t.toLowerCase().includes("community") || t.toLowerCase().includes("bot")));
  }

  const displayed = showAll || showFilterTabs ? filtered : filtered.filter((p) => p.featured);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
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
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <motion.p variants={itemVariants} className="section-label mb-2">
              02 // Creator Showcase
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-retro text-text-main leading-tight"
            >
              Top YouTubers &amp;
              <br />
              <span className="gradient-text">Communities I&apos;ve Scaled.</span>
            </motion.h2>
          </div>
          <motion.a
            variants={itemVariants}
            href="/contact"
            onMouseEnter={() => playBlip()}
            onClick={() => playClick()}
            className="pixel-btn pixel-btn-outline text-xs py-2 px-4 rounded self-start sm:self-auto inline-flex items-center gap-1.5"
          >
            Submit Channel <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>
        </motion.div>

        {/* Category Tabs (if enabled) */}
        {showFilterTabs && (
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  playClick();
                  setSelectedFilter(f.id);
                }}
                className={cn(
                  "px-3.5 py-1.5 rounded text-xs font-silkscreen uppercase transition-all duration-150 border",
                  selectedFilter === f.id
                    ? "bg-accent text-background font-bold border-accent shadow-pixel-sm"
                    : "bg-white/5 text-white/60 hover:text-white border-white/10 hover:bg-white/10"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
        >
          <AnimatePresence>
            {displayed.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more button / link to dedicated page */}
        {!showAll && !showFilterTabs && data.length > displayed.length && (
          <div className="flex justify-center mt-6">
            <a
              href="/projects"
              onMouseEnter={() => playBlip()}
              onClick={() => playClick()}
              className="pixel-btn pixel-btn-outline text-xs py-2.5 px-6 rounded inline-flex items-center gap-2"
            >
              <span>Explore All {data.length} Managed Channels</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
