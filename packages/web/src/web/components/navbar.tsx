import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Design", href: "#design" },
  { label: "Engineering", href: "#engineering" },
  { label: "Market", href: "#market" },
  { label: "Waitlist", href: "#waitlist" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-3 transition-all duration-500 ${scrolled ? "border border-black/10 bg-white/72 shadow-[0_18px_60px_rgba(0,0,0,0.10)] backdrop-blur-2xl" : "border border-white/18 bg-white/10 backdrop-blur-md"}`}>
        <button onClick={() => scrollTo("#top")} className="flex items-center gap-2 text-left" aria-label="BUROQ home">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1d1d1f] text-[10px] font-bold tracking-[-0.02em] text-white">BQ</span>
          <span className={`text-sm font-semibold tracking-[-0.02em] ${scrolled ? "text-[#1d1d1f]" : "text-white"}`}>BUROQ</span>
        </button>

        <div className="hidden items-center gap-1 rounded-full bg-black/5 p-1 lg:flex">
          {LINKS.map((link) => (
            <button key={link.href} onClick={() => scrollTo(link.href)} className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${scrolled ? "text-[#1d1d1f]/70 hover:bg-white hover:text-[#1d1d1f]" : "text-white/72 hover:bg-white/14 hover:text-white"}`}>
              {link.label}
            </button>
          ))}
        </div>

        <button onClick={() => scrollTo("#waitlist")} className="hidden rounded-full bg-[#1d1d1f] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(29,29,31,0.18)] transition-transform hover:-translate-y-0.5 sm:inline-flex">
          Join waitlist
        </button>

        <button onClick={() => setOpen((value) => !value)} className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${scrolled ? "bg-black/5 text-[#1d1d1f]" : "bg-white/10 text-white"}`} aria-label="Toggle menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-[28px] border border-black/10 bg-white/86 p-4 shadow-2xl backdrop-blur-2xl lg:hidden">
          {LINKS.map((link) => (
            <button key={link.href} onClick={() => scrollTo(link.href)} className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[#1d1d1f] hover:bg-black/5">
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
