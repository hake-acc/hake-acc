import { useState, useRef, useEffect } from "react";
import { Terminal, Send, RefreshCw } from "lucide-react";
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
            <div className="space-y-1 text-amber font-readable">
              <div className="font-bold font-retro text-xs">📊 [AGENCY STATS MATRIX]</div>
              <div>• Total Creators Managed: 25+ verified channels</div>
              <div>• Total Organic Views Driven: 150,000,000+ views</div>
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
            <div className="space-y-1 text-cyan font-readable">
              <div className="font-bold font-retro text-xs">🎮 [FEATURED CREATORS &amp; CHANNELS]</div>
              <div>1. Alex Adi XD — Gaming &amp; Entertainment (@alexadixdofficial)</div>
              <div>2. Mc thunder Playz — Gaming &amp; Community Hub (@mcthunderxdofficial)</div>
              <div>3. Not Vangid — Creator &amp; Content Channel (@notvangid)</div>
              <div>4. Sky Plays — Gameplay &amp; Streams (@oneskyplayz)</div>
              <div>5. Upper Gaming — Gaming Network &amp; Hub (@upper_gaming)</div>
              <div>6. Cappy Mc — Main Gaming Channel (@cappy-mc)</div>
              <div>7. CappuXD — Secondary Highlights Channel (@CappuXD)</div>
              <div>8. Arpan GamzO — Gaming &amp; Entertainment (@arpangamzo_official)</div>
              <div className="text-white/60 text-xs">→ Explore full direct links at /projects</div>
            </div>
          );
          break;

        case "/services":
        case "services":
          botResponse = (
            <div className="space-y-1 text-success font-readable">
              <div className="font-bold font-retro text-xs">⚡ [AVAILABLE SOLUTIONS]</div>
              <div>[1] End-to-End YouTube Channel Management (SEO, CTR, Retention)</div>
              <div>[2] High-Security Discord Server Architecture &amp; Custom Bots</div>
              <div>[3] Multi-Platform Short-Form Scaling (Shorts / TikTok / X)</div>
              <div>[4] Creator Monetization, Sponsorships &amp; VIP Memberships</div>
            </div>
          );
          break;

        case "/verify":
        case "verify":
          playSuccess();
          botResponse = (
            <div className="space-y-1 text-success font-readable">
              <div className="font-bold font-retro text-xs">🛡️ [VERIFICATION PASSED]</div>
              <div>Role granted: VIP Creator Partner [Level 99]</div>
              <div>Access unlocked to private growth blueprints &amp; priority onboarding.</div>
            </div>
          );
          break;

        case "/skills":
        case "skills":
          botResponse = (
            <div className="space-y-1 text-purple font-readable">
              <div className="font-bold font-retro text-xs">🛠️ [OPERATIONAL STACK]</div>
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
          botResponse = <div className="text-amber italic font-readable">{randomQuote} — Hake Acc</div>;
          break;

        case "/contact":
        case "contact":
          botResponse = (
            <div className="space-y-1 text-amber font-readable">
              <div className="font-bold font-retro text-xs">📬 [DIRECT CONTACT]</div>
              <div>• Email: contact@hakeacc.com</div>
              <div>• Discord: hake_acc</div>
              <div>• X/Twitter: @hake_acc</div>
              <div>Status: Accepting select creator channel &amp; Discord contracts for 2026.</div>
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
    <div className="pixel-hud-card rounded-xl overflow-hidden border border-border bg-[#131622]">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-elevated border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
          </div>
          <div className="flex items-center gap-1.5 ml-2 text-xs font-retro text-white/70">
            <Terminal className="w-3.5 h-3.5 text-amber" />
            <span>HAKE-ACC // DISCORD BOT CONSOLE v2.6</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-silkscreen bg-success/20 text-success border border-success/30">
            ONLINE
          </span>
          <button
            onClick={() => handleQuickCommand("/clear")}
            className="p-1 text-text-muted hover:text-white transition-colors"
            title="Clear Console"
            aria-label="Clear Console"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="p-4 sm:p-5 text-sm sm:text-base min-h-[220px] max-h-[300px] overflow-y-auto space-y-3 bg-[#090a0f] text-text-main font-mono">
        <div className="text-text-muted/60 text-xs border-b border-white/5 pb-2">
          Hake Acc Creator Infrastructure [Ready]. Run slash commands below or click preset buttons.
        </div>

        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            {item.type === "user" ? (
              <div className="flex items-center gap-2 text-amber">
                <span className="text-text-muted/50 text-xs">[{item.time}]</span>
                <span className="text-amber font-bold">$</span>
                <span className="font-retro text-xs sm:text-sm">{item.command}</span>
              </div>
            ) : (
              <div className="pl-4 border-l-2 border-amber/40 py-0.5 text-text-main text-xs sm:text-sm leading-relaxed">
                {item.response}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-text-muted text-xs animate-pulse">
            <span>Executing...</span>
            <span className="inline-block w-2 h-4 bg-amber animate-pulse" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Presets */}
      <div className="px-4 py-2 bg-surface-elevated border-t border-border flex flex-wrap gap-1.5 items-center">
        <span className="text-[10px] font-silkscreen text-text-muted mr-1">QUICK:</span>
        {["/stats", "/channels", "/services", "/verify", "/skills", "/quote", "/contact"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleQuickCommand(cmd)}
            className="px-2 py-1 rounded bg-surface hover:bg-amber/20 border border-border hover:border-amber/40 text-[11px] font-silkscreen text-text-muted hover:text-amber transition-all active:translate-y-[1px]"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Command Input Bar */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 bg-surface-elevated border-t border-border">
        <span className="text-amber font-retro text-xs sm:text-sm pl-1">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command (e.g. /stats, /channels, /verify)..."
          className="flex-1 bg-transparent border-none outline-none text-white text-xs sm:text-sm font-mono placeholder:text-text-muted/40 focus:ring-0"
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
