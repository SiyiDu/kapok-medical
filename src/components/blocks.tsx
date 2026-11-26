import { cx, Row } from "./ui";

/** Small static blocks shared by the inner pages. Server-safe, like ui.tsx. */

/** A plain ruled list. Numbered in ink for what is included, a dash in stone for what is not. */
export function LedgerList({ items, numbered = false }: { items: string[]; numbered?: boolean }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((item, i) => (
        <li
          key={item}
          className={cx(
            "grid grid-cols-[2rem_1fr] items-baseline gap-x-4 py-5 text-lg first:pt-0 last:pb-0 sm:grid-cols-[2.5rem_1fr] sm:gap-x-6",
            numbered ? "text-ink" : "text-stone",
          )}
        >
          <span aria-hidden="true" className="text-sm text-stone tabular-nums">
            {numbered ? String(i + 1).padStart(2, "0") : "—"}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A named entry: a small label, the name in display serif, a note beneath. Mirrors the fee table.
 * The label stands beside the name only where the column is wide enough to keep a long name to two lines.
 */
export function InfoRow({ title, subtitle, children }: { title: string; subtitle?: string; children: string }) {
  return (
    <div className="grid items-baseline gap-x-8 gap-y-2 py-7 first:pt-0 last:pb-0 sm:max-lg:grid-cols-[8rem_1fr] xl:grid-cols-[8rem_1fr]">
      {subtitle ? <p className="eyebrow text-stone">{subtitle}</p> : null}
      <div className="flex flex-col gap-3 sm:max-lg:col-start-2 xl:col-start-2">
        <h3 className="display text-3xl leading-[1.06] tracking-[-0.012em] sm:text-4xl">{title}</h3>
        <p className="max-w-md text-stone">{children}</p>
      </div>
    </div>
  );
}

/** The emergency line on the contact page: a ruled note, set like the rows beside it. */
export function EmergencyNote() {
  return (
    <div role="note" className="border-t border-ink pt-6">
      <Row title="In an Emergency" as="h2">
        Don’t use this form. In mainland China, call <span className="text-ink tabular-nums">120</span>. Elsewhere,
        call your local emergency number.
      </Row>
    </div>
  );
}
