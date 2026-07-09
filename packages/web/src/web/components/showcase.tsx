import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const HOTSPOTS = [
  { label: "Front display", description: "Flush black vertical display: battery percentage and temperature only.", top: "39%", left: "54%" },
  { label: "Power button", description: "One physical button keeps Lite simple and intuitive.", top: "56%", left: "54%" },
  { label: "Rear USB panel", description: "Three ports are placed on the back as a clean mirror of the display side.", top: "45%", left: "74%" },
  { label: "Removable battery", description: "Lower-pole module for better weight balance, serviceability and thermal control.", top: "69%", left: "45%" },
];

export function Showcase() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeHotspot = HOTSPOTS[active];

  return (
    <section id="engineering" className="relative overflow-hidden bg-[#050608] px-6 py-24 text-white sm:py-32 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.14),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(159,220,207,0.13),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/48">Engineering layout</p>
          <h2 className="mt-5 text-[clamp(42px,6.7vw,94px)] font-semibold leading-[0.95] tracking-[-0.065em]">Designed around the pole.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/58">The product should feel like one object, not an umbrella with electronics glued to it.</p>
        </div>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[620px] rounded-[44px] border border-white/10 bg-white/[0.04] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_40px_120px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <div className="absolute left-1/2 top-12 h-40 w-[78%] -translate-x-1/2 rounded-t-[999px] rounded-b-[64px] bg-[linear-gradient(135deg,#f7f1e8,#d9d2c6)] shadow-[0_30px_90px_rgba(255,255,255,0.12)]" />
            <div className="absolute left-1/2 top-40 h-[410px] w-12 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,#cfd2d8,#fff,#8d929b)] shadow-[0_30px_80px_rgba(0,0,0,0.55)]" />
            <div className="absolute left-1/2 top-[260px] h-44 w-8 -translate-x-1/2 rounded-full bg-black p-1">
              <div className="flex h-full flex-col items-center justify-center gap-3 rounded-full bg-[#08111d] text-xs font-bold">
                <span className="text-white/50">BAT</span>
                <span>75%</span>
                <span className="h-px w-4 bg-white/20" />
                <span>24°</span>
              </div>
            </div>
            <div className="absolute left-1/2 top-[455px] h-8 w-8 -translate-x-1/2 rounded-full bg-[#111] ring-1 ring-white/25" />

            {HOTSPOTS.map((spot, index) => (
              <motion.button key={spot.label} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} whileHover={reduceMotion ? undefined : { scale: 1.08 }} className="absolute z-20 flex items-center gap-2" style={{ top: spot.top, left: spot.left, transform: "translate(-50%, -50%)" }}>
                <span className={`h-4 w-4 rounded-full border border-white/80 ${active === index ? "bg-white" : "bg-white/35"}`} />
                <span className={`hidden rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-xl sm:inline ${active === index ? "bg-white text-[#1d1d1f]" : "bg-white/10 text-white/70"}`}>{spot.label}</span>
              </motion.button>
            ))}
          </div>

          <motion.div key={activeHotspot.label} initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="rounded-[40px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/42">Selected detail</p>
            <h3 className="mt-5 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">{activeHotspot.label}</h3>
            <p className="mt-6 text-lg leading-8 text-white/62">{activeHotspot.description}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {HOTSPOTS.map((spot, index) => (
                <button key={spot.label} onClick={() => setActive(index)} className={`rounded-2xl px-4 py-3 text-left text-xs font-semibold transition-colors ${active === index ? "bg-white text-[#1d1d1f]" : "bg-white/8 text-white/52 hover:bg-white/12 hover:text-white"}`}>{spot.label}</button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
