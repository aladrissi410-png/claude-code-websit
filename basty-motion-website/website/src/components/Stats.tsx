import { STATS } from "../data/content";

export default function Stats() {
  return (
    <section className="container-b">
      <div className="reveal -mt-10 grid grid-cols-2 gap-4 rounded-3xl border border-[var(--line)] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(90,68,53,0.4)] sm:p-8 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center gap-1 text-center"
            style={{
              borderInlineEnd: i < STATS.length - 1 ? "1px solid var(--line)" : "none",
            }}
          >
            <span className="font-display text-4xl font-bold text-[var(--brown)] sm:text-5xl">
              {s.value}
            </span>
            <span className="text-sm font-semibold text-[var(--muted)] sm:text-base">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
