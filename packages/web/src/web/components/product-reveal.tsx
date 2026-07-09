import { motion, useReducedMotion } from "motion/react";

export function ProductReveal() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="overview" className="relative overflow-hidden bg-[#f7f2ea] px-6 py-24 text-[#111827] sm:py-32 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.96),transparent_40%),radial-gradient(circle_at_100%_20%,rgba(244,169,188,0.16),transparent_30%),linear-gradient(135deg,#f9f3eb_0%,#efe5d8_100%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 32 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b7280]">Product reveal</p>
          <h2 className="mt-5 text-[clamp(38px,6vw,86px)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#111827]">
            A cleaner way to bring power to the beach.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#4b5563]">
            AETRO Lite is a premium umbrella that feels intentional from every angle: one simple power button, a minimal front display, and two USB-C ports plus one USB-A port hidden on the rear panel where they belong.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-[#111827]/10 bg-white/70 px-4 py-2 text-sm font-medium text-[#111827]">Built-in rechargeable battery</span>
            <span className="rounded-full border border-[#111827]/10 bg-white/70 px-4 py-2 text-sm font-medium text-[#111827]">Single-button experience</span>
            <span className="rounded-full border border-[#111827]/10 bg-white/70 px-4 py-2 text-sm font-medium text-[#111827]">No app required</span>
          </div>
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.9 }} className="rounded-[40px] border border-black/8 bg-white/70 p-6 shadow-[0_28px_100px_rgba(17,24,39,0.12)] backdrop-blur-xl sm:p-8">
          <img src="/umbrellas/aetro-blue-beach-closeup.png" alt="AETRO Lite umbrella close-up" className="w-full rounded-[28px] object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
