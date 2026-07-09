import { motion, useReducedMotion } from "motion/react";

const PRICE_POINTS = [
  { label: "Early adopter", value: "149€", text: "A clear entry point for first buyers and beach club pilots." },
  { label: "Launch", value: "199€", text: "The balance point that feels premium without becoming aspirational-only." },
  { label: "Premium", value: "249€", text: "For buyers who want the product to feel more exclusive and design-led." },
];

export function PricingTest() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="pricing" className="bg-[#111827] px-6 py-24 text-white sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">Pricing test</p>
          <h2 className="mt-5 text-[clamp(34px,5.4vw,72px)] font-semibold leading-[0.95] tracking-[-0.06em]">
            The price should feel as deliberate as the product.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            AETRO Lite is positioned as a premium object, but it still needs a price point that feels understandable and credible in early testing.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {PRICE_POINTS.map((point, index) => (
            <motion.article key={point.label} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.28 }} transition={{ duration: 0.6, delay: index * 0.06 }} className="rounded-[32px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">0{index + 1}</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">{point.value}</h3>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/45">{point.label}</p>
              <p className="mt-4 text-base leading-8 text-white/68">{point.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
