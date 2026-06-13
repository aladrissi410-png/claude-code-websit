import { STEPS } from "../data/content";

export default function HowToOrder() {
  return (
    <section id="how" className="section bg-[var(--brown)]">
      <div className="container-b">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">كيف تطلب</span>
          <h2 className="font-display mt-4 text-4xl font-bold text-[var(--cream)] sm:text-5xl">
            أربع خطوات تفصلك عن لحظتك الأجمل
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--peach-soft)]">
            طلب حلوى باستي سهلٌ وسريع — اختر، خصّص، ودعنا نهتم بالباقي.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.n} className="reveal relative">
              <div
                className="h-full rounded-3xl border p-7 text-center"
                style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(251,246,239,0.15)" }}
              >
                <span className="font-display mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--coral)] text-2xl font-bold text-white">
                  {s.n}
                </span>
                <h3 className="font-display mt-5 text-xl font-bold text-[var(--cream)]">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--peach-soft)]">{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="pointer-events-none absolute -left-3 top-1/2 hidden -translate-y-1/2 text-2xl text-[var(--gold-soft)] lg:block">
                  ←
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
