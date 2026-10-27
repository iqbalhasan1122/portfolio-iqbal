import { cn } from "@/shared/lib/utils";

type Line = string | { text: string; className?: string };

interface HeadingProps {
  as?: "h1" | "h2";
  lines: Line[];
  id?: string;
  className?: string;
  tabIndex?: number;
}

/** Display heading whose lines are revealed one by one by the page-motion layer. */
export function Heading({ as: Tag = "h2", lines, id, className, tabIndex }: HeadingProps) {
  return (
    <Tag id={id} tabIndex={tabIndex} className={cn("text-[clamp(38px,5.6vw,80px)] font-semibold leading-[1.15] tracking-[-.04em]", className)}>
      {lines.map((line) => {
        const { text, className: lineClass } = typeof line === "string" ? { text: line, className: undefined } : line;
        return (
          <span key={text} className="block overflow-hidden pb-[.1em]">
            <span data-line="" className={cn("block", lineClass)}>
              {text}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
