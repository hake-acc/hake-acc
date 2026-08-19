import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { playBlip, playClick } from "@/lib/sound";

interface PageNavProps {
  prevHref?: string;
  prevLabel?: string;
  nextHref?: string;
  nextLabel?: string;
}

export default function PageNav({
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
}: PageNavProps) {
  return (
    <nav
      aria-label="Page sequence navigation"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full"
    >
      <div className="pixel-card rounded-xl p-5 sm:p-6 bg-[#121620]/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevHref ? (
          <a
            href={prevHref}
            data-astro-prefetch
            onMouseEnter={() => playBlip()}
            onClick={() => playClick()}
            className="pixel-btn pixel-btn-outline text-xs py-2 px-4 rounded w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{prevLabel || "Previous"}</span>
          </a>
        ) : (
          <div className="hidden sm:block" />
        )}

        <div className="text-center">
          <a
            href="/contact"
            data-astro-prefetch
            onMouseEnter={() => playBlip()}
            onClick={() => playClick()}
            className="inline-flex items-center gap-1.5 text-xs font-silkscreen text-accent hover:underline"
          >
            <Sparkles className="w-3 h-3 text-accent" />
            <span>Ready to scale your channel? Let's talk →</span>
          </a>
        </div>

        {nextHref ? (
          <a
            href={nextHref}
            data-astro-prefetch
            onMouseEnter={() => playBlip()}
            onClick={() => playClick()}
            className="pixel-btn pixel-btn-accent text-xs py-2 px-4 rounded w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <span>{nextLabel || "Next"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </nav>
  );
}
