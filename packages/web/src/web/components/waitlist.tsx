import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";

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
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error("Failed");
    return res.json();
  },
});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    join.mutate(email);
  };

  return (
    <section id="waitlist" className="relative mesh-sand py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center shadow-[0_20px_60px_rgba(11,27,43,0.12)] sm:px-16"
          style={{
            background:
              "linear-gradient(150deg, var(--navy) 0%, var(--navy-deep) 100%)",
          }}
        >
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[var(--c-turquoise)]/25 blur-[90px]" />
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-[var(--c-pink)]/25 blur-[90px]" />

          <div className="relative">
            <h2 className="font-display text-3xl text-gradient-sand sm:text-4xl">
              Be first to experience AETRO Lite.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/60">
              We are building the first version now. Join the waitlist to
              follow the launch, see prototypes and get early access.
            </p>

            {join.isSuccess ? (
              <div className="mt-8 flex items-center justify-center gap-2 text-[var(--c-turquoise)]">
                <CheckCircle2 size={20} />
                <span className="font-medium">
                  You're on the list — we'll be in touch.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
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
                    className="glass w-full rounded-full py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <button
                  type="submit"
                  disabled={join.isPending}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--c-turquoise)] disabled:opacity-60"
                >
                  {join.isPending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Join the waitlist"
                  )}
                </button>
              </form>
            )}
            {join.isError && (
              <p className="mt-3 text-xs text-[var(--c-red)]">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
