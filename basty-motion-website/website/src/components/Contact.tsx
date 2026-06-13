import { MessageCircle, Phone, Mail, MapPin, Instagram, Globe } from "lucide-react";
import { CookiesIllo, GiftBoxIllo, Twinkles } from "./illustrations";
import { SITE } from "../data/content";

const CONTACTS = [
  { icon: Phone, label: "اتصل بنا", value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: "البريد", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, label: "الموقع", value: SITE.location, href: "#" },
  { icon: Instagram, label: "إنستغرام", value: SITE.instagram, href: SITE.instagramHref },
];

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-b">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--brown)] px-6 py-14 sm:px-12">
          <Twinkles count={16} />
          <CookiesIllo
            className="pointer-events-none absolute -bottom-6 left-4 hidden opacity-90 sm:block"
            style={{ width: 170, height: 170 }}
          />
          <GiftBoxIllo
            className="pointer-events-none absolute -top-6 right-2 hidden opacity-90 sm:block"
            style={{ width: 150, height: 150 }}
          />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold text-[var(--cream)] sm:text-5xl">
              جاهزٌ لطلب لحظتك الأجمل؟
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--peach-soft)]">
              تواصل معنا الآن لنصمّم لك كيكة أو صندوق هدايا يليق بمناسبتك — أو اطلب مباشرةً من متجرنا.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-coral">
                <MessageCircle size={20} />
                اطلب عبر واتساب
              </a>
              <a href={SITE.href} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ background: "var(--cream)", color: "var(--brown)" }}>
                <Globe size={20} />
                زيارة {SITE.url}
              </a>
            </div>
          </div>

          <div className="relative z-10 mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACTS.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border p-4 transition hover:bg-white/10"
                  style={{ borderColor: "rgba(251,246,239,0.18)" }}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--coral)] text-white">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-[var(--peach-soft)]">
                      {c.label}
                    </span>
                    <span className="font-latin block truncate font-bold text-[var(--cream)]" dir="ltr">
                      {c.value}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
