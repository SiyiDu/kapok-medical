/**
 * Small deterministic helpers for the illustrations. Everything is seeded,
 * so the artwork is identical on every build and safe to render on the server.
 */

export const P = {
  paper: "#F7F0E3",
  cream: "#FFF8EC",
  peach: "#FBDDBD",
  apricot: "#F5B98C",
  coral: "#EE7A52",
  kapok: "#D9482B",
  kapokDeep: "#A8301A",
  gold: "#F0B955",
  mist: "#D8E8DD",
  sage: "#A9C9BA",
  moss: "#72A696",
  jade: "#3F8172",
  pine: "#1F5248",
  ink: "#12302B",
  bark: "#3A2620",
} as const;

/** Round to one decimal so server and client always print the same number. */
export const r1 = (n: number) => Math.round(n * 10) / 10;

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function noise1d(seed: number) {
  const rand = rng(seed);
  const vals = Array.from({ length: 256 }, () => rand());
  return (x: number) => {
    const i = Math.floor(x);
    const f = x - i;
    const a = vals[((i % 256) + 256) % 256];
    const b = vals[(((i + 1) % 256) + 256) % 256];
    return a + (b - a) * f * f * (3 - 2 * f);
  };
}

export const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

type RidgeOptions = {
  seed: number;
  width: number;
  /** Bottom edge the shape is closed against. */
  floor: number;
  /** Y of the ridge where the noise is zero. */
  base: number;
  /** How far the noise can lift the ridge above `base`. */
  amp: number;
  /** Noise cycles across the width. */
  freq?: number;
  /** 0 = rolling hills, 1 = pointed peaks. */
  sharp?: number;
  step?: number;
  /** Scales the lift along the width, t in 0..1. */
  envelope?: (t: number) => number;
};

/** A closed mountain silhouette as an SVG path. */
export function ridgePath({
  seed,
  width,
  floor,
  base,
  amp,
  freq = 3,
  sharp = 0.5,
  step = 16,
  envelope,
}: RidgeOptions) {
  const n = noise1d(seed);
  const pts: Array<[number, number]> = [];
  for (let x = -step; x <= width + step; x += step) {
    const t = x / width;
    let v = 0;
    let a = 1;
    let f = freq;
    let norm = 0;
    for (let k = 0; k < 4; k++) {
      let s = n(t * f + k * 37.1);
      if (k < 2) s = s + (1 - Math.abs(2 * s - 1) - s) * sharp;
      v += s * a;
      norm += a;
      a *= 0.5;
      f *= 2.1;
    }
    v /= norm;
    const env = envelope ? envelope(Math.min(1, Math.max(0, t))) : 1;
    pts.push([x, base - v * amp * env]);
  }
  let d = `M${pts[0][0]},${floor} L${pts[0][0]},${r1(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q${pts[i][0]},${r1(pts[i][1])} ${mx},${r1(my)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L${last[0]},${r1(last[1])} L${last[0]},${floor} Z`;
  return d;
}
