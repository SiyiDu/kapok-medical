import { P, r1, ridgePath, rng, smoothstep } from "./gen";

/**
 * Sunrise over Shenzhen Bay: layered hills, the city skyline against the sun,
 * a red-sailed junk on the water. Drawn on a transparent sky so the section's
 * own gradient shows through. Key elements sit in the middle 600 units, so the
 * picture still reads when a phone crops the sides.
 */

const W = 1600;
const H = 560;
const SEA = 400;

const sides = (t: number) => 0.3 + 0.7 * Math.pow(Math.abs(2 * t - 1), 1.3);

const far1 = ridgePath({ seed: 11, width: W, floor: SEA, base: 352, amp: 190, freq: 3.2, sharp: 0.75, envelope: sides });
const far2 = ridgePath({ seed: 23, width: W, floor: SEA, base: 378, amp: 170, freq: 4.1, sharp: 0.6, envelope: sides });
const midL = ridgePath({
  seed: 31,
  width: W,
  floor: SEA + 6,
  base: SEA + 6,
  amp: 210,
  freq: 4.5,
  sharp: 0.4,
  envelope: (t) => 1 - smoothstep(0.05, 0.36, t),
});
const midR = ridgePath({
  seed: 47,
  width: W,
  floor: SEA + 6,
  base: SEA + 6,
  amp: 230,
  freq: 4.2,
  sharp: 0.4,
  envelope: (t) => smoothstep(0.68, 0.98, t),
});
const nearL = ridgePath({
  seed: 59,
  width: W,
  floor: H,
  base: H + 10,
  amp: 330,
  freq: 5,
  sharp: 0.25,
  step: 12,
  envelope: (t) => 1 - smoothstep(0, 0.27, t),
});
const nearR = ridgePath({
  seed: 73,
  width: W,
  floor: H,
  base: H + 10,
  amp: 300,
  freq: 5,
  sharp: 0.25,
  step: 12,
  envelope: (t) => smoothstep(0.76, 1, t),
});

/** Generic city blocks, taller towards the centre. */
function blocks(seed: number, from: number, to: number, maxH: number, minW: number, maxW: number) {
  const rand = rng(seed);
  const out: Array<{ x: number; w: number; h: number; cap: number }> = [];
  let x = from;
  while (x < to) {
    const w = Math.round(minW + rand() * (maxW - minW));
    const centre = 1 - Math.min(1, Math.abs((x + w / 2 - 830) / 380));
    const h = Math.round(14 + (0.25 + rand() * 0.75) * maxH * (0.25 + 0.75 * centre));
    out.push({ x, w, h, cap: rand() });
    x += w + Math.round(rand() * 5);
  }
  return out;
}

const cityBack = blocks(5, 430, 1210, 120, 16, 34);
const cityFront = blocks(9, 470, 1170, 74, 14, 30);

const reflections = (() => {
  const rand = rng(77);
  return Array.from({ length: 10 }, (_, i) => {
    const w = 190 - i * 13 + rand() * 46;
    return { x: r1(800 - w / 2 + (rand() - 0.5) * 30), y: 409 + i * 14, w: r1(w), o: r1(0.8 - i * 0.065) };
  });
})();

const ripples = (() => {
  const rand = rng(101);
  return Array.from({ length: 26 }, () => {
    const y = 412 + rand() * 140;
    return { x: r1(rand() * W), y: r1(y), w: r1(24 + rand() * 70 + (y - 400) * 0.3) };
  });
})();

function Cloud({ x, y, s = 1, o = 0.9 }: { x: number; y: number; s?: number; o?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={P.cream} opacity={o}>
      <rect x="0" y="0" width="150" height="18" rx="9" />
      <rect x="34" y="-14" width="96" height="18" rx="9" />
      <rect x="62" y="14" width="126" height="18" rx="9" />
    </g>
  );
}

function Skyline() {
  return (
    <g>
      <g fill="#8DB9AB">
        {cityBack.map((b) => (
          <rect key={b.x} x={b.x} y={SEA - b.h} width={b.w} height={b.h + 2} />
        ))}
      </g>
      <g fill="#5E9B8C">
        {cityFront.map((b) => (
          <g key={b.x}>
            <rect x={b.x} y={SEA - b.h} width={b.w} height={b.h + 2} />
            {b.cap > 0.72 ? <rect x={b.x + b.w / 2 - 1} y={SEA - b.h - 12} width="2" height="12" /> : null}
            {b.cap < 0.2 ? <rect x={b.x + 3} y={SEA - b.h - 6} width={b.w - 6} height="6" /> : null}
          </g>
        ))}
      </g>
      {/* landmark towers */}
      <g fill="#3F8172">
        {/* KK100 */}
        <path d="M727,402 L727,246 Q727,222 742,220 Q757,222 757,246 L757,402 Z" />
        {/* Ping An Finance Centre */}
        <path d="M851,402 L853,248 L860,202 L866,186 L867,146 L869,146 L870,186 L876,202 L883,248 L885,402 Z" />
        {/* China Resources Tower */}
        <path d="M946,402 L948,292 Q952,236 962,222 Q972,236 976,292 L978,402 Z" />
        <rect x="792" y="296" width="24" height="106" />
        <rect x="797" y="284" width="14" height="14" />
        <rect x="908" y="312" width="22" height="90" />
        <rect x="1004" y="330" width="26" height="72" />
        <rect x="672" y="322" width="24" height="80" />
      </g>
      {/* the lit side of each landmark */}
      <g fill="#5E9B8C">
        <path d="M727,402 L727,246 Q727,226 736,221 L736,402 Z" />
        <path d="M851,402 L853,248 L860,202 L864,192 L864,402 Z" />
        <path d="M946,402 L948,292 Q951,246 956,232 L956,402 Z" />
      </g>
    </g>
  );
}

export function Landscape({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="ls-glow" cx="800" cy="320" r="460" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFE9C4" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#FFD9AE" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FFD9AE" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ls-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F26A45" />
          <stop offset="1" stopColor="#DE4526" />
        </linearGradient>
        <linearGradient id="ls-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E3EEDF" />
          <stop offset="1" stopColor="#9DC6B8" />
        </linearGradient>
        <linearGradient id="ls-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF1DC" stopOpacity="0" />
          <stop offset="1" stopColor="#FFF1DC" stopOpacity="0.85" />
        </linearGradient>
        <clipPath id="ls-sea-clip">
          <rect x="0" y={SEA} width={W} height={H - SEA} />
        </clipPath>
        <g id="ls-city">
          <Skyline />
        </g>
      </defs>

      <circle cx="800" cy="320" r="460" fill="url(#ls-glow)" />

      <g className="art-drift-slow">
        <Cloud x={250} y={150} s={1.15} />
        <Cloud x={1210} y={110} s={1} o={0.8} />
      </g>
      <g className="art-drift">
        <Cloud x={560} y={74} s={0.7} o={0.7} />
        <Cloud x={1010} y={232} s={0.6} o={0.75} />
      </g>

      <circle className="art-sun" cx="800" cy="300" r="112" fill="url(#ls-sun)" />

      {/* birds */}
      <g fill="none" stroke={P.pine} strokeWidth="2.2" strokeLinecap="round" opacity="0.7">
        <path d="M1030,150 q8,-8 16,0 q8,-8 16,0" />
        <path d="M1074,128 q6,-6 12,0 q6,-6 12,0" />
        <path d="M1002,118 q5,-5 10,0 q5,-5 10,0" />
      </g>

      {/* a flight coming in */}
      <g className="art-plane">
        <path d="M150,250 Q330,70 520,104" fill="none" stroke={P.cream} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 11" />
        <g transform="translate(532 106) rotate(10) scale(0.5)" fill={P.cream}>
          <path d="M-46,0 C-46,-7 -30,-8 20,-8 C38,-8 52,-4 52,0 C52,4 38,8 20,8 C-30,8 -46,7 -46,0 Z" />
          <path d="M8,-6 L-14,-52 L-26,-52 L-12,-6 Z M8,6 L-14,52 L-26,52 L-12,6 Z" />
          <path d="M-34,-6 L-46,-24 L-54,-24 L-46,-6 Z M-34,6 L-46,24 L-54,24 L-46,6 Z" fill={P.kapok} />
        </g>
      </g>

      {/* distant hills, fading into the morning haze */}
      <path d={far1} fill="#C5DBCD" />
      <rect x="0" y="250" width={W} height="150" fill="url(#ls-haze)" />
      <path d={far2} fill="#A5C8B8" />
      <rect x="0" y="300" width={W} height="100" fill="url(#ls-haze)" opacity="0.8" />

      <use href="#ls-city" />
      <rect x="0" y="340" width={W} height="62" fill="url(#ls-haze)" opacity="0.55" />

      <path d={midL} fill="#4E8E7F" />
      <path d={midR} fill="#4E8E7F" />

      {/* the bay */}
      <rect x="0" y={SEA} width={W} height={H - SEA} fill="url(#ls-sea)" />
      <g clipPath="url(#ls-sea-clip)">
        <use href="#ls-city" transform="translate(0 580) scale(1 -0.45)" opacity="0.22" />
        <path d={midL} fill="#4E8E7F" transform="translate(0 580) scale(1 -0.45)" opacity="0.2" />
        <path d={midR} fill="#4E8E7F" transform="translate(0 580) scale(1 -0.45)" opacity="0.2" />
      </g>
      <g fill="#EC6842">
        {reflections.map((r) => (
          <rect key={r.y} x={r.x} y={r.y} width={r.w} height="5" rx="2.5" opacity={r.o} />
        ))}
      </g>
      <g fill={P.cream} opacity="0.55">
        {ripples.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height="2.4" rx="1.2" />
        ))}
      </g>

      {/* red-sailed junk */}
      <g className="art-bob" transform="translate(1052 446) scale(0.85)">
        <g fill={P.kapok}>
          <path d="M-20,-6 L-22,-40 Q-10,-46 -2,-40 L-4,-6 Z" />
          <path d="M2,-6 L0,-54 Q14,-62 26,-52 L22,-6 Z" />
          <path d="M28,-6 L28,-34 Q38,-38 46,-32 L42,-6 Z" />
        </g>
        <path d="M-34,-2 L56,-2 Q50,12 40,12 L-22,12 Q-30,10 -34,-2 Z" fill={P.bark} />
      </g>
      {/* ferry */}
      <g className="art-bob-late" transform="translate(604 428)">
        <rect x="-16" y="-12" width="30" height="8" rx="2" fill={P.cream} />
        <path d="M-28,-4 L28,-4 L22,6 L-22,6 Z" fill={P.pine} />
      </g>

      {/* near shore */}
      <path d={nearL} fill={P.pine} />
      <path d={nearR} fill={P.pine} />
    </svg>
  );
}

/** A low strip of hills for page headers and dark panels. */
export function Ridges({
  seed,
  className,
  colors = ["#C5DBCD", "#A5C8B8", "#72A696"],
  height = 160,
}: {
  seed: number;
  className?: string;
  colors?: string[];
  height?: number;
}) {
  const w = 1600;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      {colors.map((c, i) => (
        <path
          key={c + i}
          fill={c}
          d={ridgePath({
            seed: seed + i * 13,
            width: w,
            floor: height,
            base: height - (colors.length - 1 - i) * height * 0.12,
            amp: height * (0.85 - i * 0.2),
            freq: 3 + i * 1.3,
            sharp: 0.7 - i * 0.2,
          })}
        />
      ))}
    </svg>
  );
}
