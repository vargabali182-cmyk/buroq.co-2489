import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Loader2, Mail, ArrowRight } from "lucide-react";

export function Waitlist() {
  const [email, setEmail] = useState("");

  const join = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("https://formspree.io/f/mgojjnbr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          project: "BUROQ / AETRO Lite waitlist",
        }),
      });

      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => {
      setEmail("");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    join.mutate(email);
  };

  return (
    <section id="waitlist" className="relative mesh-sand overflow-hidden py-28">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-16 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--c-turquoise)]/20 blur-[120px]"
        animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center shadow-[0_25px_80px_rgba(11,27,43,0.16)] sm:px-16"
          style={{
            background:
              "linear-gradient(150deg, var(--navy) 0%, var(--navy-deep) 100%)",
          }}
        >
          <motion.div
            className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[var(--c-turquoise)]/25 blur-[90px]"
            animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-[var(--c-pink)]/25 blur-[90px]"
            animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/35"
            >
              Early access
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="font-display text-3xl text-gradient-sand sm:text-4xl md:text-5xl"
            >
              Be first to experience
              <br className="hidden sm:block" /> AETRO Lite.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mx-auto mt-5 max-w-md text-white/60"
            >
              We are building the first version now. Join the waitlist to
              follow prototypes, launch updates and early access.
            </motion.p>

            <AnimatePresence mode="wait">
              {join.isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="mx-auto mt-9 flex max-w-md items-center justify-center gap-3 rounded-full border border-[var(--c-turquoise)]/30 bg-[var(--c-turquoise)]/10 px-5 py-4 text-[var(--c-turquoise)]"
                >
                  <CheckCircle2 size={20} />
                  <span className="font-medium">
                    You're on the list — we'll be in touch.
                  </span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.38 }}
                  className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <Mail
                      size={16}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                    />

                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="glass w-full rounded-full py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/40 outline-none transition-all focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={join.isPending}
                    whileHover={{ scale: join.isPending ? 1 : 1.05 }}
                    whileTap={{ scale: join.isPending ? 1 : 0.96 }}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--c-turquoise)] disabled:opacity-60"
                  >
                    {join.isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        Join
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {join.isError && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-xs text-[var(--c-red)]"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-3 text-center"
            >
              <div className="rounded-2xl bg-white/7 px-3 py-4">
                <div className="font-display text-xl text-white">Prototype</div>
                <div className="mt-1 text-[10px] uppercase tracking-wide text-white/35">
                  in progress
                </div>
              </div>

              <div className="rounded-2xl bg-white/7 px-3 py-4">
                <div className="font-display text-xl text-white">Lite</div>
                <div className="mt-1 text-[10px] uppercase tracking-wide text-white/35">
                  first model
                </div>
              </div>

              <div className="rounded-2xl bg-white/7 px-3 py-4">
                <div className="font-display text-xl text-white">BUROQ</div>
                <div className="mt-1 text-[10px] uppercase tracking-wide text-white/35">
                  launching soon
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
