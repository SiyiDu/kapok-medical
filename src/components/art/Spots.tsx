import type { ServiceIconName } from "@/content/services";
import { P, ridgePath } from "./gen";

/**
 * One small scene per service, in the same flat style as the hero landscape.
 * All four share a 400×240 canvas so the cards line up.
 */

const W = 400;
const H = 240;

const hills = (seed: number, base: number, amp: number, sharp = 0.5) =>
  ridgePath({ seed, width: W, floor: H, base, amp, freq: 2.6, sharp, step: 10 });

function Sparkle({ x, y, r, fill = P.gold }: { x: number; y: number; r: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y})`}
      d={`M0,${-r} Q0,0 ${r},0 Q0,0 0,${r} Q0,0 ${-r},0 Q0,0 0,${-r} Z`}
      fill={fill}
    />
  );
}

function Pills({ x, y, s = 1, o = 0.9 }: { x: number; y: number; s?: number; o?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={P.cream} opacity={o}>
      <rect x="0" y="0" width="70" height="10" rx="5" />
      <rect x="18" y="-8" width="44" height="10" rx="5" />
      <rect x="30" y="8" width="60" height="10" rx="5" />
    </g>
  );
}

function Appointments() {
  const windows = [0, 1, 2, 3, 4, 5].flatMap((c) => [0, 1].map((r) => ({ x: 122 + c * 27, y: 126 + r * 26 })));
  return (
    <>
      <defs>
        <linearGradient id="sp-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FCE9D1" />
          <stop offset="1" stopColor="#F8CCA2" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#sp-a)" />
      <circle cx="322" cy="66" r="34" fill={P.coral} />
      <Pills x={228} y={96} s={0.9} />
      <path d={hills(3, 190, 110, 0.7)} fill="#C5DBCD" />
      <path d={hills(8, 206, 70)} fill={P.sage} />

      {/* the hospital */}
      <rect x="62" y="142" width="58" height="62" fill="#F1E6D2" />
      <rect x="280" y="142" width="58" height="62" fill="#F1E6D2" />
      <rect x="110" y="112" width="180" height="92" fill={P.cream} />
      <rect x="166" y="72" width="68" height="44" fill={P.cream} />
      <circle cx="200" cy="94" r="14" fill={P.jade} />
      <path d="M197,85 h6 v6 h6 v6 h-6 v6 h-6 v-6 h-6 v-6 h6 Z" fill={P.cream} />
      <g fill={P.sage}>
        {windows.map((w) => (
          <rect key={`${w.x}-${w.y}`} x={w.x} y={w.y} width="14" height="16" rx="3" />
        ))}
        <rect x="74" y="154" width="12" height="14" rx="3" />
        <rect x="96" y="154" width="12" height="14" rx="3" />
        <rect x="292" y="154" width="12" height="14" rx="3" />
        <rect x="314" y="154" width="12" height="14" rx="3" />
      </g>
      <rect x="186" y="176" width="28" height="28" rx="3" fill={P.jade} />
      <rect x="174" y="170" width="52" height="7" rx="3.5" fill={P.kapok} />

      <rect x="0" y="202" width={W} height="38" fill={P.jade} />
      <g fill={P.pine}>
        <circle cx="40" cy="186" r="20" />
        <rect x="37" y="196" width="6" height="14" />
        <circle cx="362" cy="190" r="16" />
        <rect x="359" y="198" width="6" height="12" />
      </g>

      {/* the appointment slip */}
      <g transform="translate(38 30) rotate(-8)">
        <rect x="2" y="4" width="66" height="62" rx="11" fill={P.ink} opacity="0.12" />
        <rect x="0" y="0" width="66" height="62" rx="11" fill="#FFFDF8" />
        <path d="M0,18 V11 A11,11 0 0 1 11,0 H55 A11,11 0 0 1 66,11 V18 Z" fill={P.kapok} />
        <path d="M19,40 l10,10 l19,-20" fill="none" stroke={P.jade} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  );
}

function Arrival() {
  return (
    <>
      <defs>
        <linearGradient id="sp-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DCEBDD" />
          <stop offset="1" stopColor="#FAE3C5" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#sp-b)" />
      <circle cx="104" cy="132" r="52" fill={P.coral} />
      <Pills x={22} y={52} />
      <Pills x={292} y={150} s={0.8} o={0.8} />
      <path d={hills(14, 206, 120, 0.8)} fill="#C5DBCD" />
      <path d={hills(21, 222, 100, 0.6)} fill={P.sage} />
      <path d={hills(28, 240, 80, 0.4)} fill={P.moss} />
      <path d="M-10,160 Q150,-6 292,74" fill="none" stroke="#FFFDF8" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="1 11" />
      <g transform="translate(306 82) rotate(26) scale(0.95)">
        <g fill={P.ink} opacity="0.12" transform="translate(3 5)">
          <path d="M-46,0 C-46,-7 -30,-8 20,-8 C38,-8 52,-4 52,0 C52,4 38,8 20,8 C-30,8 -46,7 -46,0 Z" />
          <path d="M8,-6 L-14,-52 L-26,-52 L-12,-6 Z M8,6 L-14,52 L-26,52 L-12,6 Z" />
        </g>
        <path d="M8,-6 L-14,-52 L-26,-52 L-12,-6 Z M8,6 L-14,52 L-26,52 L-12,6 Z" fill="#F1E6D2" />
        <path d="M-34,-6 L-46,-24 L-54,-24 L-46,-6 Z M-34,6 L-46,24 L-54,24 L-46,6 Z" fill={P.kapok} />
        <path d="M-46,0 C-46,-7 -30,-8 20,-8 C38,-8 52,-4 52,0 C52,4 38,8 20,8 C-30,8 -46,7 -46,0 Z" fill="#FFFDF8" />
        <path d="M36,-3 Q44,0 36,3" fill="none" stroke={P.jade} strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </>
  );
}

function Companion() {
  return (
    <>
      <defs>
        <linearGradient id="sp-c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E2EFE2" />
          <stop offset="1" stopColor="#BCD8C9" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#sp-c)" />
      <circle cx="200" cy="250" r="150" fill="#D3E6D8" />

      {/* two people, side by side */}
      <path d="M64,240 C64,196 96,170 138,170 C180,170 212,196 212,240 Z" fill={P.jade} />
      <circle cx="138" cy="128" r="33" fill="#FFF1DE" />
      <path d="M105,126 C104,100 122,90 140,90 C160,90 173,104 171,124 C158,122 146,112 140,104 C132,116 120,124 105,126 Z" fill={P.ink} />

      <path d="M196,240 C196,190 230,164 270,164 C310,164 344,190 344,240 Z" fill={P.kapok} />
      <circle cx="270" cy="122" r="33" fill="#FFF1DE" />
      <path d="M236,132 C232,98 250,82 272,82 C296,82 310,100 305,134 C300,118 292,108 282,102 C268,112 250,114 240,110 C238,118 237,126 236,132 Z" fill={P.bark} />

      {/* two languages */}
      <g>
        <path d="M30,24 h96 a20,20 0 0 1 20,20 v4 a20,20 0 0 1 -20,20 h-24 l-12,14 l0,-14 h-60 a20,20 0 0 1 -20,-20 v-4 a20,20 0 0 1 20,-20 Z" fill="#FFFDF8" />
        <text x="78" y="53" textAnchor="middle" fontSize="19" fontWeight="600" fill={P.ink} fontFamily="var(--font-geist), system-ui, sans-serif">
          Hello
        </text>
      </g>
      <g>
        <path d="M290,14 h72 a20,20 0 0 1 20,20 v4 a20,20 0 0 1 -20,20 h-44 l0,14 l-12,-14 h-16 a20,20 0 0 1 -20,-20 v-4 a20,20 0 0 1 20,-20 Z" fill={P.ink} />
        <text x="326" y="43" textAnchor="middle" fontSize="19" fontWeight="600" fill={P.cream} fontFamily="'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans SC', sans-serif">
          你好
        </text>
      </g>
    </>
  );
}

function Dental() {
  const rows = [0, 1, 2];
  return (
    <>
      <defs>
        <linearGradient id="sp-d" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FCE2D0" />
          <stop offset="1" stopColor="#F6C0A3" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#sp-d)" />
      <circle cx="146" cy="132" r="92" fill="#FDEEDC" />

      {/* a tooth */}
      <path
        d="M146,86 C132,74 100,76 98,108 C96,132 106,144 110,168 C113,186 118,202 127,202 C137,202 135,174 146,174 C157,174 155,202 165,202 C174,202 179,186 182,168 C186,144 196,132 194,108 C192,76 160,74 146,86 Z"
        fill={P.ink}
        opacity="0.1"
        transform="translate(5 7)"
      />
      <path
        d="M146,86 C132,74 100,76 98,108 C96,132 106,144 110,168 C113,186 118,202 127,202 C137,202 135,174 146,174 C157,174 155,202 165,202 C174,202 179,186 182,168 C186,144 196,132 194,108 C192,76 160,74 146,86 Z"
        fill="#FFFDF8"
      />
      <path d="M112,104 C113,94 120,88 130,88" fill="none" stroke={P.sage} strokeWidth="5" strokeLinecap="round" />
      <Sparkle x={214} y={62} r={16} />
      <Sparkle x={82} y={58} r={10} />
      <Sparkle x={232} y={96} r={7} fill={P.kapok} />

      {/* a checklist */}
      <g transform="translate(262 52) rotate(7)">
        <rect x="4" y="6" width="104" height="140" rx="13" fill={P.ink} opacity="0.12" />
        <rect x="0" y="0" width="104" height="140" rx="13" fill="#FFFDF8" />
        <rect x="32" y="-9" width="40" height="19" rx="7" fill={P.jade} />
        {rows.map((i) => (
          <g key={i} transform={`translate(0 ${38 + i * 32})`}>
            <circle cx="24" cy="8" r="9" fill={i < 2 ? P.jade : P.mist} />
            {i < 2 ? (
              <path d="M19.5,8 l3.2,3.4 l6,-6.6" fill="none" stroke="#FFFDF8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            ) : null}
            <rect x="42" y="4" width={i === 1 ? 36 : 48} height="8" rx="4" fill={P.sage} />
          </g>
        ))}
      </g>
    </>
  );
}

const scenes: Record<ServiceIconName, () => React.ReactElement> = {
  calendar: Appointments,
  plane: Arrival,
  comments: Companion,
  list: Dental,
};

export function Spot({ name, className }: { name: ServiceIconName; className?: string }) {
  const Scene = scenes[name];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <Scene />
    </svg>
  );
}
