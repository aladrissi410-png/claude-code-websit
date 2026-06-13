import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";
import { NAV, SITE } from "../data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(251,246,239,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="container-b flex items-center justify-between py-3">
        <a href="#home" aria-label="باستي">
          <Logo />
        </a>

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] font-semibold text-[var(--ink)] transition-colors hover:text-[var(--coral)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={SITE.phoneHref} className="btn btn-ghost" style={{ padding: "0.6rem 1.1rem" }}>
            <Phone size={18} />
            اتصل بنا
          </a>
          <a href="#contact" className="btn btn-primary" style={{ padding: "0.6rem 1.4rem" }}>
            اطلب الآن
          </a>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label="القائمة"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--brown)] lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="lg:hidden">
          <nav className="container-b flex flex-col gap-1 border-t border-[var(--line)] bg-[var(--cream)] py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-[var(--ink)] hover:bg-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-2 justify-center"
            >
              اطلب الآن
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
