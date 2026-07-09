import { useState } from "react";
import { motion } from "motion/react";

const HOTSPOTS = [
  {
    label: "Premium canopy",
    description: "Durable shade fabric designed for clean summer aesthetics.",
    top: "6%",
    left: "50%",
  },
  {
    label: "Built-in battery",
    description: "Integrated power source hidden inside the umbrella body.",
    top: "46%",
    left: "8%",
  },
  {
    label: "USB-C / USB-A charging",
    description: "Charge your phone and small devices directly from the pole.",
    top: "58%",
    left: "92%",
  },
  {
    label: "Smart display",
    description: "Battery and temperature information at a glance.",
    top: "44%",
    left: "88%",
  },
  {
    label: "Matching colored pole",
    description: "A clean premium look with coordinated color options.",
    top: "80%",
    left: "12%",
  },
];

export function Showcase() {
  const [active, setActive] = useState(0);
  const activeHotspot = HOTSPOTS[active];

  return (
    <section id="product" className="relative mesh-navy overflow-hidden py-28">
      <motion.div
        className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[var(--c-turquoise)]/15 blur-[120px]"
        animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute left-0 bottom-0 h-80 w-80 rounded-full bg-[var(--c-pink)]/15 blur-[120px]"
        animate={{ x: [0, 35, 0], y: [0, -30, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide text-white/70">
            Product reveal
          </div>

          <h2 className="mt-6 font-display text-4xl text-gradient-sand sm:text-5xl md:text-6xl">
            Every detail, engineered
            <br />
            for the beach.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55">
            Explore the key details of AETRO Lite — from built-in power to the
            clean display and premium color-matched design.
          </p>
        </motion.div>

        <div className="mt-20 grid items-center gap-14 md:grid-cols-[1fr_320px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="relative mx-auto flex w-full max-w-2xl justify-center"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 -z-10 rounded-full bg-[var(--c-blue)]/20 blur-3xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.img
                src="/umbrellas/turquoise_nobg.png"
                alt="AETRO Lite product detail showcase"
                className="relative z-10 w-[260px] drop-shadow-[0_50px_70px_rgba(0,0,0,0.5)] sm:w-[340px] md:w-[420px]"
                whileHover={{ scale: 1.04, rotate: 1 }}
                transition={{ duration: 0.3 }}
              />

              {HOTSPOTS.map((h, i) => (
                <motion.button
                  key={h.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.55 + i * 0.12 }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  whileHover={{ scale: 1.08 }}
                  className="absolute z-20 flex items-center gap-2"
                  style={{
                    top: h.top,
                    left: h.left,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span className="relative flex h-3 w-3">
                    <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-white/80" />
                    <span
                      className={`relative inline-flex h-3 w-3 rounded-full ${
                        active === i ? "bg-[var(--c-turquoise)]" : "bg-white"
                      }`}
                    />
                  </span>

                  <span
                    className={`glass whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium shadow-lg transition-all ${
                      active === i
                        ? "text-white ring-1 ring-white/30"
                        : "text-white/75"
                    }`}
                  >
                    {h.label}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            key={activeHotspot.label}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="glass rounded-[2rem] p-7 text-left shadow-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
              Selected detail
            </p>

            <h3 className="mt-4 font-display text-3xl text-white">
              {activeHotspot.label}
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {activeHotspot.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {HOTSPOTS.map((h, i) => (
                <button
                  key={h.label}
                  onClick={() => setActive(i)}
                  className={`rounded-2xl px-4 py-3 text-left text-xs font-medium transition-all ${
                    active === i
                      ? "bg-white text-[var(--navy)]"
                      : "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
