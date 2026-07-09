import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("199€");
  const reduceMotion = useReducedMotion();

  const join = useMutation({
    mutationFn: async ({ email, price }: { email: string; price: string }) => {
      const res = await fetch("https://formspree.io/f/mgojjnbr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, price_interest: price, project: "BUROQ / AETRO Lite waitlist" }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => setEmail(""),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    join.mutate({ email, price });
  };

  return (
    <section id="waitlist" className="bg-[#f5f5f7] px-6 py-24 sm:py-32 lg:px-10">
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 40 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mx-auto max-w-5xl overflow-hidden rounded-[44px] bg-[#1d1d1f] text-white shadow-[0_40px_140px_rgba(0,0,0,0.22)]">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.86fr]">
          <div className="p-8 sm:p-12 lg:p-14">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/42">Early access</p>
            <h2 className="mt-5 text-[clamp(42px,7vw,82px)] font-semibold leading-[0.94] tracking-[-0.06em]">Reserve your place in the first drop.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">Join the waitlist and tell us the price point that feels right for AETRO Lite. This is the first step toward a premium, intentional launch.</p>

            <AnimatePresence mode="wait">
              {join.isSuccess ? (
                <motion.div key="success" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-9 flex items-center gap-3 rounded-[24px] bg-white px-5 py-4 text-[#1d1d1f]">
                  <CheckCircle2 size={20} /> You're on the list — we will send prototype updates.
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="mt-9 space-y-4" initial={false}>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/36" size={18} />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Enter your email" className="w-full rounded-full border border-white/12 bg-white/8 py-4 pl-12 pr-5 text-sm text-white outline-none backdrop-blur-xl placeholder:text-white/36 focus:border-white/32" />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {["149€", "199€", "249€", "B2B"].map((item) => (
                      <button key={item} type="button" onClick={() => setPrice(item)} className={`rounded-full px-3 py-3 text-xs font-semibold transition-colors ${price === item ? "bg-white text-[#1d1d1f]" : "bg-white/8 text-white/52 hover:bg-white/12 hover:text-white"}`}>{item}</button>
                    ))}
                  </div>
                  <button type="submit" disabled={join.isPending} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-[#1d1d1f] transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto">
                    {join.isPending ? <><Loader2 className="animate-spin" size={16} /> Joining...</> : <>Join waitlist <ArrowRight size={16} /></>}
                  </button>
                  {join.isError && <p className="text-sm text-red-200">Something went wrong. Please try again.</p>}
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="relative min-h-[420px] bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.20),transparent_34%),linear-gradient(180deg,#2c2c2f,#111)] p-8">
            <div className="absolute left-1/2 top-14 h-32 w-[70%] -translate-x-1/2 rounded-t-[999px] rounded-b-[44px] bg-[#f4eee5] shadow-[0_30px_90px_rgba(255,255,255,0.12)]" />
            <div className="absolute left-1/2 top-32 h-60 w-9 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,#cfd2d8,#fff,#8d929b)]" />
            <div className="absolute bottom-10 left-8 right-8 rounded-[28px] border border-white/12 bg-white/8 p-5 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/38">Prototype target</p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div><p className="text-2xl font-semibold">20k</p><p className="text-xs text-white/40">mAh</p></div>
                <div><p className="text-2xl font-semibold">3</p><p className="text-xs text-white/40">ports</p></div>
                <div><p className="text-2xl font-semibold">Lite</p><p className="text-xs text-white/40">MVP</p></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
