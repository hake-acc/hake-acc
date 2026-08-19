import { useRef, type CSSProperties, type ComponentType } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Layers, Gamepad2, Zap, ArrowRight } from "lucide-react";
import PixelIcon from "@/components/PixelIcon";
import { playBlip, playClick } from "@/lib/sound";

interface Service {
  title: string;
  icon: string;
  description: string;
}

interface ServicesProps {
  data: Service[];
}

const iconMap: Record<string, ComponentType<{ className?: string; style?: CSSProperties }>> = {
  sparkles: Sparkles,
  layers: Layers,
  "gamepad-2": Gamepad2,
  zap: Zap,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const serviceColors = ["#38bdf8", "#818cf8", "#f59e0b", "#10b981"];

export default function Services({ data }: ServicesProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
      aria-label="Services section"
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
            05 // Agency Solutions
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-retro text-text-main leading-tight"
          >
            How I can scale
            <br />
            <span className="gradient-text">your creator brand.</span>
          </motion.h2>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {data.map((service, i) => {
            const Icon = iconMap[service.icon] || Sparkles;
            const color = serviceColors[i % serviceColors.length];
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                onMouseEnter={() => playBlip()}
                className="pixel-hud-card rounded-xl p-5 sm:p-6 group relative overflow-hidden flex flex-col transition-all duration-200 bg-[#131622] border border-border"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center border border-white/10 mb-4 shadow-pixel-sm bg-black/40"
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>

                  <h3 className="text-sm sm:text-base font-bold font-retro text-text-main mb-2 group-hover:text-amber transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-4 flex-1 font-readable">
                    {service.description}
                  </p>

                  <a
                    href="/services"
                    onClick={() => playClick()}
                    className="flex items-center gap-1 text-xs font-silkscreen text-white/50 group-hover:text-amber transition-colors mt-auto pt-2 border-t border-border"
                  >
                    <span>View Breakdown</span>
                    <PixelIcon name="arrow-up-right" className="text-current" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-text-muted mb-5 text-sm font-readable">
            Ready to deploy an elite channel and community management infrastructure?
          </p>
          <a
            href="/contact"
            onMouseEnter={() => playBlip()}
            onClick={() => playClick()}
            className="pixel-btn pixel-btn-accent text-xs sm:text-sm py-3 px-8 rounded inline-flex items-center gap-2"
          >
            <span>Let&apos;s Work Together</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
