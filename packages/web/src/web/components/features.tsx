import { motion } from "motion/react";
import { BatteryCharging, Gauge, Palette } from "lucide-react";

const FEATURES = [
  {
    icon: BatteryCharging,
    color: "var(--c-turquoise)",
    title: "Built-in power",
    text: "Charge your phone, earbuds or small devices directly from your umbrella.",
  },
  {
    icon: Gauge,
    color: "var(--c-blue)",
    title: "Smart display",
    text: "See battery level and temperature at a glance.",
  },
  {
    icon: Palette,
    color: "var(--c-pink)",
    title: "Premium beach design",
    text: "Vibrant colorways, matching poles and a clean modern silhouette.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative mesh-sand py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-4xl leading-tight text-[var(--navy)] sm:text-5xl">
            Shade, power and comfort —<br /> in one clean design.
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="glass-light group rounded-3xl p-8 shadow-[0_8px_40px_rgba(11,27,43,0.06)] transition-transform hover:-translate-y-2"
            >
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${f.color}33` }}
              >
                <f.icon size={26} style={{ color: f.color }} />
              </div>
              <h3 className="font-display text-2xl text-[var(--navy)]">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--navy)]/60">
                {f.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
