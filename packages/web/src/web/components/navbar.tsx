import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Colors", href: "#colors" },
  { label: "Waitlist", href: "#waitlist" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <nav
          className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
          }`}
        >
          <a
            href="#top"
            className="font-display text-xl tracking-tight text-white"
          >
            BUROQ
          </a>

          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => scrollTo("#waitlist")}
              className="rounded-full bg-white text-[var(--navy)] text-sm font-semibold px-5 py-2.5 hover:bg-[var(--c-turquoise)] transition-colors"
            >
              Join the waitlist
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {open && (
          <div className="mt-2 glass rounded-3xl p-5 flex flex-col gap-4 md:hidden">
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left text-white/90 text-base font-medium"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#waitlist")}
              className="rounded-full bg-white text-[var(--navy)] text-sm font-semibold px-5 py-2.5"
            >
              Join the waitlist
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
