import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Code2, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { playBlip } from "@/lib/sound";

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
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function Experience({ data }: ExperienceProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="experience"
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
      aria-label="Experience section"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.p variants={itemVariants} className="section-label mb-2">
            04 // Agency Track Record
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-retro text-text-main leading-tight"
          >
            The journey so far,
            <br />
            <span className="gradient-text">milestone by milestone.</span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 sm:left-7 top-2 bottom-2 w-0.5 bg-gradient-to-b from-amber/50 via-cyan/30 to-transparent" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {data.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                variants={itemVariants}
                onMouseEnter={() => playBlip()}
                className="relative pl-14 sm:pl-16 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 sm:left-2 top-1 w-9 h-9 sm:w-10 sm:h-10 rounded-lg pixel-card bg-[#131622] border border-border flex items-center justify-center group-hover:border-amber/50 group-hover:bg-amber/15 transition-all shadow-pixel-sm">
                  {exp.type === "agency" ? (
                    <Award className="w-4 h-4 text-amber" />
                  ) : exp.type === "freelance" ? (
                    <Code2 className="w-4 h-4 text-purple" />
                  ) : (
                    <Briefcase className="w-4 h-4 text-cyan" />
                  )}
                </div>

                {/* Card */}
                <div className="pixel-card rounded-xl p-5 sm:p-6 group-hover:border-amber/40 transition-all duration-200 bg-[#131622] border border-border">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-retro text-text-main group-hover:text-amber transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-cyan text-xs sm:text-sm font-silkscreen mt-1">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={cn(
                          "pixel-badge text-[9px] uppercase",
                          exp.type === "agency"
                            ? "text-amber bg-amber/15 border-amber/30"
                            : exp.type === "freelance"
                            ? "text-purple bg-purple/15 border-purple/30"
                            : "text-success bg-success/15 border-success/30"
                        )}
                      >
                        {exp.type}
                      </span>
                      <span className="text-[10px] font-mono text-text-muted bg-surface-elevated border border-border px-2.5 py-1 rounded whitespace-nowrap">
                        {exp.date}
                      </span>
                    </div>
                  </div>

                  {/* Details in Accessible Readable Font */}
                  <ul className="space-y-2 font-readable">
                    {exp.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-muted">
                        <span className="text-amber mt-0.5 font-retro text-[9px] shrink-0">▶</span>
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
