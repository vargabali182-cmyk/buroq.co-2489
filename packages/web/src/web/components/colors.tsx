import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const COLORS = [
  { name: "Pink", file: "pink_nobg.png", hex: "#F4A9BC" },
  { name: "Green", file: "green_nobg.png", hex: "#A9C79A" },
  { name: "Blue", file: "blue_nobg.png", hex: "#A7C6E8" },
  { name: "Purple", file: "purple_nobg.png", hex: "#C6B3DE" },
  { name: "Yellow", file: "yellow_nobg.png", hex: "#F3D477" },
  { name: "Red", file: "red_nobg.png", hex: "#E4685B" },
  { name: "Orange", file: "orange_nobg.png", hex: "#F0AE7C" },
  { name: "Turquoise", file: "turquoise_nobg.png", hex: "#9FDCCF" },
];

export function Colors() {
  const [selected, setSelected] = useState(2);
  const color = COLORS[selected];

  return (
    <section id="colors" className="relative mesh-sand overflow-hidden py-28">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full blur-[120px]"
        style={{ backgroundColor: color.hex }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--navy)]/45">
            Colorways
          </p>

          <h2 className="font-display text-4xl text-[var(--navy)] sm:text-5xl md:text-6xl">
            Choose your shade.
          </h2>

          <p className="mt-5 text-[var(--navy)]/60">
            Eight vibrant colorways, each with a perfectly matched pole.
          </p>
        </motion.div>

        <div className="mt-16 grid items-center gap-12 md:grid-cols-[1fr_420px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex min-h-[420px] items-center justify-center rounded-[2.5rem] border border-white/50 bg-white/45 p-10 shadow-[0_20px_70px_rgba(11,27,43,0.10)] backdrop-blur"
            style={{
              background: `linear-gradient(160deg, ${color.hex}33 0%, #ffffffcc 72%)`,
            }}
          >
            <motion.div
              className="absolute inset-10 rounded-full blur-3xl"
              style={{ backgroundColor: color.hex }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <AnimatePresence mode="wait">
              <motion.img
                key={color.file}
                src={`/umbrellas/${color.file}`}
                alt={`AETRO Lite in ${color.name}`}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: [0, -12, 0], scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{
                  opacity: { duration: 0.35 },
                  scale: { duration: 0.35 },
                  y: {
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{ scale: 1.04, rotate: 1.5 }}
                className="relative z-10 h-[330px] w-auto object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.22)] sm:h-[400px]"
              />
            </AnimatePresence>
          </motion.div>

          <motion.div
            key={color.name}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-[2rem] border border-white/60 bg-white/55 p-7 shadow-[0_20px_60px_rgba(11,27,43,0.08)] backdrop-blur"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--navy)]/40">
              Selected color
            </p>

            <div className="mt-5 flex items-center gap-4">
              <span
                className="h-12 w-12 rounded-full shadow-inner ring-4 ring-white"
                style={{ backgroundColor: color.hex }}
              />
              <div>
                <h3 className="font-display text-4xl text-[var(--navy)]">
                  {color.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--navy)]/45">
                  Matched canopy and pole finish
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-3">
              {COLORS.map((c, i) => (
                <motion.button
                  key={c.name}
                  type="button"
                  onClick={() => setSelected(i)}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative overflow-hidden rounded-2xl p-3 text-center transition-all ${
                    selected === i
                      ? "bg-[var(--navy)] text-white shadow-xl"
                      : "bg-white/70 text-[var(--navy)]/60 hover:bg-white"
                  }`}
                >
                  <span
                    className="mx-auto block h-8 w-8 rounded-full ring-2 ring-white"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="mt-2 block text-[10px] font-semibold">
                    {c.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
