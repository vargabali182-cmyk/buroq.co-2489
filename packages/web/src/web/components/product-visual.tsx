import { motion, useReducedMotion } from "motion/react";

type ProductVisualProps = {
  variant?: "light" | "dark";
  compact?: boolean;
};

export function ProductVisual({ variant = "light", compact = false }: ProductVisualProps) {
  const reduceMotion = useReducedMotion();
  const dark = variant === "dark";

  return (
    <motion.div
      aria-label="AETRO Lite concept render with front display and rear charging ports"
      className={`relative mx-auto ${compact ? "h-[440px] w-[300px]" : "h-[560px] w-[360px] sm:w-[440px]"}`}
      initial={reduceMotion ? false : { opacity: 0, y: 36, scale: 0.96 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute left-1/2 top-2 h-36 w-[330px] -translate-x-1/2 rounded-t-[999px] rounded-b-[52px] border border-white/70 bg-[linear-gradient(135deg,#fff_0%,#f1ede5_42%,#d9d2c6_100%)] shadow-[0_34px_90px_rgba(29,29,31,0.18)] sm:w-[420px]"
        animate={reduceMotion ? undefined : { rotateX: [0, 2, 0], rotateZ: [-0.6, 0.6, -0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-x-9 top-8 h-px bg-black/10" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/10" />
        <div className="absolute left-10 top-8 h-20 w-px rotate-[28deg] bg-black/10" />
        <div className="absolute right-10 top-8 h-20 w-px -rotate-[28deg] bg-black/10" />
        <div className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-[#1d1d1f] px-4 py-1 text-[10px] font-semibold tracking-[0.28em] text-white">AETRO</div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[118px] h-[360px] w-[34px] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,#e8e8ea,#ffffff_42%,#b9bbc0)] shadow-[inset_8px_0_20px_rgba(255,255,255,0.7),inset_-10px_0_20px_rgba(0,0,0,0.13),0_30px_60px_rgba(29,29,31,0.24)]"
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute left-1/2 top-20 h-[142px] w-[23px] -translate-x-1/2 rounded-full bg-[#05070a] p-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_12px_28px_rgba(0,0,0,0.34)]">
          <div className="flex h-full flex-col items-center justify-center gap-3 rounded-full bg-[radial-gradient(circle_at_50%_0%,#253142,#05070a_58%)] text-white">
            <div className="text-[8px] font-semibold leading-none text-white/60">BAT</div>
            <div className="text-[13px] font-bold leading-none">75%</div>
            <div className="h-px w-3 bg-white/20" />
            <div className="text-[12px] font-bold leading-none">24°</div>
          </div>
        </div>
        <div className="absolute left-1/2 top-[238px] h-[22px] w-[22px] -translate-x-1/2 rounded-full border border-white/40 bg-[#10151d] shadow-[0_8px_20px_rgba(0,0,0,0.25)]" />
        <div className="absolute -right-[72px] top-[112px] rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-[0_24px_60px_rgba(29,29,31,0.18)] backdrop-blur-xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/45">rear ports</p>
          <div className="mt-2 flex gap-1.5">
            <span className="h-4 w-7 rounded-full bg-[#1d1d1f]" />
            <span className="h-4 w-4 rounded-full bg-[#1d1d1f]" />
            <span className="h-4 w-4 rounded-full bg-[#1d1d1f]" />
          </div>
        </div>
      </motion.div>

      <div className={`absolute bottom-9 left-1/2 h-7 w-[250px] -translate-x-1/2 rounded-full blur-xl ${dark ? "bg-white/20" : "bg-black/16"}`} />
    </motion.div>
  );
}
