import { useState } from "react";
import { TrendingUp, Users, Eye, Zap, ArrowRight, Sparkles } from "lucide-react";
import { playClick, playCoin } from "@/lib/sound";

export default function GrowthCalculator() {
  const [views, setViews] = useState(500000); // 500k views
  const [discordMembers, setDiscordMembers] = useState(15000); // 15k members

  // Projected metrics calculations
  const extraViews = Math.round(views * 0.38); // +38% view boost from SEO/CTR
  const estimatedRevenueLift = Math.round((extraViews / 1000) * 4.5 + (discordMembers * 0.15));
  const activeCommunityBoost = Math.round(discordMembers * 0.42);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toLocaleString();
  };

  return (
    <div className="pixel-card rounded-lg p-6 sm:p-8 bg-[#121620]/90 border border-accent/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-accent rounded-sm animate-pulse" />
            <span className="text-xs font-silkscreen text-accent uppercase tracking-wider">
              CREATOR ROI & SYSTEM ESTIMATOR
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-pixel text-text-main">
            Simulate Your Channel & Discord Scaling
          </h3>
        </div>
        <div className="px-3 py-1 bg-accent/10 border border-accent/30 rounded text-accent font-silkscreen text-xs">
          HAKE ACC GROWTH FORMULA
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Sliders Area */}
        <div className="space-y-6">
          {/* Slider 1: Monthly Views */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm font-silkscreen text-white/80">
                <Eye className="w-4 h-4 text-[#6AA9FF]" />
                <span>Monthly YouTube Views</span>
              </label>
              <span className="text-base font-bold font-retro text-[#6AA9FF]">
                {formatNumber(views)}
              </span>
            </div>
            <input
              type="range"
              min="50000"
              max="10000000"
              step="50000"
              value={views}
              onChange={(e) => {
                setViews(Number(e.target.value));
                playClick();
              }}
              className="w-full h-2.5 bg-[#1e2533] rounded-lg appearance-none cursor-pointer accent-[#6AA9FF]"
            />
            <div className="flex justify-between text-[10px] font-mono text-white/40">
              <span>50K</span>
              <span>1M</span>
              <span>5M</span>
              <span>10M+</span>
            </div>
          </div>

          {/* Slider 2: Discord Members */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm font-silkscreen text-white/80">
                <Users className="w-4 h-4 text-[#8B7CF6]" />
                <span>Target Discord Community Size</span>
              </label>
              <span className="text-base font-bold font-retro text-[#8B7CF6]">
                {formatNumber(discordMembers)}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={discordMembers}
              onChange={(e) => {
                setDiscordMembers(Number(e.target.value));
                playClick();
              }}
              className="w-full h-2.5 bg-[#1e2533] rounded-lg appearance-none cursor-pointer accent-[#8B7CF6]"
            />
            <div className="flex justify-between text-[10px] font-mono text-white/40">
              <span>1K</span>
              <span>25K</span>
              <span>50K</span>
              <span>100K+</span>
            </div>
          </div>

          <div className="p-3 bg-white/5 rounded border border-white/5 text-xs text-text-muted font-mono leading-relaxed">
            💡 Calculated using real historical data from 25+ managed creator channels averaging +38% CTR lift and 42% retention improvement.
          </div>
        </div>

        {/* Projected Results Box */}
        <div className="bg-[#0b0e14] rounded-lg p-5 sm:p-6 border border-accent/30 space-y-4 shadow-pixel-sm">
          <div className="text-xs font-silkscreen text-accent/80 tracking-wide uppercase border-b border-white/5 pb-2">
            ⚡ PROJECTED 90-DAY ACCELERATION
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded bg-white/5 border border-white/5">
              <div className="text-[11px] font-silkscreen text-white/50">EXTRA MONTHLY VIEWS</div>
              <div className="text-lg sm:text-xl font-bold font-retro text-[#6AA9FF] mt-1">
                +{formatNumber(extraViews)}
              </div>
              <div className="text-[10px] text-success font-mono mt-0.5">+38% CTR & SEO Lift</div>
            </div>

            <div className="p-3 rounded bg-white/5 border border-white/5">
              <div className="text-[11px] font-silkscreen text-white/50">ACTIVE SUPERFANS</div>
              <div className="text-lg sm:text-xl font-bold font-retro text-[#8B7CF6] mt-1">
                +{formatNumber(activeCommunityBoost)}
              </div>
              <div className="text-[10px] text-accent font-mono mt-0.5">Engaged Discord VIPs</div>
            </div>

            <div className="col-span-2 p-4 rounded bg-accent/10 border border-accent/30 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-silkscreen text-accent uppercase">
                  EST. VALUE & SPONSOR ACCELERATION
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-retro text-text-main mt-1">
                  +${estimatedRevenueLift.toLocaleString()}
                  <span className="text-xs font-mono text-white/60 ml-1">/month</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-accent shrink-0" />
            </div>
          </div>

          <a
            href="/contact"
            onClick={() => playCoin()}
            className="w-full pixel-btn pixel-btn-accent text-center block text-xs py-3 rounded"
          >
            Claim Your Creator Growth Plan <ArrowRight className="w-4 h-4 inline-block ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
