import { motion } from "motion/react";
import { BatteryCharging, Gauge, Palette, Usb } from "lucide-react";

const FEATURES = [
  {
    icon: BatteryCharging,
    color: "var(--c-turquoise)",
    title: "Built-in power",
    text: "Charge your phone, earbuds or small devices directly from your umbrella.",
    stat: "All-day comfort",
  },
  {
    icon: Usb,
    color: "var(--c-yellow)",
    title: "USB-C + USB-A",
    text: "Modern charging ports built into a clean, minimal pole design.",
    stat: "No extra powerbank",
  },
  {
    icon: Gauge,
    color: "var(--c-blue)",
    title: "Smart display",
    text: "See battery level and temperature at a glance through a flush vertical display.",
    stat: "Live status",
  },
  {
    icon: Palette,
    color: "var(--c-pink)",
    title: "Premium beach design",
    text: "Vibrant colorways, matching poles and a clean modern silhouette.",
    stat: "8 colorways",
  },
];

export function Features() {
  return (
    <section id="features" className="relative mesh-sand overflow-hidden py-28">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-white/40 blur-[120px]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--navy)]/45">
            AETRO Lite
          </p>

          <h2 className="font-display text-4xl leading-tight text-[var(--navy)] sm:text-5xl md:text-6xl">
            Shade, power and comfort —
            <br />
            in one clean design.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--navy)]/55">
            Designed for modern beach days, resorts and long summer hours
            outside.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 34, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="glass-light group relative overflow-hidden rounded-3xl p-8 shadow-[0_8px_40px_rgba(11,27,43,0.06)]"
            >
              <motion.div
                className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                style={{ backgroundColor: f.color }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative z-10">
                <motion.div
                  className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${f.color}33` }}
                  whileHover={{ rotate: 6, scale: 1.12 }}
                  transition={{ duration: 0.25 }}
                >
                  <f.icon size={26} style={{ color: f.color }} />
                </motion.div>

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--navy)]/35">
                  {f.stat}
                </p>

                <h3 className="font-display text-2xl text-[var(--navy)]">
                  {f.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-[var(--navy)]/60">
                  {f.text}
                </p>

                <motion.div
                  className="mt-8 h-px w-full bg-[var(--navy)]/10"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }}
                />

                <div className="mt-5 text-xs font-medium text-[var(--navy)]/40 transition-colors group-hover:text-[var(--navy)]/70">
                  Explore feature
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
