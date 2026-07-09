import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ProductVisual } from "./product-visual";

const STORY = [
  { eyebrow: "01 / front", title: "Only the information you need.", body: "A flush vertical black display shows battery percentage and temperature. One simple power button. No app. No menus. No gadget overload." },
  { eyebrow: "02 / rear", title: "Ports where they belong.", body: "The back of the pole carries two USB-C ports and one USB-A port as a clean mirrored counterpart to the display, under a discreet cover." },
  { eyebrow: "03 / body", title: "A power bank, not a science project.", body: "A removable battery module sits inside the lower pole to keep the center of gravity sensible and reduce heat exposure near the canopy." },
];

export function ProductStory() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0.15, 0.55], [-8, 8]);
  const y = useTransform(scrollYProgress, [0.15, 0.55], [60, -40]);

  return (
    <section id="overview" className="relative overflow-hidden bg-[#f5f5f7] px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6e6e73]">The idea</p>
        <h2 className="mx-auto mt-5 max-w-5xl text-[clamp(44px,7vw,92px)] font-semibold leading-[0.95] tracking-[-0.065em] text-[#1d1d1f]">
          Beach umbrellas have barely changed. Your beach day has.
        </h2>
        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#6e6e73]">
          AETRO Lite is not trying to be the most complicated umbrella. It is trying to become the cleanest premium beach essential: shade and power in one object.
        </p>
      </div>

      <div id="design" className="mx-auto mt-20 grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div style={reduceMotion ? undefined : { rotate, y }} className="sticky top-24 hidden lg:block">
          <ProductVisual compact />
        </motion.div>
        <div className="space-y-6">
          {STORY.map((item, index) => (
            <motion.article key={item.title} initial={reduceMotion ? false : { opacity: 0, y: 40 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.38 }} transition={{ duration: 0.75, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }} className="rounded-[36px] border border-black/8 bg-white/78 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#86868b]">{item.eyebrow}</p>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-5xl">{item.title}</h3>
              <p className="mt-5 text-base leading-8 text-[#6e6e73] sm:text-lg">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
