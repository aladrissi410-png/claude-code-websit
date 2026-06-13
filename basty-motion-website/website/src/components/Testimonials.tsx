import { Star, Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { REVIEWS } from "../data/content";

export default function Testimonials() {
  return (
    <section id="reviews" className="section">
      <div className="container-b">
        <SectionHeading
          eyebrow="آراء عملائنا"
          title="سعادتهم هي وصفتنا"
          desc="آلاف اللحظات الجميلة صنعناها معًا — وهذه بعض كلمات من أحببنا أن نُسعدهم."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="card reveal flex h-full flex-col p-7">
              <Quote className="text-[var(--gold)]" size={30} />
              <div className="mt-3 flex gap-1 text-[var(--gold)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-[var(--ink)]">
                «{r.text}»
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--peach-soft)] font-display text-lg font-bold text-[var(--brown)]">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-bold text-[var(--brown)]">{r.name}</span>
                  <span className="block text-sm text-[var(--muted)]">{r.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
