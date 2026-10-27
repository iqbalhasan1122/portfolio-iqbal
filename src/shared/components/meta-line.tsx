import { cn } from "@/shared/lib/utils";

/** Small uppercase meta row: "Web / Real Estate". */
export function MetaLine({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn("mb-4 flex flex-wrap gap-2.5 text-[13px] font-semibold uppercase tracking-[.08em] text-muted", className)}>
      {items.map((t, i) => (
        <span key={t} className={i > 0 ? "before:mr-2.5 before:content-['·']" : undefined}>
          {t}
        </span>
      ))}
    </div>
  );
}
