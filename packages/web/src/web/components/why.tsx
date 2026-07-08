import { motion } from "motion/react";

export function Why() {
  return (
    <section className="relative mesh-navy overflow-hidden py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-[var(--c-yellow)]/10 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl leading-tight text-gradient-sand sm:text-5xl">
            Beach umbrellas have barely
            <br className="hidden sm:block" /> changed for decades.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
            AETRO Lite brings everyday beach comfort into the modern era. No
            more dead phones, messy power banks or basic umbrellas. Just
            shade, power and a cleaner beach setup.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
