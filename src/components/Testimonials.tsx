"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";
import PixelIcon from "@/components/PixelIcon";

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
    }, 5000);
    return () => clearInterval(interval);
  }, [data.length]);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + data.length) % data.length);
  };
  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % data.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative py-28 sm:py-36 px-4 sm:px-6 overflow-hidden"
      aria-label="Testimonials section"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">06 / Testimonials</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-text-main leading-tight">
            Kind words from
            <br />
            <span className="gradient-text">great collaborators.</span>
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.65 }}
          className="relative"
        >
          <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-6 right-8 opacity-10">
              <Quote className="w-16 h-16 text-accent" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>

            {/* Quote text */}
            <div className="relative h-36 sm:h-28 mb-8 overflow-hidden">
              <AnimatePresence custom={direction} mode="wait">
                <motion.blockquote
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 text-text-main text-lg sm:text-xl leading-relaxed font-medium"
                >
                  &ldquo;{data[current].quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 border border-white/10 flex items-center justify-center text-sm font-bold text-text-main">
                  {data[current].author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-text-main text-sm">{data[current].author}</p>
                  <p className="text-text-muted text-xs">{data[current].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute bottom-8 right-8 flex items-center gap-3">
              <motion.button
                onClick={prev}
                className="w-9 h-9 rounded-full glass-card border border-white/10 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous testimonial"
              >
                <PixelIcon name="chevron-left" className="text-current" />
              </motion.button>
              <motion.button
                onClick={next}
                className="w-9 h-9 rounded-full glass-card border border-white/10 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next testimonial"
              >
                <PixelIcon name="chevron-right" className="text-current" />
              </motion.button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className="transition-all duration-300"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <div
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 24 : 8,
                    background: i === current ? "#F4B860" : "rgba(255,255,255,0.15)",
                  }}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
