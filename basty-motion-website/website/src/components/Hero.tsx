import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ArrowLeft } from "lucide-react";
import { CakeIllo, CookiesIllo, GiftBoxIllo, Twinkles } from "./illustrations";
import { SITE } from "../data/content";

const ITEMS = [
  { key: "cake", label: "الكيكة الكاملة", Illo: CakeIllo, bg: "#F3DCC4", panel: "#F8E8D6" },
  { key: "cookies", label: "كوكيز فاخر", Illo: CookiesIllo, bg: "#EAD3B0", panel: "#F3E2C6" },
  { key: "gift", label: "صندوق هدايا", Illo: GiftBoxIllo, bg: "#CFE0F0", panel: "#E2EDF8" },
];

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const DURATION = 650;
type Role = "center" | "side-a" | "side-b";

export default function Hero() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false,
  );
  const hover = useRef(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const go = (dir: "next" | "prev") => {
    if (animating) return;
    setAnimating(true);
    setActive((p) => (dir === "next" ? (p + 1) % 3 : (p + 2) % 3));
    window.setTimeout(() => setAnimating(false), DURATION);
  };

  // auto-advance
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      if (!hover.current) setActive((p) => (p + 1) % 3);
    }, 3600);
    return () => window.clearInterval(id);
  }, []);

  const roleOf = (i: number): Role => {
    if (i === active) return "center";
    if (i === (active + 1) % 3) return "side-a";
    return "side-b";
  };

  const styleFor = (role: Role): CSSProperties => {
    const base: CSSProperties = {
      position: "absolute",
      top: "50%",
      transition: `all ${DURATION}ms ${EASE}`,
      willChange: "transform, filter, opacity",
    };
    const c = isMobile ? 1.0 : 1.2;
    switch (role) {
      case "center":
        return {
          ...base,
          left: "50%",
          transform: `translate(-50%, -50%) scale(${c})`,
          filter: "drop-shadow(0 30px 40px rgba(90,68,53,0.25))",
          opacity: 1,
          zIndex: 20,
          width: isMobile ? 230 : 300,
          height: isMobile ? 230 : 300,
        };
      case "side-a":
        return {
          ...base,
          left: isMobile ? "92%" : "78%",
          transform: "translate(-50%, -50%) scale(0.62)",
          filter: "blur(2px)",
          opacity: isMobile ? 0 : 0.7,
          zIndex: 10,
          width: 260,
          height: 260,
        };
      case "side-b":
        return {
          ...base,
          left: isMobile ? "8%" : "22%",
          transform: "translate(-50%, -50%) scale(0.62)",
          filter: "blur(2px)",
          opacity: isMobile ? 0 : 0.7,
          zIndex: 10,
          width: 260,
          height: 260,
        };
    }
  };

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${ITEMS[active].panel} 0%, var(--cream) 78%)`,
        transition: `background ${DURATION}ms ${EASE}`,
      }}
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
    >
      <Twinkles count={24} />
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(201,162,75,0.22), transparent 70%)", zIndex: 0 }}
      />
      <div
        className="pointer-events-none absolute bottom-[-10%] left-[-10%] h-[420px] w-[420px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(199,93,93,0.16), transparent 70%)", zIndex: 0 }}
      />

      <div className="container-b relative z-10 flex min-h-screen flex-col items-center justify-center pt-28 pb-16 text-center">
        <span className="eyebrow reveal is-visible">
          <Sparkles size={16} />
          {SITE.tagline} · {SITE.subTagline}
        </span>

        <h1
          className="font-display mt-6 leading-none text-[var(--brown)]"
          style={{ fontSize: "clamp(5rem, 22vw, 13rem)", fontWeight: 700 }}
        >
          باستي
        </h1>

        <p className="mt-2 max-w-2xl text-lg font-medium text-[var(--muted)] sm:text-xl">
          كيكاتٌ مخصّصة، كوكيز فاخر، وصناديق هدايا أنيقة — تُصنع بحبٍّ لتُحوّل كل مناسبة إلى ذكرى لا تُنسى.
        </p>

        {/* carousel stage */}
        <div className="relative mt-6 h-[300px] w-full sm:h-[340px]">
          {ITEMS.map((item, i) => {
            const { Illo } = item;
            return (
              <div key={item.key} style={styleFor(roleOf(i))}>
                <Illo style={{ width: "100%", height: "100%" }} />
              </div>
            );
          })}
        </div>

        {/* controls */}
        <div className="mt-2 flex items-center gap-5">
          <button
            type="button"
            aria-label="السابق"
            onClick={() => go("prev")}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--brown)] transition hover:scale-110 hover:bg-[var(--brown)] hover:text-white"
          >
            <ChevronRight size={22} />
          </button>

          <div className="min-w-[120px] text-center">
            <div className="font-display text-xl font-bold text-[var(--brown)]">
              {ITEMS[active].label}
            </div>
            <div className="mt-2 flex justify-center gap-1.5">
              {ITEMS.map((_, i) => (
                <span
                  key={i}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: i === active ? 22 : 8,
                    background: i === active ? "var(--coral)" : "var(--line)",
                  }}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="التالي"
            onClick={() => go("next")}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--brown)] transition hover:scale-110 hover:bg-[var(--brown)] hover:text-white"
          >
            <ChevronLeft size={22} />
          </button>
        </div>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#contact" className="btn btn-primary">
            اطلب كيكتك الآن
            <ArrowLeft size={18} />
          </a>
          <a href="#products" className="btn btn-ghost">
            تصفّح المنتجات
          </a>
        </div>
      </div>
    </section>
  );
}
