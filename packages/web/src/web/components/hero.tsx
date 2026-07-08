import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="top"
      className="relative mesh-navy min-h-screen overflow-hidden pt-36 pb-20 md:pt-44"
    >
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-[var(--c-turquoise)]/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full bg-[var(--c-pink)]/20 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-[var(--c-yellow)]/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide text-white/80">
            <Sparkles size={14} className="text-[var(--c-yellow)]" />
            BUROQ — Outdoor comfort, reimagined
          </div>

          <h1 className="font-display text-5xl leading-[1.05] text-gradient-sand sm:text-6xl md:text-7xl">
            Meet AETRO Lite
          </h1>

          <p className="mt-6 max-w-lg text-xl font-medium text-white/85">
            The beach umbrella reimagined for modern beach days.
          </p>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60">
            A premium beach umbrella with built-in power, a smart display and
            vibrant color options — designed for beaches, resorts and long
            summer days.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo("#waitlist")}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[var(--navy)] transition-all hover:bg-[var(--c-turquoise)]"
            >
              Join the waitlist
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => scrollTo("#product")}
              className="rounded-full glass px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/15"
            >
              Explore the concept
            </button>
          </div>

          <div className="mt-14 flex items-center gap-8 text-white/50">
            <div>
              <div className="font-display text-2xl text-white">8</div>
              <div className="text-xs tracking-wide">colorways</div>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div>
              <div className="font-display text-2xl text-white">USB‑C</div>
              <div className="text-xs tracking-wide">+ USB‑A power</div>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div>
              <div className="font-display text-2xl text-white">Smart</div>
              <div className="text-xs tracking-wide">battery display</div>
            </div>
          </div>
        </motion.div>

        {/* Product visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-t from-[var(--c-blue)]/25 via-transparent to-transparent blur-3xl" />

          <div className="relative animate-float">
            <div className="glass absolute -top-6 -left-8 z-20 rounded-2xl px-4 py-3 text-left shadow-xl">
              <div className="text-[10px] uppercase tracking-wider text-white/50">
                Battery
              </div>
              <div className="font-display text-lg text-white">75%</div>
            </div>
            <div className="glass absolute -bottom-4 -right-8 z-20 rounded-2xl px-4 py-3 text-left shadow-xl">
              <div className="text-[10px] uppercase tracking-wider text-white/50">
                Temperature
              </div>
              <div className="font-display text-lg text-white">24°C</div>
            </div>

            <img
              src="/umbrellas/blue_nobg.png"
              alt="AETRO Lite smart beach umbrella in blue"
              className="relative z-10 w-[280px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)] sm:w-[340px] md:w-[400px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
