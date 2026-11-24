import { P, r1 } from "./gen";

/**
 * Kapok (木棉) blossoms and branches. The kapok is Guangzhou's city flower:
 * big red flowers on bare branches every spring.
 */

const PETAL = "M0,3 C15,-3 20,-24 13,-35 C9,-41 -9,-41 -13,-35 C-20,-24 -15,-3 0,3 Z";
const FIVE = [0, 72, 144, 216, 288];
const STAMENS = Array.from({ length: 9 }, (_, i) => {
  const a = ((i * 40 + 12) * Math.PI) / 180;
  return { x1: r1(Math.cos(a) * 4), y1: r1(Math.sin(a) * 4), x2: r1(Math.cos(a) * 13), y2: r1(Math.sin(a) * 13) };
});

/** Gradient shared by every blossom inside one <svg>. Render once inside <defs>. */
export function PetalGradient({ id }: { id: string }) {
  return (
    <radialGradient id={id} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="40">
      <stop offset="0" stopColor="#9C2914" />
      <stop offset="0.5" stopColor={P.kapok} />
      <stop offset="1" stopColor="#F06A49" />
    </radialGradient>
  );
}

export function Blossom({
  x,
  y,
  r = 40,
  rot = 0,
  gradient,
}: {
  x: number;
  y: number;
  r?: number;
  rot?: number;
  /** id of a <PetalGradient> in the same svg */
  gradient: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${r1(r / 40)})`}>
      {FIVE.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path d={PETAL} fill={`url(#${gradient})`} stroke="#B5371F" strokeWidth="1" />
          <path d="M0,-11 L0,-31" stroke="#F99A78" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
        </g>
      ))}
      <circle r="8" fill="#741C10" />
      {STAMENS.map((s, i) => (
        <g key={i}>
          <line {...s} stroke="#F3C55A" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx={s.x2} cy={s.y2} r="1.9" fill="#FADB7D" />
        </g>
      ))}
    </g>
  );
}

/** Flat, single-colour blossom for tone-on-tone decoration. */
export function BlossomFlat({
  x,
  y,
  r = 40,
  rot = 0,
  fill,
  heart,
  edge,
}: {
  x: number;
  y: number;
  r?: number;
  rot?: number;
  fill: string;
  heart: string;
  /** Colour of the line between petals. Use the background colour. */
  edge?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${r1(r / 40)})`}>
      {FIVE.map((a) => (
        <path key={a} d={PETAL} fill={fill} stroke={edge} strokeWidth={edge ? 1.6 : 0} transform={`rotate(${a})`} />
      ))}
      <circle r="7" fill={heart} />
    </g>
  );
}

function Bud({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <ellipse cx="0" cy="-7" rx="6.5" ry="9" fill="#C03C22" />
      <path d="M-7,0 C-7,-8 7,-8 7,0 C7,5 -7,5 -7,0 Z" fill="#4B2A20" />
    </g>
  );
}

/**
 * A flowering branch that enters from the top-right corner of its box.
 * Mirror it with CSS (-scale-x-100) for the opposite corner.
 */
export function KapokBranch({ className, id = "kb" }: { className?: string; id?: string }) {
  const g = `${id}-petal`;
  const wood = { fill: "none", stroke: P.bark, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 560 440" className={className} aria-hidden="true">
      <defs>
        <PetalGradient id={g} />
      </defs>
      {/* wood */}
      <path d="M585,-14 C520,28 470,50 420,75" {...wood} strokeWidth="17" />
      <path d="M420,75 C380,95 330,120 290,150" {...wood} strokeWidth="12" />
      <path d="M290,150 C240,185 195,198 150,202" {...wood} strokeWidth="8" />
      <path d="M472,52 C462,100 446,140 452,188" {...wood} strokeWidth="9" />
      <path d="M452,188 C456,214 444,238 424,252" {...wood} strokeWidth="6" />
      <path d="M362,104 C342,72 304,62 276,44" {...wood} strokeWidth="7" />
      <path d="M292,150 C288,190 266,220 240,248" {...wood} strokeWidth="6" />
      <path d="M455,150 C480,160 500,180 512,206" {...wood} strokeWidth="5" />
      <path d="M330,128 C318,150 320,170 330,186" {...wood} strokeWidth="4" />
      <path d="M210,196 C196,176 190,160 192,142" {...wood} strokeWidth="4" />
      <path d="M520,24 C512,8 498,-2 486,-12" {...wood} strokeWidth="6" />

      {/* buds */}
      <Bud x={513} y={210} rot={150} />
      <Bud x={331} y={190} rot={170} />
      <Bud x={192} y={138} rot={-8} />

      {/* flowers */}
      <Blossom gradient={g} x={420} y={262} r={46} rot={14} />
      <Blossom gradient={g} x={268} y={38} r={36} rot={-20} />
      <Blossom gradient={g} x={236} y={256} r={38} rot={40} />
      <Blossom gradient={g} x={140} y={200} r={42} rot={6} />
      <Blossom gradient={g} x={372} y={112} r={28} rot={30} />
    </svg>
  );
}
