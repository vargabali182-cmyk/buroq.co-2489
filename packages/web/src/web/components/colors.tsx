import { useState } from "react";
import { motion } from "motion/react";

const COLORS = [
  { name: "Pink", hex: "#F4A9BC" },
  { name: "Green", hex: "#A9C79A" },
  { name: "Blue", hex: "#A7C6E8" },
  { name: "Purple", hex: "#C6B3DE" },
  { name: "Yellow", hex: "#F3D477" },
  { name: "Red", hex: "#E4685B" },
  { name: "Orange", hex: "#F0AE7C" },
  { name: "Turquoise", hex: "#9FDCCF" },
];

export function Colors() {
  const [canopyIndex, setCanopyIndex] = useState(2);
  const [poleIndex, setPoleIndex] = useState(1);

  const canopy = COLORS[canopyIndex];
  const pole = COLORS[poleIndex];

  return (
    <section id="colors" className="relative mesh-sand overflow-hidden py-28">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full blur-[120px]"
        style={{ backgroundColor: canopy.hex }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.22, 0.42, 0.22] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--navy)]/45">
            AETRO Configurator
          </p>

          <h2 className="font-display text-4xl text-[var(--navy)] sm:text-5xl md:text-6xl">
            Build your shade.
          </h2>

          <p className="mt-5 text-[var(--navy)]/60">
            Choose your canopy and pole finish. AETRO Lite is designed to be
            personal, clean and color-matched.
          </p>
        </motion.div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_430px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex min-h-[520px] items-center justify-center rounded-[2.5rem] border border-white/50 bg-white/45 p-10 shadow-[0_20px_70px_rgba(11,27,43,0.10)] backdrop-blur"
            style={{
              background: `linear-gradient(160deg, ${canopy.hex}33 0%, ${pole.hex}22 45%, #ffffffcc 78%)`,
            }}
          >
            <motion.div
              className="absolute inset-10 rounded-full blur-3xl"
              style={{ backgroundColor: canopy.hex }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.22, 0.42, 0.22] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.img
              src="/umbrellas/blue_nobg.png"
              alt="AETRO Lite realistic umbrella preview"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ y: [0, -12, 0] }}
              viewport={{ once: true }}
              transition={{
                opacity: { duration: 0.35 },
                scale: { duration: 0.35 },
                y: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={{ scale: 1.04, rotate: 1 }}
              className="relative z-10 h-[330px] w-auto object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.22)] sm:h-[430px]"
            />

            <div className="absolute left-6 top-6 rounded-2xl bg-white/70 px-4 py-3 text-left backdrop-blur">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--navy)]/40">
                Current build
              </p>
              <p className="mt-1 font-display text-xl text-[var(--navy)]">
                {canopy.name} / {pole.name}
              </p>
            </div>

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/70 px-5 py-4 text-center backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--navy)]/45">
                Available in 64 color combinations
              </p>
            </div>
          </motion.div>

          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="rounded-[2rem] border border-white/60 bg-white/55 p-7 shadow-[0_20px_60px_rgba(11,27,43,0.08)] backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--navy)]/40">
                Canopy color
              </p>

              <h3 className="mt-3 font-display text-3xl text-[var(--navy)]">
                {canopy.name}
              </h3>

              <div className="mt-6 grid grid-cols-4 gap-3">
                {COLORS.map((c, i) => (
                  <motion.button
                    key={`canopy-${c.name}`}
                    type="button"
                    onClick={() => setCanopyIndex(i)}
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-2xl p-3 text-center transition-all ${
                      canopyIndex === i
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

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="rounded-[2rem] border border-white/60 bg-white/55 p-7 shadow-[0_20px_60px_rgba(11,27,43,0.08)] backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--navy)]/40">
                Pole color
              </p>

              <h3 className="mt-3 font-display text-3xl text-[var(--navy)]">
                {pole.name}
              </h3>

              <div className="mt-6 grid grid-cols-4 gap-3">
                {COLORS.map((c, i) => (
                  <motion.button
                    key={`pole-${c.name}`}
                    type="button"
                    onClick={() => setPoleIndex(i)}
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-2xl p-3 text-center transition-all ${
                      poleIndex === i
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

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="rounded-[2rem] border border-white/60 bg-white/55 p-7 shadow-[0_20px_60px_rgba(11,27,43,0.08)] backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--navy)]/40">
                Your selection
              </p>

              <h3 className="mt-3 font-display text-3xl text-[var(--navy)]">
                {canopy.name} canopy
                <br />
                {pole.name} pole
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-[var(--navy)]/55">
                Available in 64 color combinations. Final production visuals can
                later use real 3D renders for every selected build.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
