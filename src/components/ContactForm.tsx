import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Youtube, Twitter, Github, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

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
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ContactForm({ data }: ContactProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fields, setFields] = useState({ name: "", email: "", channelLink: "", message: "" });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fields.name.trim()) newErrors.name = "Name or Channel name is required.";
    if (!fields.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      newErrors.email = "Please enter a valid email.";
    if (!fields.message.trim()) newErrors.message = "Message is required.";
    else if (fields.message.trim().length < 15)
      newErrors.message = "Message must be at least 15 characters.";
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

    // Simulated async submission
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("success");
  };

  const inputClasses = (field: string) =>
    cn(
      "w-full bg-surface/60 border rounded-xl px-4 py-3 text-text-main placeholder:text-text-muted/50 text-sm transition-all duration-200 focus:outline-none focus:ring-1.5 focus:ring-accent/50 focus:border-accent/40",
      errors[field]
        ? "border-error/60 bg-error/5"
        : "border-white/[0.07] hover:border-white/15 focus:border-accent/40"
    );

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-28 sm:py-36 px-4 sm:px-6 overflow-hidden"
      aria-label="Contact section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-surface/15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <motion.p variants={itemVariants} className="section-label mb-3">
            07 / Get In Touch
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-text-main leading-tight"
          >
            Ready to scale your channel
            <br />
            <span className="gradient-text">and dominate your niche?</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-text-muted mt-5 max-w-xl mx-auto text-base leading-relaxed"
          >
            Whether you&apos;re a creator looking for channel management, need a high-security Discord server, or want agency scaling — let&apos;s connect.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left: info panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact info */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 space-y-5">
              <p className="text-xs text-accent tracking-widest uppercase mb-4 font-semibold">Direct Contact</p>
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-[10px] text-text-muted/60 uppercase tracking-wide mb-0.5">Email</p>
                  <span className="text-sm font-medium text-text-main">{data.email}</span>
                </div>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-text-muted/60 uppercase tracking-wide mb-0.5">Location</p>
                  <span className="text-sm font-medium text-text-main">{data.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
              <p className="text-xs text-accent tracking-widest uppercase mb-4 font-semibold">Find Me Online</p>
              <div className="space-y-3">
                {[
                  { icon: MessageSquare, label: "Discord", url: "#", sub: data.discord || "hake_acc" },
                  { icon: Youtube, label: "YouTube", url: data.youtube || "https://youtube.com", sub: "Creator Hub" },
                  { icon: Twitter, label: "Twitter / X", url: data.twitter || "https://twitter.com/hake_acc", sub: "@hake_acc" },
                  { icon: Github, label: "GitHub", url: data.github || "https://github.com/hake-acc", sub: "@hake-acc" },
                ].map(({ icon: Icon, label, url, sub }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group hover:text-accent transition-colors duration-200"
                    aria-label={`Visit ${label}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-surface border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:border-accent/40 group-hover:bg-accent/10 transition-all">
                      <Icon className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-text-main block">{label}</span>
                      <span className="text-[10px] text-text-muted/60">{sub}</span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5 border-l-2 border-success">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs text-success font-medium tracking-wide uppercase">Open for Clients</span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">
                Accepting new YouTube channel management clients, creator consulting, and Discord server projects.
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
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-success/15 border border-success/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-xl font-bold text-text-main">Inquiry Received!</h3>
                  <p className="text-text-muted text-sm max-w-xs">
                    Thanks for reaching out! I&apos;ll review your channel/details and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setFormState("idle");
                      setFields({ name: "", email: "", channelLink: "", message: "" });
                    }}
                    className="mt-2 text-xs text-accent hover:underline tracking-wide"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs text-text-muted tracking-wide mb-2">
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
                        <p className="mt-1.5 text-[11px] text-error flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs text-text-muted tracking-wide mb-2">
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
                        <p className="mt-1.5 text-[11px] text-error flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="channelLink" className="block text-xs text-text-muted tracking-wide mb-2">
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
                    <label htmlFor="message" className="block text-xs text-text-muted tracking-wide mb-2">
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
                        <p className="text-[11px] text-error flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-[11px] text-text-muted/40 shrink-0">
                        {fields.message.length} chars
                      </span>
                    </div>
                  </div>

                  {formState === "error" && (
                    <div className="flex items-center gap-2 text-error text-sm bg-error/10 border border-error/20 rounded-lg px-4 py-3">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Something went wrong. Please try again or email directly.
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-background text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                    whileHover={formState !== "loading" ? { scale: 1.02, y: -1 } : {}}
                    whileTap={formState !== "loading" ? { scale: 0.98 } : {}}
                  >
                    {formState === "loading" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-background/40 border-t-background rounded-full"
                        />
                        Sending Inquiry...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Inquiry
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
