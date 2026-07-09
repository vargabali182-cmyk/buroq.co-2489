import { motion, useReducedMotion } from "motion/react";

export function FrontDisplay() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="display" className="bg-[#050608] px-6 py-24 text-white sm:py-32 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="order-2 lg:order-1">
          <div className="mx-auto max-w-xl rounded-[40px] border border-white/10 bg-white/[0.05] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl sm:p-10">
            <div className="mx-auto flex aspect-square max-w-[320px] items-center justify-center rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.2),transparent_38%),linear-gradient(135deg,#111827,#020617)] p-8 shadow-[0_26px_80px_rgba(0,0,0,0.35)]">
              <div className="w-full max-w-[220px] rounded-[28px] border border-white/10 bg-black px-6 py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">Battery</p>
                <div className="mt-5 text-[56px] font-semibold leading-none tracking-[-0.06em]">82%</div>
                <div className="mt-6 flex items-center gap-3 text-sm text-white/70">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f4a9bc]" />
                  <span>24°</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.06 }} className="order-1 lg:order-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/48">Front display</p>
          <h2 className="mt-5 text-[clamp(36px,5.5vw,72px)] font-semibold leading-[0.95] tracking-[-0.06em]">
            A screen that stays out of the way.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
            The front surface is intentionally restrained: a single dark display reveals only battery percentage and temperature, so the umbrella feels calm rather than overdesigned.
          </p>
          <div className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/42">What it does</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/70">
              <li>• One simple power button keeps the interaction obvious.</li>
              <li>• Information remains readable in direct sunlight.</li>
              <li>• No menus, no app, no distraction.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
