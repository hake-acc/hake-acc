import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";
import PixelIcon from "@/components/PixelIcon";
import { playBlip, playClick } from "@/lib/sound";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialsProps {
  data: Testimonial[];
}

export default function Testimonials({ data }: TestimonialsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % data.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [data.length]);

  const prev = () => {
    playClick();
    setDirection(-1);
    setCurrent((c) => (c - 1 + data.length) % data.length);
  };
  const next = () => {
    playClick();
    setDirection(1);
    setCurrent((c) => (c + 1) % data.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      aria-label="Testimonials section"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="text-center mb-10"
        >
          <p className="section-label mb-2">06 // Reviews & Trust</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-retro text-text-main leading-tight">
            Kind words from
            <br />
            <span className="gradient-text">creators &amp; partners.</span>
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <div className="relative">
          <div className="pixel-card rounded-2xl p-6 sm:p-10 relative overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="w-16 h-16 text-accent" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>

            {/* Quote text */}
            <div className="relative min-h-[110px] sm:min-h-[90px] mb-6">
              <AnimatePresence custom={direction} mode="wait">
                <motion.blockquote
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-text-main text-base sm:text-lg leading-relaxed font-pixel"
                >
                  &ldquo;{data[current].quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10 flex-wrap gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`author-${current}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-xs font-bold font-retro text-accent">
                    {data[current].author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold font-silkscreen text-text-main text-xs sm:text-sm">
                      {data[current].author}
                    </p>
                    <p className="text-accent text-[11px] font-mono">{data[current].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="pixel-btn pixel-btn-outline text-xs p-2 rounded"
                  aria-label="Previous testimonial"
                >
                  <PixelIcon name="chevron-left" className="text-current" />
                </button>
                <button
                  onClick={next}
                  className="pixel-btn pixel-btn-outline text-xs p-2 rounded"
                  aria-label="Next testimonial"
                >
                  <PixelIcon name="chevron-right" className="text-current" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-5">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  playClick();
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className="p-1"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <div
                  className="h-2 rounded-sm transition-all duration-200"
                  style={{
                    width: i === current ? 20 : 6,
                    background: i === current ? "#F4B860" : "rgba(255,255,255,0.2)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
