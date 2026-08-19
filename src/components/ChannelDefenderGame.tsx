import { useState, useRef, useEffect, useCallback } from "react";
import {
  Gamepad2,
  Play,
  RotateCcw,
} from "lucide-react";
import {
  playLaser,
  playCoin,
  playPowerup,
  playLevelUp,
  playSuccess,
  playClick,
  isSoundEnabled,
  toggleSound,
} from "@/lib/sound";

interface Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  hp: number;
  maxHp: number;
  type: "clutter" | "raid" | "dropoff" | "boss";
  name: string;
  color: string;
  pts: number;
}

interface Projectile {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  damage: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
}

interface PowerUp {
  x: number;
  y: number;
  type: "triple" | "shield" | "bomb";
  color: string;
  name: string;
}

export default function ChannelDefenderGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover" | "victory">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [lives, setLives] = useState(3);
  const [weaponType, setWeaponType] = useState<"normal" | "triple">("normal");
  const [weaponTimer, setWeaponTimer] = useState(0);
  const [shieldActive, setShieldActive] = useState(false);
  const [shieldTimer, setShieldTimer] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  // Engine refs
  const stateRef = useRef({
    gameState: "idle" as "idle" | "playing" | "gameover" | "victory",
    score: 0,
    wave: 1,
    lives: 3,
    playerX: 200,
    playerY: 340,
    playerSpeed: 6,
    keys: { left: false, right: false, shoot: false },
    enemies: [] as Enemy[],
    projectiles: [] as Projectile[],
    particles: [] as Particle[],
    powerUps: [] as PowerUp[],
    lastShootTime: 0,
    lastEnemySpawn: 0,
    bossSpawned: false,
    weaponType: "normal" as "normal" | "triple",
    weaponTimer: 0,
    shieldActive: false,
    shieldTimer: 0,
  });

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const savedHi = localStorage.getItem("hake_arcade_hi_score");
    if (savedHi) setHighScore(Number(savedHi));
  }, []);

  const spawnParticles = (x: number, y: number, color: string, count = 12) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      stateRef.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: 2 + Math.random() * 3,
        life: 1,
        maxLife: 0.3 + Math.random() * 0.4,
      });
    }
  };

  const startGame = () => {
    playLevelUp();
    setScore(0);
    setWave(1);
    setLives(3);
    setWeaponType("normal");
    setShieldActive(false);

    stateRef.current = {
      gameState: "playing",
      score: 0,
      wave: 1,
      lives: 3,
      playerX: 200,
      playerY: 340,
      playerSpeed: 6,
      keys: { left: false, right: false, shoot: false },
      enemies: [],
      projectiles: [],
      particles: [],
      powerUps: [],
      lastShootTime: 0,
      lastEnemySpawn: 0,
      bossSpawned: false,
      weaponType: "normal",
      weaponTimer: 0,
      shieldActive: false,
      shieldTimer: 0,
    };
    setGameState("playing");
  };

  // Main Game Loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const state = stateRef.current;
      const W = canvas.width;
      const H = canvas.height;

      // Clear Canvas with trailing arcade phosphor effect
      ctx.fillStyle = "rgba(9, 10, 15, 0.35)";
      ctx.fillRect(0, 0, W, H);

      // Starfield Background
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      for (let i = 0; i < 20; i++) {
        const sx = ((i * 37 + now * 0.05) % W);
        const sy = ((i * 53 + now * 0.08) % H);
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Update Player Position
      if (state.keys.left) state.playerX = Math.max(20, state.playerX - state.playerSpeed);
      if (state.keys.right) state.playerX = Math.min(W - 20, state.playerX + state.playerSpeed);

      // Handle Weapon Timer
      if (state.weaponTimer > 0) {
        state.weaponTimer -= dt;
        if (state.weaponTimer <= 0) {
          state.weaponType = "normal";
          setWeaponType("normal");
        }
      }

      // Handle Shield Timer
      if (state.shieldTimer > 0) {
        state.shieldTimer -= dt;
        if (state.shieldTimer <= 0) {
          state.shieldActive = false;
          setShieldActive(false);
        }
      }

      // Auto / Continuous shooting when key held or tapped
      if (state.keys.shoot && now - state.lastShootTime > (state.weaponType === "triple" ? 140 : 180)) {
        playLaser();
        state.lastShootTime = now;

        if (state.weaponType === "triple") {
          state.projectiles.push(
            { x: state.playerX, y: state.playerY - 14, vx: 0, vy: -9, radius: 3, color: "#f59e0b", damage: 1 },
            { x: state.playerX - 8, y: state.playerY - 10, vx: -2.2, vy: -8.5, radius: 3, color: "#38bdf8", damage: 1 },
            { x: state.playerX + 8, y: state.playerY - 10, vx: 2.2, vy: -8.5, radius: 3, color: "#38bdf8", damage: 1 }
          );
        } else {
          state.projectiles.push({
            x: state.playerX,
            y: state.playerY - 14,
            vx: 0,
            vy: -8.5,
            radius: 3.5,
            color: "#f59e0b",
            damage: 1,
          });
        }
      }

      // Spawn Enemies
      if (now - state.lastEnemySpawn > Math.max(600, 1600 - state.wave * 180) && !state.bossSpawned) {
        state.lastEnemySpawn = now;
        const enemyTypes: Enemy["type"][] = ["clutter", "raid", "dropoff"];
        const chosen = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

        let hp = 1;
        let speed = 1.2 + Math.random() * 1.5 + state.wave * 0.2;
        let name = "LOW-CTR CLUTTER";
        let color = "#f43f5e";
        let pts = 100;
        let width = 28;
        let height = 22;

        if (chosen === "raid") {
          name = "SPAM RAID BOT";
          color = "#818cf8";
          hp = 2;
          speed = 1.0 + state.wave * 0.15;
          pts = 200;
          width = 32;
          height = 24;
        } else if (chosen === "dropoff") {
          name = "RETENTION DIP";
          color = "#fbbf24";
          hp = 1;
          speed = 2.0 + state.wave * 0.25;
          pts = 150;
          width = 24;
          height = 20;
        }

        // Spawn Boss on Wave 3 & 5
        if (state.score >= 1800 && !state.bossSpawned && state.wave >= 2) {
          state.bossSpawned = true;
          state.enemies.push({
            x: W / 2 - 45,
            y: 30,
            width: 90,
            height: 45,
            speed: 0.8,
            hp: 20 + state.wave * 10,
            maxHp: 20 + state.wave * 10,
            type: "boss",
            name: "THE ALGORITHM SLUMP",
            color: "#f59e0b",
            pts: 1500,
          });
        } else {
          state.enemies.push({
            x: 20 + Math.random() * (W - 60),
            y: -30,
            width,
            height,
            speed,
            hp,
            maxHp: hp,
            type: chosen,
            name,
            color,
            pts,
          });
        }
      }

      // Update & Render Projectiles
      for (let i = state.projectiles.length - 1; i >= 0; i--) {
        const p = state.projectiles[i];
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (p.y < -10 || p.x < 0 || p.x > W) {
          state.projectiles.splice(i, 1);
        }
      }

      // Update & Render Enemies
      for (let i = state.enemies.length - 1; i >= 0; i--) {
        const e = state.enemies[i];

        if (e.type === "boss") {
          e.y = Math.min(60, e.y + e.speed * dt * 60);
          e.x += Math.sin(now * 0.002) * 2;
        } else {
          e.y += e.speed;
        }

        // Draw Enemy
        ctx.fillStyle = e.color;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;

        if (e.type === "boss") {
          // Boss Ship Frame
          ctx.fillRect(e.x, e.y, e.width, e.height);
          ctx.strokeRect(e.x, e.y, e.width, e.height);

          // Boss Health Bar
          const hpPercent = Math.max(0, e.hp / e.maxHp);
          ctx.fillStyle = "rgba(0,0,0,0.8)";
          ctx.fillRect(e.x, e.y - 12, e.width, 6);
          ctx.fillStyle = "#f59e0b";
          ctx.fillRect(e.x, e.y - 12, e.width * hpPercent, 6);

          ctx.fillStyle = "#ffffff";
          ctx.font = "8px 'Press Start 2P', monospace";
          ctx.textAlign = "center";
          ctx.fillText("ALGORITHM BOSS", e.x + e.width / 2, e.y - 16);
        } else {
          // Standard Invader
          ctx.fillRect(e.x, e.y, e.width, e.height);
          ctx.strokeRect(e.x, e.y, e.width, e.height);

          // Mini icon label inside enemy
          ctx.fillStyle = "#090a0f";
          ctx.font = "7px 'Press Start 2P', monospace";
          ctx.textAlign = "center";
          ctx.fillText(e.type === "raid" ? "RAID" : e.type === "dropoff" ? "DIP" : "CTR", e.x + e.width / 2, e.y + e.height / 2 + 3);
        }

        // Check Collision with Projectiles
        for (let j = state.projectiles.length - 1; j >= 0; j--) {
          const p = state.projectiles[j];
          if (
            p.x >= e.x &&
            p.x <= e.x + e.width &&
            p.y >= e.y &&
            p.y <= e.y + e.height
          ) {
            e.hp -= p.damage;
            spawnParticles(p.x, p.y, e.color, 6);
            state.projectiles.splice(j, 1);

            if (e.hp <= 0) {
              playCoin();
              spawnParticles(e.x + e.width / 2, e.y + e.height / 2, e.color, 16);

              // Powerup drop chance (20%)
              if (Math.random() < 0.25 && e.type !== "boss") {
                const puTypes: PowerUp["type"][] = ["triple", "shield"];
                const puChosen = puTypes[Math.floor(Math.random() * puTypes.length)];
                state.powerUps.push({
                  x: e.x + e.width / 2,
                  y: e.y,
                  type: puChosen,
                  color: puChosen === "triple" ? "#f59e0b" : "#818cf8",
                  name: puChosen === "triple" ? "VIRAL HOOKS (3X)" : "VIP SHIELD",
                });
              }

              state.score += e.pts;
              setScore(state.score);

              if (e.type === "boss") {
                playSuccess();
                state.bossSpawned = false;
                state.wave += 1;
                setWave(state.wave);
              }

              state.enemies.splice(i, 1);
              break;
            }
          }
        }

        // Enemy Reached Bottom or Hit Player
        if (e.y > H + 10 || (Math.abs(e.x + e.width / 2 - state.playerX) < 22 && Math.abs(e.y + e.height / 2 - state.playerY) < 20)) {
          if (!state.shieldActive) {
            state.lives -= 1;
            setLives(state.lives);
            spawnParticles(state.playerX, state.playerY, "#f43f5e", 20);

            if (state.lives <= 0) {
              state.gameState = "gameover";
              setGameState("gameover");

              const currentHi = Math.max(state.score, Number(localStorage.getItem("hake_arcade_hi_score") || 0));
              localStorage.setItem("hake_arcade_hi_score", String(currentHi));
              setHighScore(currentHi);
              return;
            }
          } else {
            // Shield absorbed hit
            spawnParticles(state.playerX, state.playerY, "#818cf8", 12);
          }
          state.enemies.splice(i, 1);
        }
      }

      // Update & Render PowerUps
      for (let i = state.powerUps.length - 1; i >= 0; i--) {
        const pu = state.powerUps[i];
        pu.y += 1.5;

        ctx.fillStyle = pu.color;
        ctx.beginPath();
        ctx.arc(pu.x, pu.y, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#090a0f";
        ctx.font = "8px 'Press Start 2P', monospace";
        ctx.textAlign = "center";
        ctx.fillText(pu.type === "triple" ? "3X" : "S", pu.x, pu.y + 3);

        // Player collected powerup
        if (Math.hypot(pu.x - state.playerX, pu.y - state.playerY) < 22) {
          playPowerup();
          spawnParticles(pu.x, pu.y, pu.color, 14);

          if (pu.type === "triple") {
            state.weaponType = "triple";
            state.weaponTimer = 10;
            setWeaponType("triple");
          } else if (pu.type === "shield") {
            state.shieldActive = true;
            state.shieldTimer = 8;
            setShieldActive(true);
          }

          state.powerUps.splice(i, 1);
        } else if (pu.y > H + 20) {
          state.powerUps.splice(i, 1);
        }
      }

      // Update & Render Particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const pt = state.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= dt;

        if (pt.life <= 0) {
          state.particles.splice(i, 1);
        } else {
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = Math.max(0, pt.life / pt.maxLife);
          ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
          ctx.globalAlpha = 1.0;
        }
      }

      // Draw Player Ship (Hake Creator Security Vessel)
      ctx.save();
      ctx.translate(state.playerX, state.playerY);

      // Shield Aura
      if (state.shieldActive) {
        ctx.strokeStyle = "#818cf8";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#818cf8";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Ship Hull (Golden/Amber Arcade Fighter)
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(12, 10);
      ctx.lineTo(4, 7);
      ctx.lineTo(0, 10);
      ctx.lineTo(-4, 7);
      ctx.lineTo(-12, 10);
      ctx.closePath();
      ctx.fill();

      // Cockpit / Core
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(-2, -4, 4, 6);

      // Engine Thruster Flame
      ctx.fillStyle = Math.random() > 0.5 ? "#f43f5e" : "#fbbf24";
      ctx.beginPath();
      ctx.moveTo(-4, 10);
      ctx.lineTo(0, 16 + Math.random() * 4);
      ctx.lineTo(4, 10);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, [gameState]);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        stateRef.current.keys.left = true;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        stateRef.current.keys.right = true;
      }
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        stateRef.current.keys.shoot = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        stateRef.current.keys.left = false;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        stateRef.current.keys.right = false;
      }
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        stateRef.current.keys.shoot = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  // Touch handlers for mobile
  const handleTouchControl = (action: "left" | "right" | "shoot", isPressed: boolean) => {
    stateRef.current.keys[action] = isPressed;
  };

  return (
    <div className="w-full pixel-hud-card rounded-xl p-5 sm:p-8 bg-[#131622] border-2 border-amber/40 shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Gamepad2 className="w-4 h-4 text-amber" />
            <span className="section-label text-xs">
              RETRO ARCADE // CREATOR DEFENDER v1.0
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-retro text-text-main">
            Destroy Low-CTR &amp; Spam Raids
          </h3>
        </div>

        {/* Scoreboard in Header */}
        <div className="flex items-center gap-4 bg-[#090a0f] px-4 py-2 rounded-lg border border-border">
          <div>
            <div className="text-[9px] font-silkscreen text-text-muted uppercase">SCORE</div>
            <div className="text-sm font-bold font-retro text-amber">{score.toLocaleString()}</div>
          </div>
          <div className="h-6 w-px bg-border" />
          <div>
            <div className="text-[9px] font-silkscreen text-text-muted uppercase">HI-SCORE</div>
            <div className="text-sm font-bold font-retro text-cyan">{highScore.toLocaleString()}</div>
          </div>
          <div className="h-6 w-px bg-border" />
          <div>
            <div className="text-[9px] font-silkscreen text-text-muted uppercase">WAVE</div>
            <div className="text-sm font-bold font-retro text-purple">{wave}</div>
          </div>
        </div>
      </div>

      {/* Arcade Canvas Frame */}
      <div className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden border-2 border-border bg-[#090a0f] shadow-pixel-md">
        <canvas
          ref={canvasRef}
          width={400}
          height={380}
          className="w-full h-[320px] sm:h-[380px] object-contain block pixel-crisp cursor-crosshair"
          onClick={() => {
            if (gameState === "playing") {
              stateRef.current.keys.shoot = true;
              setTimeout(() => (stateRef.current.keys.shoot = false), 150);
            }
          }}
        />

        {/* Overlay for Idle / Start Screen */}
        {gameState === "idle" && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber/20 border border-amber/50 flex items-center justify-center text-amber animate-pulse">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-retro text-amber glow-amber">
              OPERATION: SUPERFAN
            </h4>
            <p className="text-xs sm:text-sm font-readable text-text-muted max-w-sm leading-relaxed">
              Defend your channel from Low-CTR thumbnails, viewer retention dips, and Discord raid bots. Collect Viral Hook power-ups and defeat the Algorithm Slump Boss!
            </p>
            <button
              onClick={startGame}
              className="pixel-btn pixel-btn-accent text-xs px-6 py-3 rounded flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>INSERT COIN &amp; PLAY</span>
            </button>
            <div className="text-[10px] font-mono text-text-muted/60">
              Desktop: [Arrow Keys / A,D] Move • [Spacebar] Fire
            </div>
          </div>
        )}

        {/* Overlay for Game Over Screen */}
        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in">
            <div className="text-xs font-silkscreen text-error uppercase tracking-widest">
              CHANNEL RETENTION ZEROED
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold font-retro text-error">
              GAME OVER
            </h4>
            <div className="p-4 rounded-lg bg-surface border border-border space-y-1">
              <div className="text-xs font-silkscreen text-text-muted">FINAL SCORE:</div>
              <div className="text-xl font-bold font-retro text-amber">{score.toLocaleString()} PTS</div>
              {score >= highScore && score > 0 && (
                <div className="text-[10px] font-silkscreen text-success animate-bounce">
                  ★ NEW PERSONAL RECORD! ★
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={startGame}
                className="pixel-btn pixel-btn-accent text-xs py-2.5 px-5 rounded flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>TRY AGAIN</span>
              </button>
              <a
                href="/contact"
                onClick={() => playClick()}
                className="pixel-btn pixel-btn-outline text-xs py-2.5 px-5 rounded flex items-center gap-1.5"
              >
                <span>Hire Hake To Scale Real Channel →</span>
              </a>
            </div>
          </div>
        )}

        {/* HUD Overlay inside playing canvas */}
        {gameState === "playing" && (
          <div className="absolute top-2.5 inset-x-3 flex items-center justify-between pointer-events-none text-xs font-retro">
            {/* Lives */}
            <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded border border-white/10 text-error text-[10px]">
              {Array.from({ length: lives }).map((_, i) => (
                <span key={i}>❤️</span>
              ))}
            </div>

            {/* Active Powerups Status */}
            <div className="flex items-center gap-2 text-[9px] font-silkscreen">
              {weaponType === "triple" && (
                <span className="px-2 py-0.5 rounded bg-amber/20 text-amber border border-amber/40 animate-pulse">
                  3X SPREAD
                </span>
              )}
              {shieldActive && (
                <span className="px-2 py-0.5 rounded bg-purple/20 text-purple border border-purple/40 animate-pulse">
                  VIP SHIELD
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Onscreen Arcade Controls */}
      {gameState === "playing" && (
        <div className="flex items-center justify-between max-w-md mx-auto sm:hidden pt-2 gap-4">
          <div className="flex gap-2">
            <button
              onTouchStart={() => handleTouchControl("left", true)}
              onTouchEnd={() => handleTouchControl("left", false)}
              onMouseDown={() => handleTouchControl("left", true)}
              onMouseUp={() => handleTouchControl("left", false)}
              aria-label="Move ship left"
              className="w-14 h-12 rounded-lg bg-surface border border-border text-amber font-retro text-lg active:bg-amber/20 flex items-center justify-center select-none"
            >
              ◀
            </button>
            <button
              onTouchStart={() => handleTouchControl("right", true)}
              onTouchEnd={() => handleTouchControl("right", false)}
              onMouseDown={() => handleTouchControl("right", true)}
              onMouseUp={() => handleTouchControl("right", false)}
              aria-label="Move ship right"
              className="w-14 h-12 rounded-lg bg-surface border border-border text-amber font-retro text-lg active:bg-amber/20 flex items-center justify-center select-none"
            >
              ▶
            </button>
          </div>

          <button
            onTouchStart={() => handleTouchControl("shoot", true)}
            onTouchEnd={() => handleTouchControl("shoot", false)}
            onMouseDown={() => handleTouchControl("shoot", true)}
            onMouseUp={() => handleTouchControl("shoot", false)}
            aria-label="Fire defense laser"
            className="flex-1 h-12 rounded-lg bg-amber text-canvas font-silkscreen text-xs font-bold active:bg-amber-light shadow-pixel-sm flex items-center justify-center select-none"
          >
            FIRE LASER
          </button>
        </div>
      )}
    </div>
  );
}
