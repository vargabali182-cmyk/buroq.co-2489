import { motion, useReducedMotion } from "motion/react";

const USE_CASES = [
  { title: "Morning swim", text: "AETRO Lite is there before the sun gets hot, keeping phones and speakers charged without turning the beach into a charging station." },
  { title: "Lunch break", text: "One umbrella, one button, one simple ritual. Shade and power stay in the same object from morning to sunset." },
  { title: "Golden hour", text: "The product feels calm and premium when the day turns soft, with no extra tech to distract from the moment." },
];

export function BeachDays() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#f7f2ea] px-6 py-24 text-[#111827] sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b7280]">Designed for real beach days</p>
          <h2 className="mt-5 text-[clamp(34px,5.2vw,72px)] font-semibold leading-[0.95] tracking-[-0.06em]">
            The product is built for the rhythm of summer, not a spec sheet.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#4b5563]">
            It should feel obvious in use: easy to carry, easy to understand, and dependable when the day gets long.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {USE_CASES.map((item, index) => (
            <motion.article key={item.title} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.28 }} transition={{ duration: 0.6, delay: index * 0.06 }} className="rounded-[32px] border border-black/8 bg-white/70 p-8 shadow-[0_18px_70px_rgba(17,24,39,0.06)] backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b8f97]">0{index + 1}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{item.title}</h3>
              <p className="mt-4 text-base leading-8 text-[#4b5563]">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
