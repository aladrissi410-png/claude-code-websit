import { Sparkles, Palette, Truck, Gift, type LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { FEATURES } from "../data/content";

const ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  palette: Palette,
  truck: Truck,
  gift: Gift,
};

export default function Features() {
  return (
    <section className="section bg-[var(--cream-2)]">
      <div className="container-b">
        <SectionHeading
          eyebrow="لماذا باستي"
          title="نصنع الذوق بحبٍّ واهتمام"
          desc="نؤمن أن الحلوى لحظة فرح — لذلك نهتم بكل تفصيلة من اختيار المكوّن حتى لمسة التغليف الأخيرة."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon] ?? Sparkles;
            return (
              <div key={f.title} className="card reveal p-7 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--peach-soft)] text-[var(--brown)]">
                  <Icon size={30} />
                </div>
                <h3 className="font-display mt-5 text-xl font-bold text-[var(--brown)]">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--muted)]">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
