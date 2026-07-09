import { motion } from "motion/react";
import { Battery, Cable, Umbrella } from "lucide-react";

const POINTS = [
  {
    icon: Battery,
    title: "Dead phones on the beach",
    text: "AETRO Lite brings built-in power directly into your beach setup, so you do not need to carry a separate power bank.",
  },
  {
    icon: Cable,
    title: "Messy accessories",
    text: "Charging ports, battery status and display are integrated into one clean product instead of separate devices.",
  },
  {
    icon: Umbrella,
    title: "Basic umbrellas feel outdated",
    text: "A premium silhouette, vibrant colorways and smart details turn a simple umbrella into a modern outdoor product.",
  },
];

export function Why() {
  return (
    <section className="relative mesh-navy overflow-hidden py-28">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-[var(--c-yellow)]/10 blur-[120px]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[var(--c-turquoise)]/10 blur-[120px]"
        animate={{ x: [0, 45, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-[var(--c-pink)]/10 blur-[120px]"
        animate={{ x: [0, -45, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/35">
            Why AETRO exists
          </p>

          <h2 className="font-display text-4xl leading-tight text-gradient-sand sm:text-5xl md:text-6xl">
            Beach umbrellas have barely
            <br className="hidden sm:block" /> changed for decades.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
            AETRO Lite brings everyday beach comfort into the modern era. No
            more dead phones, messy power banks or basic umbrellas. Just shade,
            power and a cleaner beach setup.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {POINTS.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 34, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-8 text-left backdrop-blur shadow-[0_20px_70px_rgba(0,0,0,0.18)]"
            >
              <motion.div
                className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-white/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.12 }}
                  className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10"
                >
                  <point.icon size={26} className="text-white" />
                </motion.div>

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
                  0{i + 1}
                </p>

                <h3 className="font-display text-2xl text-white">
                  {point.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-white/55">
                  {point.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-16 max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center backdrop-blur"
        >
          <p className="font-display text-2xl text-white sm:text-3xl">
            Not just shade. A smarter beach experience.
          </p>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50">
            BUROQ is building premium outdoor products that combine protection,
            comfort and useful technology in a clean design.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
