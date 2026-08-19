import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Youtube, MessageSquare, Flame, ArrowRight, Sparkles, X, TrendingUp, Users, Eye, CheckCircle2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { playBlip, playClick, playCoin, playSuccess } from "@/lib/sound";

interface Project {
  id: string;
  title: string;
  channelName?: string;
  subscribers?: string;
  avgViews?: string;
  ctrGain?: string;
  discordMembers?: string;
  viewsGraph?: number[];
  graphLabels?: string[];
  description: string;
  longDescription?: string;
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
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function Projects({ data, showFilterTabs = false }: ProjectsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openDrawer = (project: Project) => {
    playCoin();
    setSelectedProject(project);
  };

  const closeDrawer = () => {
    playClick();
    setSelectedProject(null);
  };

  const filters = [
    { id: "all", label: "ALL CHANNELS" },
    { id: "youtube", label: "YOUTUBE GROWTH" },
    { id: "discord", label: "DISCORD HUBS" },
  ];

  let filtered = data;
  if (selectedFilter === "youtube") {
    filtered = data.filter((p) =>
      p.tech.some(
        (t) =>
          t.toLowerCase().includes("youtube") ||
          t.toLowerCase().includes("seo") ||
          t.toLowerCase().includes("ctr")
      )
    );
  } else if (selectedFilter === "discord") {
    filtered = data.filter((p) =>
      p.tech.some(
        (t) =>
          t.toLowerCase().includes("discord") ||
          t.toLowerCase().includes("community") ||
          t.toLowerCase().includes("bot")
      )
    );
  }

  const displayed = showAll || showFilterTabs ? filtered : filtered.filter((p) => p.featured);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
      aria-label="Managed YouTubers section"
    >
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
              02 // Creator Showcase &amp; Growth Proof
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
                  "px-3.5 py-1.5 rounded text-xs font-silkscreen uppercase transition-all duration-150 border cursor-pointer",
                  selectedFilter === f.id
                    ? "bg-amber text-canvas font-bold border-amber shadow-pixel-sm"
                    : "bg-surface text-text-muted hover:text-white border-border hover:bg-surface-elevated"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Channels Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
        >
          <AnimatePresence>
            {displayed.map((project) => (
              <motion.article
                key={project.id}
                variants={itemVariants}
                onClick={() => openDrawer(project)}
                className="group relative pixel-hud-card rounded-xl overflow-hidden flex flex-col transition-all duration-200 bg-[#131622] border border-border hover:border-amber/60 cursor-pointer shadow-lg hover:shadow-2xl"
              >
                {/* Top color accent bar */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: `linear-gradient(90deg, ${project.color}, #f59e0b)` }}
                />

                <div className="p-5 sm:p-6 flex flex-col h-full relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 bg-black/40 shadow-pixel-sm">
                      <Youtube className="w-5 h-5" style={{ color: project.color }} />
                    </div>
                    {project.subscribers && (
                      <span className="pixel-badge bg-amber/15 border border-amber/40 text-amber font-bold">
                        <Users className="w-3.5 h-3.5 text-amber shrink-0" />
                        {project.subscribers} SUBS
                      </span>
                    )}
                  </div>

                  {/* Role & Channel Name */}
                  <div className="mb-3">
                    <div className="text-[10px] uppercase font-silkscreen text-text-muted mb-1 tracking-wider">
                      {project.role || "Managed Channel"}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold font-retro text-text-main group-hover:text-amber transition-colors">
                      {project.channelName || project.title}
                    </h3>
                  </div>

                  {/* Real stats badges */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-lg bg-[#090a0f] border border-border">
                    <div>
                      <div className="text-[9px] font-silkscreen text-text-muted">AVG VIEWS</div>
                      <div className="text-xs font-bold font-mono text-cyan truncate">
                        {project.avgViews || "60K - 180K"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-silkscreen text-text-muted">CTR GAIN</div>
                      <div className="text-xs font-bold font-mono text-success">
                        {project.ctrGain || "+160% Lift"}
                      </div>
                    </div>
                  </div>

                  {/* Multi-line Description in Accessible Font */}
                  <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-5 flex-1 font-readable">
                    {project.description}
                  </p>

                  {/* Tech/Strategy Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-silkscreen text-text-muted bg-surface-elevated border border-border px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action / Inspect Button (Keeps on site) */}
                  <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                    <span className="text-xs font-silkscreen text-amber group-hover:underline flex items-center gap-1">
                      <span>Inspect Metrics &amp; Growth Graph</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-[10px] font-mono text-text-muted/60">HUD DRAWER</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more button */}
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

      {/* ========================================================================= */}
      {/* IN-APP RETRO CASE STUDY DRAWER HUD (Keeps Creator On-Site with Pure Pride) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-40"
            />

            {/* Modal HUD Drawer Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-3xl bg-[#131622] border-2 border-amber/50 rounded-2xl p-6 sm:p-8 shadow-2xl z-50 max-h-[90vh] overflow-y-auto space-y-6 text-text-main font-readable"
            >
              {/* Title Bar */}
              <div className="flex items-start justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/20 bg-black/50 shadow-pixel-sm"
                    style={{ color: selectedProject.color }}
                  >
                    <Youtube className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-silkscreen text-amber uppercase font-semibold">
                      VERIFIED CASE STUDY // {selectedProject.role}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-retro text-white">
                      {selectedProject.channelName}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={closeDrawer}
                  className="p-2 rounded-lg bg-surface border border-border text-text-muted hover:text-white hover:border-amber/50 transition-colors"
                  aria-label="Close Case Study Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 3 Core Metric Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#090a0f] border border-border text-center space-y-1">
                  <div className="text-[10px] font-silkscreen text-text-muted uppercase">REAL SUBSCRIBER COUNT</div>
                  <div className="text-xl sm:text-2xl font-bold font-retro text-amber">
                    {selectedProject.subscribers || "200,000+"}
                  </div>
                  <div className="text-[10px] font-mono text-success">Verified Milestone</div>
                </div>

                <div className="p-4 rounded-xl bg-[#090a0f] border border-border text-center space-y-1">
                  <div className="text-[10px] font-silkscreen text-text-muted uppercase">AVG VIEWS PER UPLOAD</div>
                  <div className="text-xl sm:text-2xl font-bold font-retro text-cyan">
                    {selectedProject.avgViews || "75,000 - 190,000"}
                  </div>
                  <div className="text-[10px] font-mono text-cyan">{selectedProject.ctrGain || "+160% CTR Gain"}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#090a0f] border border-border text-center space-y-1">
                  <div className="text-[10px] font-silkscreen text-text-muted uppercase">DISCORD SUPERFANS</div>
                  <div className="text-xl sm:text-2xl font-bold font-retro text-purple">
                    {selectedProject.discordMembers ? `${selectedProject.discordMembers}` : "30,000+"}
                  </div>
                  <div className="text-[10px] font-mono text-purple">Active Community Members</div>
                </div>
              </div>

              {/* Interactive Growth Trajectory Graph (SVG) */}
              <div className="p-5 rounded-xl bg-[#090a0f] border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-silkscreen text-amber flex items-center gap-1.5 font-semibold">
                    <TrendingUp className="w-4 h-4 text-amber" />
                    <span>MONTH-OVER-MONTH VIEW &amp; AUDIENCE TRAJECTORY</span>
                  </span>
                  <span className="text-[10px] font-mono text-success">● COMPOUNDING GROWTH</span>
                </div>

                {/* SVG Line Graph */}
                <div className="w-full h-36 relative flex items-end pt-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="hudGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Area fill */}
                    <path
                      d="M 0,90 L 50,75 L 110,60 L 180,45 L 250,28 L 320,18 L 400,8 L 400,100 L 0,100 Z"
                      fill="url(#hudGrad)"
                    />

                    {/* Glowing Stroke Line */}
                    <path
                      d="M 0,90 L 50,75 L 110,60 L 180,45 L 250,28 L 320,18 L 400,8"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Data Points */}
                    {[
                      { cx: 0, cy: 90, val: "Start" },
                      { cx: 110, cy: 60, val: "M3" },
                      { cx: 250, cy: 28, val: "M5" },
                      { cx: 400, cy: 8, val: "Peak" },
                    ].map((pt, i) => (
                      <g key={i}>
                        <circle cx={pt.cx} cy={pt.cy} r="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                      </g>
                    ))}
                  </svg>
                </div>

                <div className="flex justify-between text-[10px] font-mono text-text-muted pt-2 border-t border-white/5">
                  <span>Month 1: Initial Baseline</span>
                  <span>Month 3: Hook Engineering</span>
                  <span>Month 5: Shorts Repurposing</span>
                  <span className="text-amber font-bold">Current: Superfan Retention</span>
                </div>
              </div>

              {/* Deep Strategy & Execution Breakdown */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold font-retro text-text-main">Strategy &amp; System Deliverables:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-lg bg-surface-elevated border border-border space-y-1">
                    <div className="text-amber font-silkscreen font-semibold">1. THUMBNAIL &amp; TITLE HOOKS</div>
                    <p className="text-text-muted leading-relaxed">
                      Redesigned 3-point contrast hierarchy and facial saturation, lifting click-through rates from ~4.5% to double-digit performance.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-surface-elevated border border-border space-y-1">
                    <div className="text-purple font-silkscreen font-semibold">2. DISCORD SUPERHUB</div>
                    <p className="text-text-muted leading-relaxed">
                      Hardened anti-raid permissions, deployed custom leveling bots, and converted video viewers into active daily superfans.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                <a
                  href={selectedProject.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  className="text-xs font-silkscreen text-text-muted hover:text-white flex items-center gap-1.5"
                >
                  <Youtube className="w-4 h-4 text-error" />
                  <span>View Official YouTube Channel (External) ↗</span>
                </a>

                <a
                  href="/contact"
                  onClick={() => {
                    playSuccess();
                    closeDrawer();
                  }}
                  className="pixel-btn pixel-btn-accent text-xs py-3 px-6 rounded w-full sm:w-auto text-center font-bold"
                >
                  Apply This Packaging System To My Channel →
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
