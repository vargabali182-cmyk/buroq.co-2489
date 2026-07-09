import { motion, useReducedMotion } from "motion/react";
import { Building2, Sparkles, TrendingUp } from "lucide-react";

const PARTNERS = [
  { icon: Building2, title: "Beach clubs", text: "Offer a premium guest experience without adding clutter or complexity to the setup." },
  { icon: Sparkles, title: "Resorts", text: "Turn the umbrella into a branded comfort surface that feels elevated rather than promotional." },
  { icon: TrendingUp, title: "Operators", text: "Create a simple upsell story around comfort, charging, and premium service." },
];

export function Resorts() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="resorts" className="bg-[#f5f5f7] px-6 py-24 text-[#111827] sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b7280]">For beach clubs and resorts</p>
          <h2 className="mt-5 text-[clamp(34px,5.2vw,74px)] font-semibold leading-[0.95] tracking-[-0.06em]">
            A premium amenity that feels naturally at home in hospitality.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#4b5563]">
            The product is simple enough to be understood instantly and premium enough to feel like part of the environment, not an add-on.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {PARTNERS.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <motion.article key={partner.title} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.28 }} transition={{ duration: 0.6, delay: index * 0.06 }} className="rounded-[32px] border border-black/8 bg-white p-8 shadow-[0_18px_70px_rgba(17,24,39,0.06)]">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#111827] text-white">
                  <Icon size={20} />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{partner.title}</h3>
                <p className="mt-4 text-base leading-8 text-[#4b5563]">{partner.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
