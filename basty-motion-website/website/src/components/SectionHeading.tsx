interface Props {
  eyebrow: string;
  title: string;
  desc?: string;
  center?: boolean;
}

export default function SectionHeading({ eyebrow, title, desc, center = true }: Props) {
  return (
    <div className={`reveal max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-display mt-4 text-4xl font-bold text-[var(--brown)] sm:text-5xl">
        {title}
      </h2>
      {desc && <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">{desc}</p>}
    </div>
  );
}
