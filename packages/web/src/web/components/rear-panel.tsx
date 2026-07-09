import { motion, useReducedMotion } from "motion/react";

export function RearPanel() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="ports" className="bg-[#f7f2ea] px-6 py-24 text-[#111827] sm:py-32 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="rounded-[40px] border border-black/8 bg-white/70 p-8 shadow-[0_20px_80px_rgba(17,24,39,0.08)] backdrop-blur-xl sm:p-10">
          <div className="mx-auto flex max-w-[410px] items-center justify-center rounded-[34px] border border-black/8 bg-[linear-gradient(180deg,#f5efe8_0%,#efe3d4_100%)] p-8">
            <div className="w-full rounded-[28px] border border-black/8 bg-[#0f172a] p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                <span>Ports</span>
                <span>Rear panel</span>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/12 p-4 text-center text-xs font-semibold">USB-C</div>
                <div className="rounded-2xl bg-white/12 p-4 text-center text-xs font-semibold">USB-C</div>
                <div className="rounded-2xl bg-white/12 p-4 text-center text-xs font-semibold">USB-A</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.06 }}>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b7280]">Rear USB panel</p>
          <h2 className="mt-5 text-[clamp(34px,5.2vw,70px)] font-semibold leading-[0.95] tracking-[-0.06em]">
            Charging ports in a mirrored, deliberate place.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4b5563]">
            The rear panel carries three ports as a clean counterpart to the front display. It keeps the umbrella balanced and avoids turning the product into a wall of hardware.
          </p>
          <div className="mt-8 rounded-[32px] border border-black/8 bg-[#111827] p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">Designed for real use</p>
            <p className="mt-4 text-sm leading-7 text-white/70">The rear panel carries two USB-C ports and one USB-A port in a calm, mirrored layout that stays out of the way.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
