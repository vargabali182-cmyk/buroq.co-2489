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
      {/* moving ambient background */}
      <motion.div
        className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-[var(--c-turquoise)]/20 blur-[110px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full bg-[var(--c-pink)]/20 blur-[120px]"
        animate={{ x: [0, -35, 0], y: [0, 35, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-[var(--c-yellow)]/10 blur-[100px]"
        animate={{ x: [0, 25, 0], y: [0, -25, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide text-white/80"
          >
            <Sparkles size={14} className="text-[var(--c-yellow)]" />
            BUROQ — Outdoor comfort, reimagined
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18 }}
            className="font-display text-5xl leading-[1.05] text-gradient-sand sm:text-6xl md:text-7xl"
          >
            Meet AETRO Lite
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32 }}
            className="mt-6 max-w-lg text-xl font-medium text-white/85"
          >
            The beach umbrella reimagined for modern beach days.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.42 }}
            className="mt-4 max-w-lg text-base leading-relaxed text-white/60"
          >
            A premium beach umbrella with built-in power, a smart display and
            vibrant color options — designed for beaches, resorts and long
            summer days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.button
              onClick={() => scrollTo("#waitlist")}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#07111f] shadow-[0_20px_60px_rgba(255,255,255,0.18)] transition-all hover:bg-[var(--c-turquoise)]"
            >
              Join the waitlist
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.button>

            <motion.button
              onClick={() => scrollTo("#product")}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full glass px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/15"
            >
              Explore the concept
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.7 }}
            className="mt-14 flex flex-wrap items-center gap-8 text-white/50"
          >
            <motion.div whileHover={{ y: -5 }}>
              <div className="font-display text-2xl text-white">8</div>
              <div className="text-xs tracking-wide">colorways</div>
            </motion.div>

            <div className="h-8 w-px bg-white/15" />

            <motion.div whileHover={{ y: -5 }}>
              <div className="font-display text-2xl text-white">USB-C</div>
              <div className="text-xs tracking-wide">+ USB-A power</div>
            </motion.div>

            <div className="h-8 w-px bg-white/15" />

            <motion.div whileHover={{ y: -5 }}>
              <div className="font-display text-2xl text-white">Smart</div>
              <div className="text-xs tracking-wide">battery display</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Product visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
          transition={{
            opacity: { duration: 0.9, delay: 0.15 },
            scale: { duration: 0.9, delay: 0.15 },
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            },
          }}
          className="relative flex justify-center"
        >
          <motion.div
            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-t from-[var(--c-blue)]/25 via-transparent to-transparent blur-3xl"
            animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative">
            <motion.div
              className="glass absolute -top-6 -left-8 z-20 rounded-2xl px-4 py-3 text-left shadow-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08 }}
            >
              <div className="text-[10px] uppercase tracking-wider text-white/50">
                Battery
              </div>
              <div className="font-display text-lg text-white">75%</div>
            </motion.div>

            <motion.div
              className="glass absolute -bottom-4 -right-8 z-20 rounded-2xl px-4 py-3 text-left shadow-xl"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08 }}
            >
              <div className="text-[10px] uppercase tracking-wider text-white/50">
                Temperature
              </div>
              <div className="font-display text-lg text-white">24°C</div>
            </motion.div>

            <motion.img
              src="/umbrellas/blue_nobg.png"
              alt="AETRO Lite smart beach umbrella in blue"
              className="relative z-10 w-[280px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)] sm:w-[340px] md:w-[400px]"
              whileHover={{ scale: 1.04, rotate: 1.5 }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
