import { Quote, BadgeCheck } from "lucide-react";
import { CakeIllo, Twinkles } from "./illustrations";
import Logo from "./Logo";
import { SITE } from "../data/content";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-b grid items-center gap-12 lg:grid-cols-2">
        {/* text */}
        <div className="reveal">
          <span className="eyebrow">قصتنا</span>
          <h2 className="font-display mt-4 text-4xl font-bold text-[var(--brown)] sm:text-5xl">
            من فرنٍ صغير… إلى علامةٍ يثق بها الجميع
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">
            بدأت <strong className="text-[var(--brown)]">باستي</strong> بشغفٍ بسيط: أن نصنع حلوى تليق
            بلحظاتكم الجميلة. ومن طرابلس انطلقنا لنقدّم كيكات وكوكيز وصناديق هدايا تجمع بين النكهة
            الأصيلة والتصميم العصري الراقي.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
            كل طلب يمرّ بأيدٍ تصنع <strong className="text-[var(--brown)]">الذوق بحبٍّ واهتمام</strong>،
            لأننا نؤمن أن التفاصيل الصغيرة هي ما يصنع الفرق الكبير.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "مكوّنات طازجة ومنتقاة بعناية",
              "تصميم مخصّص لكل مناسبة",
              "فريق محترف وخبرة سنوات",
              "رضا عملاء يفوق التوقعات",
            ].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <BadgeCheck className="shrink-0 text-[var(--coral)]" size={22} />
                <span className="font-semibold text-[var(--ink)]">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* visual panel */}
        <div className="reveal relative">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--line)] bg-gradient-to-b from-[var(--peach-soft)] to-[var(--cream)] p-8">
            <Twinkles count={14} />
            <div className="relative z-10 flex flex-col items-center text-center">
              <CakeIllo
                style={{ width: 240, height: 240, animation: "basty-float 6s ease-in-out infinite" }}
              />
              <div className="mt-4 rounded-2xl bg-white/80 px-6 py-5 backdrop-blur">
                <Quote className="mx-auto text-[var(--gold)]" size={26} />
                <p className="font-display mt-2 text-2xl font-bold text-[var(--brown)]">
                  {SITE.tagline}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--muted)]">{SITE.subTagline}</p>
                <div className="mt-4 flex items-center justify-center">
                  <Logo withWordmark={false} />
                  <span className="font-display text-lg font-bold text-[var(--brown)]">
                    فريق باستي
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
