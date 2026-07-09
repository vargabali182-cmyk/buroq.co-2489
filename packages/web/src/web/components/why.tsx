import { motion, useReducedMotion } from "motion/react";

const POINTS = [
  { title: "Your phone dies at the beach.", text: "Power banks get hot, sandy, forgotten or stolen. AETRO Lite puts power into the object you already bring." },
  { title: "Solar is not the first battle.", text: "Big brands can fight the solar umbrella race. Lite wins by being simpler, cleaner and easier to validate." },
  { title: "Resorts need guest comfort.", text: "Hotels and beach clubs can use AETRO as a premium guest-experience upgrade and sponsored beach-tech surface." },
];

export function Why() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#86868b]">Business logic</p>
          <h2 className="mt-5 text-[clamp(42px,6.5vw,88px)] font-semibold leading-[0.96] tracking-[-0.06em] text-[#1d1d1f]">The product is simple. The use case is obvious.</h2>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {POINTS.map((point, index) => (
            <motion.article key={point.title} initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.32 }} transition={{ duration: 0.6, delay: index * 0.06 }} className="rounded-[34px] bg-[#f5f5f7] p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#86868b]">0{index + 1}</p>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[#1d1d1f]">{point.title}</h3>
              <p className="mt-5 text-base leading-8 text-[#6e6e73]">{point.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
