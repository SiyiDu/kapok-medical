import { site } from "@/site.config";

/** Five-petal kapok flower in the accent colour. */
export function LogoMark({ className, heart = "fill-background" }: { className?: string; heart?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="16"
          cy="8.6"
          rx="4.3"
          ry="6.6"
          transform={`rotate(${angle} 16 16)`}
          fill="currentColor"
        />
      ))}
      <circle cx="16" cy="16" r="2.7" className={heart} />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2">
      <LogoMark className="size-6 text-accent" />
      <span className="font-display text-2xl leading-none">{site.name}</span>
    </span>
  );
}
