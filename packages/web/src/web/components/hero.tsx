import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.22], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.35]);

  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden bg-[#050608] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_32%),radial-gradient(circle_at_10%_16%,rgba(169,199,154,0.18),transparent_28%),radial-gradient(circle_at_90%_26%,rgba(159,220,207,0.20),transparent_30%),linear-gradient(180deg,#101114_0%,#050608_72%)]" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#f5f5f7] to-transparent" />

      <motion.div style={reduceMotion ? undefined : { y, opacity }} className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 pb-20 pt-32 lg:grid-cols-[1.04fr_0.96fr] lg:px-10">
        <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:text-left">
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-6 inline-flex rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/72 backdrop-blur-xl">
            AETRO Lite by BUROQ
          </motion.p>
          <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} className="mx-auto max-w-5xl text-[clamp(54px,8.8vw,128px)] font-semibold leading-[0.88] tracking-[-0.075em] text-white lg:mx-0">
            Shade.<br />Power.<br />Nothing extra.
          </motion.h1>
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.18 }} className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl lg:mx-0">
            A premium beach umbrella with a rechargeable battery, a restrained front display, and two USB-C ports plus one USB-A port hidden cleanly into the rear panel.
          </motion.p>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.28 }} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <button onClick={() => scrollTo("#waitlist")} className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#1d1d1f] shadow-[0_24px_80px_rgba(255,255,255,0.22)] transition-transform hover:-translate-y-1">
              Join early access <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => scrollTo("#overview")} className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/14">
              <Play size={15} /> See the product story
            </button>
          </motion.div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center lg:mr-0">
          <div className="relative w-full overflow-hidden rounded-[40px] border border-white/10 bg-white/8 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <img src="/umbrellas/aetro-pink-beach-closeup.png" alt="AETRO Lite umbrella on the beach" className="w-full rounded-[28px] object-cover" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
