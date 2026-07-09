import { motion, useReducedMotion } from "motion/react";

export function PoleInside() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#050608] px-6 py-24 text-white sm:py-32 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(159,220,207,0.16),transparent_36%),linear-gradient(180deg,#0d1117_0%,#050608_100%)]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/48">Inside the pole</p>
          <h2 className="mt-5 text-[clamp(36px,5.5vw,76px)] font-semibold leading-[0.95] tracking-[-0.06em]">
            The battery lives where it should: low, central, and calm.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            A removable battery module sits inside the lower pole to preserve weight balance and keep the canopy feeling like a single object, not a gadget strapped to a beach umbrella.
          </p>
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.08 }} className="mt-14 rounded-[44px] border border-white/10 bg-white/[0.05] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="mx-auto flex aspect-[0.82] w-full max-w-[320px] items-end justify-center rounded-[38px] border border-white/10 bg-[linear-gradient(180deg,#1c2634_0%,#090d12_100%)] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
              <div className="w-full rounded-[24px] border border-white/10 bg-[#0b1727] p-6">
                <div className="h-2 rounded-full bg-white/10" />
                <div className="mt-5 h-28 rounded-[20px] bg-[linear-gradient(135deg,#f4a9bc,#a7c6e8)]" />
                <div className="mt-4 h-2 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Core idea</p>
                <p className="mt-3 text-lg leading-8 text-white/72">The lower pole houses the battery in a compact module that is easier to service and better balanced for carrying and storage.</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Where it matters</p>
                <p className="mt-3 text-lg leading-8 text-white/72">The canopy stays visually calm, while the internal hardware remains rational, cool, and discreet.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
