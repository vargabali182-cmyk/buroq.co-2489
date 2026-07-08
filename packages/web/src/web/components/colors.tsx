import { motion } from "motion/react";

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
  return (
    <section id="colors" className="relative mesh-sand py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="font-display text-4xl text-[var(--navy)] sm:text-5xl">
            Choose your shade.
          </h2>
          <p className="mt-4 text-[var(--navy)]/60">
            Eight vibrant colorways, each with a perfectly matched pole.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {COLORS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group relative overflow-hidden rounded-3xl p-6 shadow-[0_8px_30px_rgba(11,27,43,0.06)] transition-all hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(11,27,43,0.15)]"
              style={{
                background: `linear-gradient(160deg, ${c.hex}33 0%, #ffffffcc 65%)`,
                border: `1px solid ${c.hex}55`,
              }}
            >
              <div
                className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60"
                style={{ backgroundColor: c.hex }}
              />
              <img
                src={`/umbrellas/${c.file}`}
                alt={`AETRO Lite in ${c.name}`}
                className="relative z-10 mx-auto h-36 w-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)] transition-transform group-hover:scale-105 sm:h-44"
              />
              <div className="relative z-10 mt-4 flex items-center justify-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="font-display text-lg text-[var(--navy)]">
                  {c.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
