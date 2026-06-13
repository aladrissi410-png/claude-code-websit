import { ArrowLeft, Cake, Heart, CandyCane, type LucideIcon } from "lucide-react";
import type { ComponentType, CSSProperties } from "react";
import SectionHeading from "./SectionHeading";
import { CakeIllo, CookiesIllo, GiftBoxIllo } from "./illustrations";
import { PRODUCTS, SITE } from "../data/content";

type IlloComp = ComponentType<{ style?: CSSProperties }>;
const ILLOS: Record<string, IlloComp> = {
  cake: CakeIllo,
  cookies: CookiesIllo,
  gift: GiftBoxIllo,
};
const ICONS: Record<string, LucideIcon> = {
  wedding: Cake,
  choco: CandyCane,
  occasion: Heart,
};

export default function Products() {
  return (
    <section id="products" className="section">
      <div className="container-b">
        <SectionHeading
          eyebrow="منتجاتنا"
          title="تشكيلة باستي"
          desc="من الكيكة الكاملة إلى أصغر قطعة كوكيز — كل صنف مصنوع بعنايةٍ ليكون على قدر مناسبتك."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => {
            const Illo = ILLOS[p.key];
            const Icon = ICONS[p.key];
            return (
              <article key={p.key} className="card reveal overflow-hidden">
                <div
                  className="relative flex h-44 items-center justify-center"
                  style={{ background: p.tone }}
                >
                  {Illo ? (
                    <Illo style={{ width: 150, height: 150 }} />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/70 text-[var(--brown)]">
                      {Icon ? <Icon size={44} /> : <Cake size={44} />}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-2xl font-bold text-[var(--brown)]">{p.name}</h3>
                    <span className="rounded-full bg-[var(--cream-2)] px-3 py-1 text-xs font-bold text-[var(--brown-soft)]">
                      {p.price}
                    </span>
                  </div>
                  <p className="mt-3 leading-relaxed text-[var(--muted)]">{p.desc}</p>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-2 font-bold text-[var(--coral)] transition hover:gap-3"
                  >
                    اطلب الآن
                    <ArrowLeft size={18} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="reveal mt-10 text-center">
          <a href={SITE.href} target="_blank" rel="noreferrer" className="btn btn-coral">
            تصفّح المتجر كاملًا على {SITE.url}
          </a>
        </div>
      </div>
    </section>
  );
}
