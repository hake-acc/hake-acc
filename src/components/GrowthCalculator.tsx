import { useState } from "react";
import { TrendingUp, Users, Eye, ArrowRight, Video } from "lucide-react";
import { playCoin, playSliderTick } from "@/lib/sound";

export default function GrowthCalculator() {
  const [views, setViews] = useState(500000); // 500k views
  const [discordMembers, setDiscordMembers] = useState(15000); // 15k members
  const [uploadsPerMonth, setUploadsPerMonth] = useState(8); // 8 uploads

  // Real formula based on 25+ managed creators
  const extraViews = Math.round(views * 0.38); // +38% CTR & SEO view boost
  const adRevenueLift = Math.round((extraViews / 1000) * 3.8); // $3.80 CPM
  const discordVipRevenue = Math.round(discordMembers * 0.18); // $0.18 per member monthly conversion
  const sponsorshipBoost = Math.round(uploadsPerMonth * (views / 100000) * 120); // brand rate multiplier
  const totalMonthlyLift = adRevenueLift + discordVipRevenue + sponsorshipBoost;
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
    <div className="pixel-hud-card rounded-xl p-6 sm:p-8 bg-[#131622] border border-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-amber rounded-sm" />
            <span className="section-label text-xs">
              CREATOR ROI &amp; COMMUNITY SCALING SIMULATOR
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-retro text-text-main">
            Simulate Channel &amp; Discord Growth
          </h3>
        </div>
        <div className="px-3 py-1 bg-amber/15 border border-amber/40 rounded text-amber font-silkscreen text-xs font-semibold">
          HAKE ACC GROWTH ENGINE
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Slider 1: Monthly Views */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="views-range" className="flex items-center gap-2 text-xs sm:text-sm font-silkscreen text-white cursor-pointer">
                <Eye className="w-4 h-4 text-cyan" />
                <span>Monthly YouTube Views</span>
              </label>
              <span className="text-sm sm:text-base font-bold font-retro text-cyan">
                {formatNumber(views)}
              </span>
            </div>
            <input
              id="views-range"
              type="range"
              min="50000"
              max="10000000"
              step="50000"
              value={views}
              aria-label="Monthly YouTube Views Slider"
              onChange={(e) => {
                setViews(Number(e.target.value));
                playSliderTick();
              }}
              className="w-full h-2.5 bg-[#090a0f] rounded-lg appearance-none cursor-pointer accent-cyan"
            />
            <div className="flex justify-between text-[10px] font-mono text-text-muted">
              <span>50K</span>
              <span>1M</span>
              <span>5M</span>
              <span>10M+</span>
            </div>
          </div>

          {/* Slider 2: Discord Members */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="discord-range" className="flex items-center gap-2 text-xs sm:text-sm font-silkscreen text-white cursor-pointer">
                <Users className="w-4 h-4 text-purple" />
                <span>Target Discord Community Size</span>
              </label>
              <span className="text-sm sm:text-base font-bold font-retro text-purple">
                {formatNumber(discordMembers)}
              </span>
            </div>
            <input
              id="discord-range"
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={discordMembers}
              aria-label="Target Discord Community Size Slider"
              onChange={(e) => {
                setDiscordMembers(Number(e.target.value));
                playSliderTick();
              }}
              className="w-full h-2.5 bg-[#090a0f] rounded-lg appearance-none cursor-pointer accent-purple"
            />
            <div className="flex justify-between text-[10px] font-mono text-text-muted">
              <span>1K</span>
              <span>25K</span>
              <span>50K</span>
              <span>100K+</span>
            </div>
          </div>

          {/* Slider 3: Uploads per Month */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="uploads-range" className="flex items-center gap-2 text-xs sm:text-sm font-silkscreen text-white cursor-pointer">
                <Video className="w-4 h-4 text-amber" />
                <span>Upload Cadence (Videos / Month)</span>
              </label>
              <span className="text-sm sm:text-base font-bold font-retro text-amber">
                {uploadsPerMonth} uploads
              </span>
            </div>
            <input
              id="uploads-range"
              type="range"
              min="1"
              max="20"
              step="1"
              value={uploadsPerMonth}
              aria-label="Upload Cadence Videos per Month Slider"
              onChange={(e) => {
                setUploadsPerMonth(Number(e.target.value));
                playSliderTick();
              }}
              className="w-full h-2.5 bg-[#090a0f] rounded-lg appearance-none cursor-pointer accent-amber"
            />
            <div className="flex justify-between text-[10px] font-mono text-text-muted">
              <span>1 / mo</span>
              <span>4 / mo</span>
              <span>10 / mo</span>
              <span>20 / mo</span>
            </div>
          </div>

          <div className="p-3.5 bg-black/40 rounded-lg border border-border text-xs text-text-muted font-readable leading-relaxed">
            💡 Projections modeled on real benchmark data across 25+ managed creator channels averaging +38% CTR lift and 42% retention improvement.
          </div>
        </div>

        {/* Projected Results Box (5 cols) */}
        <div className="lg:col-span-5 bg-[#090a0f] rounded-xl p-5 sm:p-6 border-2 border-amber/30 space-y-4 shadow-pixel-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-silkscreen text-amber uppercase tracking-wide">
              ⚡ PROJECTED 90-DAY ACCELERATION
            </span>
            <span className="text-[10px] font-mono text-success">ESTIMATED</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-surface border border-border">
              <div className="text-[10px] font-silkscreen text-text-muted uppercase">EXTRA MONTHLY VIEWS</div>
              <div className="text-base sm:text-lg font-bold font-retro text-cyan mt-1">
                +{formatNumber(extraViews)}
              </div>
              <div className="text-[10px] text-success font-mono mt-0.5">+38% CTR &amp; SEO</div>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border">
              <div className="text-[10px] font-silkscreen text-text-muted uppercase">DISCORD SUPERFANS</div>
              <div className="text-base sm:text-lg font-bold font-retro text-purple mt-1">
                +{formatNumber(activeCommunityBoost)}
              </div>
              <div className="text-[10px] text-amber font-mono mt-0.5">Active VIP Members</div>
            </div>

            <div className="col-span-2 p-4 rounded-lg bg-amber/10 border border-amber/40 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-silkscreen text-amber uppercase">
                  EST. TOTAL MONTHLY REVENUE &amp; SPONSOR ACCELERATION
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-retro text-white mt-1">
                  +${totalMonthlyLift.toLocaleString()}
                  <span className="text-xs font-mono text-text-muted ml-1">/month</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-amber shrink-0" />
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
