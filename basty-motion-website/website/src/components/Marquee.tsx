const TAGS = [
  "كيكات مخصّصة",
  "كوكيز فاخر",
  "صناديق هدايا",
  "كيكات الأعراس",
  "شوكولاتة داكنة",
  "حلويات المناسبات",
  "توصيل طازج",
  "تغليف أنيق",
];

export default function Marquee() {
  const row = [...TAGS, ...TAGS];
  return (
    <div className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--brown)] py-4">
      <div
        className="flex w-max gap-10 whitespace-nowrap"
        style={{ animation: "basty-marquee 28s linear infinite" }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-lg font-bold text-[var(--cream)]">
            {t}
            <span className="text-[var(--gold-soft)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
