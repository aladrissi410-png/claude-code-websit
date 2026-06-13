import type { CSSProperties } from "react";

interface IlloProps {
  className?: string;
  style?: CSSProperties;
}

/* ===================== Full layered cake ===================== */
export function CakeIllo({ className, style }: IlloProps) {
  return (
    <svg viewBox="0 0 240 240" className={className} style={style} aria-hidden="true">
      <ellipse cx="120" cy="214" rx="92" ry="14" fill="#000" opacity="0.08" />
      {/* plate */}
      <ellipse cx="120" cy="204" rx="86" ry="16" fill="#fff" />
      <ellipse cx="120" cy="200" rx="86" ry="16" fill="#F4E9DA" />
      <ellipse cx="120" cy="198" rx="70" ry="12" fill="#fff" />

      {/* bottom tier */}
      <path d="M58 196 v-40 a62 12 0 0 1 124 0 v40 a62 14 0 0 1 -124 0 z" fill="#FBF6EF" />
      <ellipse cx="120" cy="156" rx="62" ry="12" fill="#fff" />
      {/* chocolate drip */}
      <path
        d="M58 158 q8 22 18 4 q9 26 19 6 q10 26 20 4 q10 26 20 6 q10 24 19 2 q10 24 20 2 q9 18 16 2 l0 -22 a62 12 0 0 1 -132 0 z"
        fill="#6E4A30"
        opacity="0.92"
      />
      <ellipse cx="120" cy="156" rx="62" ry="11" fill="#7A5236" />
      <ellipse cx="120" cy="154" rx="62" ry="11" fill="#FBF6EF" />

      {/* middle tier */}
      <path d="M76 152 v-34 a44 10 0 0 1 88 0 v34 a44 11 0 0 1 -88 0 z" fill="#F6DCC4" />
      <ellipse cx="120" cy="118" rx="44" ry="10" fill="#FBEFE0" />
      {/* gold band */}
      <path d="M76 138 v6 a44 11 0 0 0 88 0 v-6 a44 11 0 0 1 -88 0 z" fill="#C9A24B" opacity="0.85" />

      {/* top tier */}
      <path d="M94 116 v-26 a26 8 0 0 1 52 0 v26 a26 9 0 0 1 -52 0 z" fill="#FBF6EF" />
      <ellipse cx="120" cy="90" rx="26" ry="8" fill="#fff" />

      {/* cherry + candle */}
      <rect x="118" y="58" width="4" height="26" rx="2" fill="#C9A24B" />
      <path d="M120 50 q-5 6 0 10 q5 -4 0 -10 z" fill="#E3C98A" />
      <circle cx="120" cy="74" r="9" fill="#C75D5D" />
      <circle cx="116.5" cy="71" r="2.6" fill="#fff" opacity="0.6" />

      {/* sprinkles */}
      <circle cx="104" cy="100" r="2.2" fill="#C9A24B" />
      <circle cx="136" cy="102" r="2.2" fill="#C75D5D" />
      <circle cx="120" cy="106" r="2.2" fill="#6E4A30" />
      <circle cx="92" cy="170" r="2.6" fill="#C9A24B" />
      <circle cx="150" cy="174" r="2.6" fill="#C75D5D" />
    </svg>
  );
}

/* ===================== Cookies ===================== */
export function CookiesIllo({ className, style }: IlloProps) {
  const chip = (cx: number, cy: number, r = 4) => (
    <circle cx={cx} cy={cy} r={r} fill="#5A3A22" />
  );
  return (
    <svg viewBox="0 0 240 240" className={className} style={style} aria-hidden="true">
      <ellipse cx="120" cy="214" rx="92" ry="14" fill="#000" opacity="0.08" />
      <ellipse cx="120" cy="206" rx="88" ry="16" fill="#fff" />
      <ellipse cx="120" cy="202" rx="88" ry="16" fill="#F4E9DA" />

      {/* stacked cookies */}
      {[
        { cy: 176, fill: "#CB8C46" },
        { cy: 150, fill: "#D49A55" },
        { cy: 124, fill: "#DCA661" },
      ].map((c, i) => (
        <g key={i}>
          <ellipse cx="120" cy={c.cy + 9} rx="54" ry="15" fill="#A56A33" />
          <ellipse cx="120" cy={c.cy} rx="54" ry="15" fill={c.fill} />
        </g>
      ))}
      {/* chips on top cookie */}
      {chip(104, 120)}
      {chip(132, 118)}
      {chip(120, 128)}
      {chip(146, 126)}
      {chip(96, 128)}

      {/* leaning cookie in front */}
      <g transform="rotate(-18 70 188)">
        <ellipse cx="70" cy="188" rx="40" ry="40" fill="#A56A33" />
        <ellipse cx="70" cy="184" rx="40" ry="40" fill="#DCA661" />
        {chip(60, 174, 4.5)}
        {chip(82, 180, 4.5)}
        {chip(68, 196, 4.5)}
        {chip(86, 198, 4.5)}
        {chip(52, 190, 4.5)}
      </g>

      {/* crumbs */}
      <circle cx="178" cy="196" r="4" fill="#CB8C46" />
      <circle cx="190" cy="204" r="3" fill="#A56A33" />
      <circle cx="40" cy="206" r="3.5" fill="#CB8C46" />
    </svg>
  );
}

/* ===================== Blue gift box ===================== */
export function GiftBoxIllo({ className, style }: IlloProps) {
  return (
    <svg viewBox="0 0 240 240" className={className} style={style} aria-hidden="true">
      <ellipse cx="120" cy="216" rx="86" ry="13" fill="#000" opacity="0.08" />

      {/* box body */}
      <rect x="56" y="108" width="128" height="100" rx="8" fill="#6F9BC9" />
      <rect x="56" y="108" width="128" height="100" rx="8" fill="url(#boxGrad)" opacity="0.35" />
      <defs>
        <linearGradient id="boxGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#3F6FA0" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* lid */}
      <rect x="46" y="86" width="148" height="32" rx="8" fill="#5B89BE" />
      <rect x="46" y="86" width="148" height="14" rx="7" fill="#7BA6D2" />

      {/* vertical ribbon */}
      <rect x="108" y="86" width="24" height="122" fill="#F3DCC4" />
      <rect x="108" y="86" width="24" height="122" fill="#E3C98A" opacity="0.5" />

      {/* bow */}
      <path d="M120 86 C96 60 60 64 70 84 C78 98 108 92 120 86 Z" fill="#E3C98A" />
      <path d="M120 86 C144 60 180 64 170 84 C162 98 132 92 120 86 Z" fill="#E3C98A" />
      <path d="M120 86 C100 66 74 70 82 84 C90 96 110 90 120 86 Z" fill="#CBA55C" opacity="0.6" />
      <path d="M120 86 C140 66 166 70 158 84 C150 96 130 90 120 86 Z" fill="#CBA55C" opacity="0.6" />
      <circle cx="120" cy="86" r="11" fill="#C9A24B" />
      <circle cx="116" cy="83" r="2.6" fill="#fff" opacity="0.6" />

      {/* sparkles */}
      <path d="M64 70 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" fill="#C9A24B" opacity="0.8" />
      <path d="M182 64 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" fill="#C75D5D" opacity="0.7" />
    </svg>
  );
}

/* ===================== Decorative golden twinkle field ===================== */
const STAR_CLIP =
  "polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)";

export function Twinkles({ count = 22 }: { count?: number }) {
  const dots = Array.from({ length: count }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const rnd = seed / 233280;
    const rnd2 = ((i * 4099 + 7919) % 100) / 100;
    return {
      left: rnd * 100,
      top: rnd2 * 100,
      size: 4 + ((i * 7) % 9),
      delay: (i % 5) * 0.7,
      duration: 2.4 + (i % 4),
      star: i % 2 === 0,
    };
  });
  return (
    <div className="pointer-events-none absolute inset-0" style={{ zIndex: 1 }} aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            backgroundColor: "#C9A24B",
            clipPath: d.star ? STAR_CLIP : undefined,
            borderRadius: d.star ? undefined : "9999px",
            animation: `basty-twinkle ${d.duration}s ease-in-out ${d.delay}s infinite`,
            opacity: 0.2,
          }}
        />
      ))}
    </div>
  );
}
