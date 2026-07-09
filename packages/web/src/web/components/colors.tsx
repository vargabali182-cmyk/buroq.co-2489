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

function UmbrellaPreview({
  canopy,
  pole,
  small = false,
}: {
  canopy: string;
  pole: string;
  small?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 260 360"
      className={small ? "h-24 w-auto" : "h-[360px] w-auto sm:h-[460px]"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M30 118 C58 38 202 38 230 118 L30 118Z"
        fill={canopy}
        initial={false}
        animate={{ fill: canopy }}
        transition={{ duration: 0.35 }}
      />

      <path
        d="M30 118 C48 138 66 138 84 118 C102 138 120 138 138 118 C156 138 174 138 192 118 C210 138 222 134 230 118"
        fill={canopy}
        opacity="0.88"
      />

      <path
        d="M130 48 L130 118"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <motion.rect
        x="122"
        y="118"
        width="16"
        height="188"
        rx="8"
        fill={pole}
        initial={false}
        animate={{ fill: pole }}
        transition={{ duration: 0.35 }}
      />

      <rect
        x="119"
        y="172"
        width="22"
        height="48"
        rx="8"
        fill="rgba(7,17,31,0.82)"
      />

      <rect x="124" y="181" width="12" height="4" rx="2" fill="white" opacity="0.7" />
      <rect x="124" y="191" width="12" height="4" rx="2" fill="white" opacity="0.35" />
      <rect x="124" y="201" width="12" height="4" rx="2" fill="white" opacity="0.35" />

      <motion.path
        d="M130 304 C130 330 96 330 96 306"
        stroke={pole}
        strokeWidth="16"
        strokeLinecap="round"
        initial={false}
        animate={{ stroke: pole }}
        transition={{ duration: 0.35 }}
      />

      <ellipse cx="130" cy="330" rx="70" ry="10" fill="rgba(11,27,43,0.12)" />
    </svg>
  );
}

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
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
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
            Choose the canopy and pole colors separately. Create all 64 possible
            AETRO Lite combinations.
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
              background: `linear-gradient(160deg, ${canopy.hex}33 0%, ${pole.hex}22 42%, #ffffffcc 78%)`,
            }}
          >
            <motion.div
              className="absolute inset-10 rounded-full blur-3xl"
              style={{ backgroundColor: canopy.hex }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.22, 0.42, 0.22] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              key={`${canopy.name}-${pole.name}`}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: [0, -12, 0], scale: 1 }}
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
              className="relative z-10"
            >
              <UmbrellaPreview canopy={canopy.hex} pole={pole.hex} />
            </motion.div>

            <div className="absolute left-6 top-6 rounded-2xl bg-white/65 px-4 py-3 text-left backdrop-blur">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--navy)]/40">
                Current build
              </p>
              <p className="mt-1 font-display text-xl text-[var(--navy)]">
                {canopy.name} / {pole.name}
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
                    className={`relative rounded-2xl p-3 text-center transition-all ${
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
                    className={`relative rounded-2xl p-3 text-center transition-all ${
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
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mt-16 rounded-[2.5rem] border border-white/60 bg-white/45 p-6 shadow-[0_20px_60px_rgba(11,27,43,0.08)] backdrop-blur"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--navy)]/40">
                64 possible builds
              </p>
              <h3 className="mt-2 font-display text-3xl text-[var(--navy)]">
                Mix any canopy with any pole.
              </h3>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-[var(--navy)]/55">
              This is an early visual configurator. Final production renders can
              later use real 3D or layered product images.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
            {COLORS.map((canopyColor) =>
              COLORS.map((poleColor) => (
                <motion.button
                  key={`${canopyColor.name}-${poleColor.name}`}
                  type="button"
                  onClick={() => {
                    setCanopyIndex(
                      COLORS.findIndex((c) => c.name === canopyColor.name)
                    );
                    setPoleIndex(
                      COLORS.findIndex((c) => c.name === poleColor.name)
                    );
                  }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-2xl bg-white/65 p-2 shadow-sm transition-all hover:bg-white hover:shadow-lg"
                  title={`${canopyColor.name} canopy / ${poleColor.name} pole`}
                >
                  <UmbrellaPreview
                    canopy={canopyColor.hex}
                    pole={poleColor.hex}
                    small
                  />
                </motion.button>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
