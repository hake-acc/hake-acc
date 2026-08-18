import { useState, useRef, useEffect } from "react";
import { Terminal, Send, Sparkles, RefreshCw } from "lucide-react";
import { playClick, playLaser, playSuccess } from "@/lib/sound";

interface HistoryItem {
  id: string;
  command: string;
  response: string | React.ReactNode;
  type: "user" | "bot" | "error";
  time: string;
}

const INITIAL_HISTORY: HistoryItem[] = [
  {
    id: "init-1",
    command: "/status",
    response: "🟢 [SYSTEM ONLINE] Hake Acc Creator Systems active. 25+ YouTube channels managed, 150M+ views driven, 100K+ Discord community members safeguarded.",
    type: "bot",
    time: "12:00:00",
  },
  {
    id: "init-2",
    command: "/help",
    response: "Available commands: /stats, /channels, /services, /verify, /skills, /quote, /contact, /clear",
    type: "bot",
    time: "12:00:01",
  },
];

export default function TerminalSimulator() {
  const [history, setHistory] = useState<HistoryItem[]>(INITIAL_HISTORY);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isTyping]);

  const executeCommand = (cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    playLaser();
    const timestamp = new Date().toLocaleTimeString();
    const cleanCmd = rawCmd.toLowerCase();

    const userEntry: HistoryItem = {
      id: `user-${Date.now()}`,
      command: rawCmd,
      response: "",
      type: "user",
      time: timestamp,
    };

    if (cleanCmd === "/clear" || cleanCmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    setHistory((prev) => [...prev, userEntry]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse: React.ReactNode = "";

      switch (cleanCmd) {
        case "/stats":
        case "stats":
          botResponse = (
            <div className="space-y-1 text-accent">
              <div>📊 [AGENCY STATS MATRIX]</div>
              <div>• Total Creators Managed: 25+</div>
              <div>• Total Organic Views Driven: 150,000,000+</div>
              <div>• Discord Community Reach: 100,000+ members</div>
              <div>• Avg CTR Lift: +38% across managed channels</div>
              <div>• Server Raid Incidents: 0 (100% security uptime)</div>
            </div>
          );
          break;

        case "/channels":
        case "/projects":
        case "channels":
          botResponse = (
            <div className="space-y-1 text-[#6AA9FF]">
              <div>🎮 [FEATURED CREATORS]</div>
              <div>1. Apex Gaming Hub (1.4M Subs • 48M Views) — Full Channel & Discord Ops</div>
              <div>2. Creator Superfan Hub (45K Members) — Custom Discord Bot Infrastructure</div>
              <div>3. Epic Content Collective (850K Subs • 32M Views) — Shorts & Viral Strategy</div>
              <div>4. Live Gaming Network (620K Subs • 22M Views) — Daily VOD Packaging & Sponsors</div>
              <div className="text-white/60 text-xs">→ Explore full showcases at /projects</div>
            </div>
          );
          break;

        case "/services":
        case "services":
          botResponse = (
            <div className="space-y-1 text-[#4ADE80]">
              <div>⚡ [AVAILABLE SOLUTIONS]</div>
              <div>[1] End-to-End YouTube Channel Management (SEO, CTR, Retention)</div>
              <div>[2] High-Security Discord Server Architecture & Custom Bots</div>
              <div>[3] Multi-Platform Short-Form Scaling (Shorts / TikTok / X)</div>
              <div>[4] Creator Monetization, Sponsorships & VIP Memberships</div>
            </div>
          );
          break;

        case "/verify":
        case "verify":
          playSuccess();
          botResponse = (
            <div className="space-y-1 text-[#4ADE80]">
              <div>🛡️ [VERIFICATION PASSED]</div>
              <div>Role granted: VIP Creator Partner [Level 99]</div>
              <div>Access unlocked to private growth blueprints & priority onboarding.</div>
            </div>
          );
          break;

        case "/skills":
        case "skills":
          botResponse = (
            <div className="space-y-1 text-[#8B7CF6]">
              <div>🛠️ [OPERATIONAL STACK]</div>
              <div>• YouTube Studio, VidIQ, TubeBuddy, Advanced Retention Analytics</div>
              <div>• Discord.js, Custom Discord Bots, Auto-Mod, Ticket Systems</div>
              <div>• Thumbnail A/B Packaging, Title Hook Engineering, Viral Repurposing</div>
              <div>• Brand Deal Contracts, Creator CRM, Community Event Staging</div>
            </div>
          );
          break;

        case "/quote":
        case "quote":
          const quotes = [
            "\"Great channels aren't born from algorithms — they're engineered with retention and superfan culture.\"",
            "\"A 1% increase in CTR compounded across 50 uploads equals hundreds of thousands of new subscribers.\"",
            "\"Your Discord server shouldn't just be a chat room — it's the heartbeat of your creator empire.\"",
          ];
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          botResponse = <div className="text-accent italic">{randomQuote} — Hake Acc</div>;
          break;

        case "/contact":
        case "contact":
          botResponse = (
            <div className="space-y-1 text-accent">
              <div>📬 [DIRECT CONTACT]</div>
              <div>• Email: contact@hakeacc.com</div>
              <div>• Discord: hake_acc</div>
              <div>• X/Twitter: @hake_acc</div>
              <div>Status: Accepting select creator channel & Discord contracts for Q3/Q4.</div>
            </div>
          );
          break;

        case "/help":
        case "help":
          botResponse = "Available commands: /stats, /channels, /services, /verify, /skills, /quote, /contact, /clear";
          break;

        default:
          botResponse = `Command not recognized: "${rawCmd}". Type /help for available creator console commands.`;
          break;
      }

      setHistory((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          command: rawCmd,
          response: botResponse,
          type: "bot",
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setIsTyping(false);
    }, 280);
  };

  const handleQuickCommand = (cmd: string) => {
    playClick();
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <div className="pixel-card rounded-lg overflow-hidden border border-white/10 bg-[#0d1117]/90">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f87171]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80]/80" />
          </div>
          <div className="flex items-center gap-1.5 ml-2 text-xs font-retro text-white/70">
            <Terminal className="w-3.5 h-3.5 text-accent" />
            <span>HAKE-ACC // DISCORD BOT CONSOLE v2.6</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-silkscreen bg-success/20 text-success border border-success/30 animate-pulse">
            ONLINE
          </span>
          <button
            onClick={() => handleQuickCommand("/clear")}
            className="p-1 text-white/40 hover:text-white transition-colors"
            title="Clear Console"
            aria-label="Clear Console"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="p-4 sm:p-5 font-vt323 text-base sm:text-lg min-h-[220px] max-h-[300px] overflow-y-auto space-y-3 bg-[#0a0d13]/95 text-white/90">
        <div className="text-white/40 text-sm font-mono border-b border-white/5 pb-2">
          Hake Acc Creator Infrastructure [Ready]. Run slash commands below or click preset buttons.
        </div>

        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            {item.type === "user" ? (
              <div className="flex items-center gap-2 text-accent">
                <span className="text-white/40 font-mono text-xs">[{item.time}]</span>
                <span className="text-accent font-bold">$</span>
                <span className="font-retro text-xs sm:text-sm">{item.command}</span>
              </div>
            ) : (
              <div className="pl-4 border-l-2 border-accent/30 py-0.5 text-white/90 font-mono text-sm leading-relaxed">
                {item.response}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-white/40 text-sm font-mono animate-pulse">
            <span>Executing...</span>
            <span className="inline-block w-2 h-4 bg-accent animate-pixel-blink" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Presets */}
      <div className="px-4 py-2 bg-[#12161f] border-t border-white/5 flex flex-wrap gap-1.5 items-center">
        <span className="text-[10px] font-silkscreen text-white/40 mr-1">QUICK:</span>
        {["/stats", "/channels", "/services", "/verify", "/skills", "/quote", "/contact"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleQuickCommand(cmd)}
            className="px-2 py-1 rounded bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/40 text-[11px] font-silkscreen text-white/70 hover:text-accent transition-all active:translate-y-[1px]"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Command Input Bar */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 bg-[#161b22] border-t border-white/10">
        <span className="text-accent font-retro text-xs sm:text-sm pl-1">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command (e.g. /stats, /channels, /verify)..."
          className="flex-1 bg-transparent border-none outline-none text-white text-sm font-mono placeholder:text-white/30 focus:ring-0"
        />
        <button
          type="submit"
          className="pixel-btn pixel-btn-accent text-[10px] py-1.5 px-3 rounded"
          aria-label="Send Command"
        >
          <Send className="w-3 h-3" />
          <span className="hidden sm:inline">RUN</span>
        </button>
      </form>
    </div>
  );
}
