import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ProductVisual } from "./product-visual";

const LAUNCH_COLORS = [
  { name: "Rose / Pink", short: "Rose", accent: "#F4A9BC", canopy: "linear-gradient(135deg,#FCE3EA 0%,#F4A9BC 100%)", note: "Soft beachside warmth" },
  { name: "Sage / Green", short: "Sage", accent: "#A9C79A", canopy: "linear-gradient(135deg,#F0F4E7 0%,#A9C79A 100%)", note: "Calm, coastal freshness" },
  { name: "Sky / Blue", short: "Sky", accent: "#A7C6E8", canopy: "linear-gradient(135deg,#EFF7FF 0%,#A7C6E8 100%)", note: "Clear Mediterranean sky" },
  { name: "Lavender / Purple", short: "Lavender", accent: "#C6B3DE", canopy: "linear-gradient(135deg,#F7F0FE 0%,#C6B3DE 100%)", note: "Quiet premium contrast" },
];

const BASE_OPTIONS = [
  {
    id: "screw",
    name: "Screw-in sand base",
    description: "For beach sand. Twist it into the ground for a clean, portable setup.",
    badge: "Beach",
  },
  {
    id: "weighted",
    name: "Weighted base",
    description: "For terraces, pool decks, beach clubs, and harder surfaces.",
    badge: "Decks",
  },
];

export function Colors() {
  const reduceMotion = useReducedMotion();
  const [selectedColor, setSelectedColor] = useState(LAUNCH_COLORS[0]);
  const [selectedBase, setSelectedBase] = useState(BASE_OPTIONS[0]);

  return (
    <section id="colors" className="overflow-hidden bg-[#f5f5f7] px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#86868b]">Configurator</p>
          <h2 className="mt-5 text-[clamp(42px,6.2vw,84px)] font-semibold leading-[0.96] tracking-[-0.06em] text-[#1d1d1f]">
            Choose the finish. Choose the base.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#6e6e73]">
            The launch lineup stays focused on four premium launch colors, with a clean preview that updates as you select the finish and base.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }} className="rounded-[44px] border border-black/8 bg-white p-8 shadow-[0_30px_100px_rgba(0,0,0,0.08)] sm:p-10">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#86868b]">AETRO Lite</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">Configured preview</h3>
              </div>
              <div className="rounded-full border border-black/10 bg-[#f5f5f7] px-4 py-2 text-sm font-medium text-[#1d1d1f]">
                Launch edition
              </div>
            </div>
            <ProductVisual accentColor={selectedColor.accent} canopyColor={selectedColor.canopy} />
          </motion.div>

          <div className="space-y-6">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, delay: 0.04 }} className="rounded-[36px] border border-black/8 bg-white p-7 shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#86868b]">Colors</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">Select a launch color</h3>
                </div>
                <div className="rounded-full bg-[#f5f5f7] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6e6e73]">
                  4 options
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {LAUNCH_COLORS.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button key={color.name} type="button" onClick={() => setSelectedColor(color)} className={`rounded-[24px] border px-4 py-4 text-left transition-all ${isSelected ? "border-[#1d1d1f] bg-[#111827] text-white shadow-[0_12px_30px_rgba(17,24,39,0.14)]" : "border-black/8 bg-[#faf8f3] text-[#1d1d1f] hover:border-black/16"}`}>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full border border-black/10" style={{ background: color.canopy }} />
                        <div>
                          <p className="text-sm font-semibold">{color.name}</p>
                          <p className={`mt-1 text-xs ${isSelected ? "text-white/70" : "text-[#6e6e73]"}`}>{color.note}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="mt-6 text-sm leading-7 text-[#6e6e73]">
                Future colors can be introduced later, but the current launch lineup stays intentionally limited.
              </p>
            </motion.div>

            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, delay: 0.08 }} className="rounded-[36px] border border-black/8 bg-white p-7 shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#86868b]">Base</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">Choose your base</h3>
                </div>
                <div className="rounded-full bg-[#f5f5f7] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6e6e73]">
                  2 options
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {BASE_OPTIONS.map((base) => {
                  const isSelected = selectedBase.id === base.id;
                  return (
                    <button key={base.id} type="button" onClick={() => setSelectedBase(base)} className={`flex w-full items-start gap-3 rounded-[24px] border px-4 py-4 text-left transition-all ${isSelected ? "border-[#1d1d1f] bg-[#111827] text-white" : "border-black/8 bg-[#faf8f3] text-[#1d1d1f] hover:border-black/16"}`}>
                      <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${isSelected ? "border-white/20 bg-white/10" : "border-black/10 bg-white"}`}>
                        {base.id === "screw" ? (
                          <div className={`h-5 w-5 rounded-full border-2 ${isSelected ? "border-white" : "border-[#1d1d1f]"}`} />
                        ) : (
                          <div className={`h-5 w-5 rounded-[6px] border-2 ${isSelected ? "border-white" : "border-[#1d1d1f]"}`} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">{base.name}</p>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${isSelected ? "bg-white/10 text-white/80" : "bg-[#111827]/6 text-[#6e6e73]"}`}>{base.badge}</span>
                        </div>
                        <p className={`mt-2 text-sm leading-7 ${isSelected ? "text-white/70" : "text-[#6e6e73]"}`}>{base.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
