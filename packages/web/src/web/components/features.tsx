import { motion, useReducedMotion } from "motion/react";
import { BatteryCharging, Gauge, ShieldCheck, Usb } from "lucide-react";

const FEATURES = [
  { icon: BatteryCharging, title: "20k mAh target battery", text: "Enough for real beach use, still realistic for weight, transport and certification planning.", stat: "3–5 phone charges" },
  { icon: Usb, title: "2× USB-C + 1× USB-A", text: "Three charging ports are hidden in the rear panel with a clean mirrored layout: two USB-C and one USB-A.", stat: "2× USB-C + 1× USB-A" },
  { icon: Gauge, title: "Display without distraction", text: "Battery percentage and temperature only. Lite stays simple, readable and premium.", stat: "Battery + °C" },
  { icon: ShieldCheck, title: "Built for validation", text: "No solar, no app, no GPS, no alarm cable in version one. The product stays focused and easy to explain.", stat: "MVP focus" },
];

export function Features() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="features" className="relative overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-10">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#f5f5f7] to-white" />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#86868b]">Lite specification</p>
          <h2 className="mt-5 text-[clamp(42px,6.5vw,88px)] font-semibold leading-[0.96] tracking-[-0.06em] text-[#1d1d1f]">
            Fewer features. More confidence.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#6e6e73]">
            The first product must be simple enough to build, clear enough to sell, and premium enough to defend as a brand.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article key={feature.title} initial={reduceMotion ? false : { opacity: 0, y: 34 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: index * 0.06 }} className="group rounded-[32px] bg-[#f5f5f7] p-6 transition-transform hover:-translate-y-1 sm:p-7">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#1d1d1f] shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
                  <Icon size={22} />
                </div>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#86868b]">{feature.stat}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-[#1d1d1f]">{feature.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#6e6e73]">{feature.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
