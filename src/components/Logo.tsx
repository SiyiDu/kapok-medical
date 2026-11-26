import { site } from "@/site.config";

/** Five-petal kapok flower. The one place the brand red appears. */
export function LogoMark({ className, heart = "fill-ivory" }: { className?: string; heart?: string }) {
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

/** Flower and name. The name takes the surrounding text colour, so it works on paper and on photographs. */
export function Wordmark({ className = "text-[1.75rem]" }: { className?: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="size-5 text-kapok" />
      <span className={`display leading-none tracking-[-0.01em] ${className}`}>{site.name}</span>
    </span>
  );
}
