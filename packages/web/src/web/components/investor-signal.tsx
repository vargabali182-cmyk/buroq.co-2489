import { motion, useReducedMotion } from "motion/react";

const SIGNALS = [
  { label: "Beach tourism", value: "huge", text: "Mediterranean tourist traffic gives the product a natural test market." },
  { label: "B2B", value: "resorts", text: "Beach clubs, hotels and apartment hosts can become early distribution partners." },
  { label: "Crowdfunding", value: "visual", text: "AETRO is easy to explain in a 15-second video: shade plus built-in charging." },
  { label: "Sponsor surface", value: "canopy", text: "The canopy can later become a premium branded beach placement without ruining the product." },
];

export function InvestorSignal() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="market" className="relative overflow-hidden bg-[#050608] px-6 py-24 text-white sm:py-32 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,169,188,0.16),transparent_34%),radial-gradient(circle_at_100%_70%,rgba(159,220,207,0.16),transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/46">Investor story</p>
            <h2 className="mt-5 text-[clamp(42px,6.4vw,86px)] font-semibold leading-[0.96] tracking-[-0.06em]">A premium beach object with startup speed.</h2>
          </div>
          <p className="text-lg leading-8 text-white/58">The next version of the site should not look like a webshop. It should look like a product launch page, sponsor deck and waitlist funnel in one.</p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SIGNALS.map((signal, index) => (
            <motion.article key={signal.label} initial={reduceMotion ? false : { opacity: 0, y: 30 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.28 }} transition={{ duration: 0.6, delay: index * 0.06 }} className="rounded-[32px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/38">{signal.label}</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">{signal.value}</h3>
              <p className="mt-4 text-sm leading-7 text-white/56">{signal.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
