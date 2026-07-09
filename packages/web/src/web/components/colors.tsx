import { motion, useReducedMotion } from "motion/react";

const MVP_COLORS = [
  { name: "Sand Ivory", bg: "linear-gradient(135deg,#fffaf2,#ded3c3)", note: "Hero launch color" },
  { name: "Coastal Navy", bg: "linear-gradient(135deg,#102033,#dbe8f6)", note: "Premium resort color" },
  { name: "Coral Sand", bg: "linear-gradient(135deg,#f2a694,#f6e3cc)", note: "Mediterranean accent" },
];

export function Colors() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="colors" className="overflow-hidden bg-[#f5f5f7] px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#86868b]">Launch palette</p>
            <h2 className="mt-5 text-[clamp(42px,6.2vw,84px)] font-semibold leading-[0.96] tracking-[-0.06em] text-[#1d1d1f]">Start with three. Not sixty-four.</h2>
          </div>
          <p className="text-lg leading-8 text-[#6e6e73]">The old site showed 8 colorways and 64 combinations. That is beautiful for a dream configurator, but too heavy for MVP manufacturing. First batch should be three controlled, premium colors.</p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {MVP_COLORS.map((color, index) => (
            <motion.article key={color.name} initial={reduceMotion ? false : { opacity: 0, y: 32 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.65, delay: index * 0.08 }} className="group overflow-hidden rounded-[36px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.08)]">
              <div className="relative h-72" style={{ background: color.bg }}>
                <div className="absolute left-1/2 top-12 h-28 w-[78%] -translate-x-1/2 rounded-t-[999px] rounded-b-[40px] bg-white/52 shadow-xl backdrop-blur-sm" />
                <div className="absolute left-1/2 top-32 h-36 w-6 -translate-x-1/2 rounded-full bg-white/72 shadow-[inset_6px_0_12px_rgba(255,255,255,0.5),inset_-7px_0_13px_rgba(0,0,0,0.14)]" />
                <div className="absolute bottom-8 left-1/2 h-5 w-36 -translate-x-1/2 rounded-full bg-black/16 blur-xl" />
              </div>
              <div className="p-7">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#86868b]">{color.note}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-[#1d1d1f]">{color.name}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
