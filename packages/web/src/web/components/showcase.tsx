import { motion } from "motion/react";

const HOTSPOTS = [
  { label: "Premium canopy", top: "6%", left: "50%" },
  { label: "Built-in battery", top: "46%", left: "8%" },
  { label: "USB-C / USB-A charging", top: "58%", left: "92%" },
  { label: "Smart display", top: "44%", left: "88%" },
  { label: "Matching colored pole", top: "80%", left: "12%" },
];

export function Showcase() {
  return (
    <section id="product" className="relative mesh-navy overflow-hidden py-28">
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[var(--c-turquoise)]/15 blur-[120px]" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-80 w-80 rounded-full bg-[var(--c-pink)]/15 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide text-white/70">
            Product reveal
          </div>
          <h2 className="mt-6 font-display text-4xl text-gradient-sand sm:text-5xl">
            Every detail, engineered for the beach.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto mt-20 flex max-w-2xl justify-center"
        >
          <img
            src="/umbrellas/turquoise_nobg.png"
            alt="AETRO Lite product detail showcase"
            className="relative z-10 w-[260px] drop-shadow-[0_50px_70px_rgba(0,0,0,0.5)] sm:w-[340px] md:w-[420px]"
          />

          {HOTSPOTS.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
              className="absolute z-20 flex items-center gap-2"
              style={{ top: h.top, left: h.left, transform: "translate(-50%, -50%)" }}
            >
              <span className="relative flex h-3 w-3">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-white/80" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
              </span>
              <span className="glass whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                {h.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
