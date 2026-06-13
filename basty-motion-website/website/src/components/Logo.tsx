interface LogoProps {
  className?: string;
  withWordmark?: boolean;
  light?: boolean;
}

/**
 * Faithful SVG recreation of the Basty geometric cake mark:
 * stacked brown tiers + coral "cherry" dot, a candle bar, and base accents.
 */
export default function Logo({ className, withWordmark = true, light = false }: LogoProps) {
  const brown = light ? "#FBF6EF" : "#5A4435";
  const coral = "#C75D5D";
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <svg
        viewBox="0 0 120 96"
        role="img"
        aria-label="باستي"
        className="h-10 w-auto shrink-0"
      >
        <circle cx="60" cy="22" r="9" fill={coral} />
        <rect x="42" y="36" width="36" height="10" rx="3.5" fill={brown} />
        <rect x="33" y="50" width="54" height="10" rx="3.5" fill={brown} />
        <rect x="24" y="64" width="72" height="10" rx="3.5" fill={brown} />
        <rect x="99" y="38" width="5" height="30" rx="2.5" fill={brown} />
        {/* base accents */}
        <rect x="10" y="78" width="30" height="4.5" rx="2.2" fill={brown} />
        <circle cx="18" cy="89" r="3.4" fill={brown} />
        <circle cx="30" cy="89" r="3.4" fill={brown} />
        <rect x="86" y="80" width="24" height="4.5" rx="2.2" fill={brown} />
        <circle cx="104" cy="90" r="3.4" fill={brown} />
      </svg>
      {withWordmark && (
        <span
          className="font-display leading-none"
          style={{ color: brown, fontSize: "1.9rem", fontWeight: 700 }}
        >
          باستي
        </span>
      )}
    </span>
  );
}
