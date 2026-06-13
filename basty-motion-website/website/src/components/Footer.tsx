import { Instagram, Globe, Heart } from "lucide-react";
import Logo from "./Logo";
import { NAV, SITE } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-[var(--brown-deep)] pt-14 text-[var(--peach-soft)]">
      <div className="container-b grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm leading-relaxed text-[var(--peach-soft)]/90">
            باستي — كيكاتٌ مخصّصة، كوكيز فاخر، وصناديق هدايا أنيقة. نصنع الذوق بحبٍّ واهتمام لنحوّل
            مناسباتكم إلى لحظاتٍ لا تُنسى.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={SITE.instagramHref}
              target="_blank"
              rel="noreferrer"
              aria-label="إنستغرام"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[var(--cream)] transition hover:bg-[var(--coral)]"
            >
              <Instagram size={20} />
            </a>
            <a
              href={SITE.href}
              target="_blank"
              rel="noreferrer"
              aria-label="الموقع"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[var(--cream)] transition hover:bg-[var(--coral)]"
            >
              <Globe size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold text-[var(--cream)]">روابط سريعة</h4>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition hover:text-[var(--cream)]">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold text-[var(--cream)]">تواصل معنا</h4>
          <ul className="mt-4 space-y-2.5">
            <li className="font-latin" dir="ltr">
              {SITE.phone}
            </li>
            <li className="font-latin" dir="ltr">
              {SITE.email}
            </li>
            <li>{SITE.location}</li>
            <li>
              <a
                href={SITE.href}
                target="_blank"
                rel="noreferrer"
                className="font-latin font-bold text-[var(--gold-soft)] hover:underline"
                dir="ltr"
              >
                {SITE.url}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="container-b flex flex-wrap items-center justify-center gap-1.5 text-center text-sm text-[var(--peach-soft)]/80">
          © {new Date().getFullYear()} باستي. جميع الحقوق محفوظة. صُنع بـ
          <Heart size={14} className="inline text-[var(--coral)]" fill="currentColor" />
          في ليبيا.
        </p>
      </div>
    </footer>
  );
}
