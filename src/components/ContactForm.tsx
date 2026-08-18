import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Youtube, Twitter, Github, MessageSquare, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { playBlip, playClick, playLaser, playSuccess } from "@/lib/sound";

interface ContactProps {
  data: {
    email: string;
    discord?: string;
    twitter?: string;
    github?: string;
    youtube?: string;
    location: string;
  };
}

type FormState = "idle" | "loading" | "success" | "error";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function ContactForm({ data }: ContactProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fields, setFields] = useState({ name: "", email: "", channelLink: "", message: "" });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    playSuccess();
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fields.name.trim()) newErrors.name = "Name or Channel name is required.";
    if (!fields.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      newErrors.email = "Please enter a valid email.";
    if (!fields.message.trim()) newErrors.message = "Message is required.";
    else if (fields.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("loading");
    playLaser();

    // Simulated async submission
    await new Promise((r) => setTimeout(r, 1200));
    playSuccess();
    setFormState("success");
  };

  const inputClasses = (field: string) =>
    cn(
      "w-full bg-[#121622] border rounded px-4 py-2.5 text-text-main placeholder:text-text-muted/40 text-sm font-pixel transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-accent",
      errors[field]
        ? "border-error/80 bg-error/5"
        : "border-white/10 hover:border-white/20 focus:border-accent"
    );

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      aria-label="Contact section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 text-center"
        >
          <motion.p variants={itemVariants} className="section-label mb-2">
            07 // Get In Touch
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-retro text-text-main leading-tight"
          >
            Ready to scale your channel
            <br />
            <span className="gradient-text">and dominate your niche?</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-text-muted mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-pixel"
          >
            Whether you&apos;re looking for YouTube management, need a high-security Discord server, or want creator agency growth — send an inquiry below.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Left: info panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2 space-y-5"
          >
            {/* Contact info & Quick Copy */}
            <motion.div variants={itemVariants} className="pixel-card rounded-xl p-5 sm:p-6 space-y-4">
              <p className="text-xs font-silkscreen text-accent tracking-wider uppercase mb-3 font-semibold">
                DIRECT CONTACT
              </p>

              {/* Email */}
              <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-[9px] font-silkscreen text-white/50 uppercase">Email</p>
                    <span className="text-xs sm:text-sm font-mono text-text-main">{data.email}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(data.email, "email")}
                  className="pixel-btn pixel-btn-outline text-[10px] p-1.5 rounded"
                  title="Copy Email"
                  aria-label="Copy Email"
                >
                  {copiedKey === "email" ? (
                    <span className="flex items-center gap-1 text-success text-[10px]">
                      <Check className="w-3 h-3" /> COPIED
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Discord */}
              <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-secondary/15 border border-secondary/30 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[9px] font-silkscreen text-white/50 uppercase">Discord ID</p>
                    <span className="text-xs sm:text-sm font-mono text-text-main">{data.discord || "hake_acc"}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(data.discord || "hake_acc", "discord")}
                  className="pixel-btn pixel-btn-outline text-[10px] p-1.5 rounded"
                  title="Copy Discord"
                  aria-label="Copy Discord"
                >
                  {copiedKey === "discord" ? (
                    <span className="flex items-center gap-1 text-success text-[10px]">
                      <Check className="w-3 h-3" /> COPIED
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-3 rounded bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[9px] font-silkscreen text-white/50 uppercase">Location & Timezones</p>
                  <span className="text-xs sm:text-sm font-mono text-text-main">{data.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="pixel-card rounded-xl p-5 sm:p-6">
              <p className="text-xs font-silkscreen text-accent tracking-wider uppercase mb-3 font-semibold">
                OFFICIAL LINKS
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Youtube, label: "YouTube", url: data.youtube || "https://youtube.com", sub: "Channel Hub" },
                  { icon: Twitter, label: "Twitter/X", url: data.twitter || "https://twitter.com/hake_acc", sub: "@hake_acc" },
                  { icon: Github, label: "GitHub", url: data.github || "https://github.com/hake-acc", sub: "@hake-acc" },
                  { icon: MessageSquare, label: "Discord", url: "https://discord.gg", sub: "Join Server" },
                ].map(({ icon: Icon, label, url, sub }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => playBlip()}
                    onClick={() => playClick()}
                    className="flex items-center gap-2 p-2.5 rounded bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-accent/10 transition-all text-left group"
                    aria-label={`Visit ${label}`}
                  >
                    <Icon className="w-4 h-4 text-white/60 group-hover:text-accent shrink-0" />
                    <div>
                      <span className="text-xs font-silkscreen text-text-main block">{label}</span>
                      <span className="text-[9px] font-mono text-text-muted/60">{sub}</span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div variants={itemVariants} className="pixel-card rounded-xl p-4 sm:p-5 border-l-4 border-success">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 bg-success rounded-full" />
                <span className="text-xs font-silkscreen text-success uppercase">
                  OPEN FOR CREATOR CONTRACTS
                </span>
              </div>
              <p className="text-text-muted text-xs font-pixel leading-relaxed">
                Accepting select YouTube channel management clients, creator consulting, and Discord architecture builds for Q3/Q4.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <motion.div variants={itemVariants} className="pixel-card rounded-xl p-6 sm:p-8 relative overflow-hidden">
              {formState === "success" ? (
                <div className="py-10 flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-success/20 border border-success/40 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-success" />
                  </div>
                  <h3 className="text-xl font-bold font-retro text-text-main">Inquiry Sent!</h3>
                  <p className="text-text-muted text-xs sm:text-sm max-w-xs font-pixel leading-relaxed">
                    Thank you! I&apos;ll review your channel metrics and respond to your email within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      playClick();
                      setFormState("idle");
                      setFields({ name: "", email: "", channelLink: "", message: "" });
                    }}
                    className="pixel-btn pixel-btn-accent text-xs mt-2 py-2 px-4 rounded"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-silkscreen text-text-muted uppercase mb-1.5">
                        Your Name / Channel Name <span className="text-error">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="e.g. Apex Gaming / Hake"
                        value={fields.name}
                        onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
                        className={inputClasses("name")}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-[10px] text-error flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-silkscreen text-text-muted uppercase mb-1.5">
                        Email Address <span className="text-error">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="creator@example.com"
                        value={fields.email}
                        onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
                        className={inputClasses("email")}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-[10px] text-error flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="channelLink" className="block text-xs font-silkscreen text-text-muted uppercase mb-1.5">
                      YouTube Channel / Discord Server Link (Optional)
                    </label>
                    <input
                      id="channelLink"
                      type="url"
                      placeholder="https://youtube.com/@yourchannel or https://discord.gg/..."
                      value={fields.channelLink}
                      onChange={(e) => setFields((f) => ({ ...f, channelLink: e.target.value }))}
                      className={inputClasses("channelLink")}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-silkscreen text-text-muted uppercase mb-1.5">
                      Project Details / Goals <span className="text-error">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about your channel, current subscriber count, Discord needs, or management goals..."
                      value={fields.message}
                      onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
                      className={cn(inputClasses("message"), "resize-none")}
                    />
                    <div className="flex justify-between items-start mt-1">
                      {errors.message ? (
                        <p className="text-[10px] text-error flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" /> {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-[10px] text-text-muted/40 font-mono shrink-0">
                        {fields.message.length} chars
                      </span>
                    </div>
                  </div>

                  {formState === "error" && (
                    <div className="flex items-center gap-2 text-error text-xs bg-error/10 border border-error/20 rounded p-3 font-mono">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Something went wrong. Please try again or email directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full pixel-btn pixel-btn-accent text-xs sm:text-sm py-3 px-6 rounded"
                  >
                    {formState === "loading" ? (
                      <span>SENDING INQUIRY...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 inline-block mr-1" />
                        <span>TRANSMIT INQUIRY</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
