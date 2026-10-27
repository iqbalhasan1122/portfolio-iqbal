import { cn } from "@/shared/lib/utils";
import { TransitionLink } from "@/modules/shell/transition-link";
import { ArrowUpRight } from "./icons";

interface ListRowProps {
  index: number;
  title: string;
  desc: string;
  href?: string;
}

const row =
  "grid grid-cols-[70px_minmax(0,1fr)_minmax(0,1.3fr)_48px] items-center gap-6 border-t border-[#ffffff33] py-[30px] text-white no-underline max-[900px]:grid-cols-[44px_1fr_32px]";

/** Numbered dark list row (services preview, principles). Becomes a link when `href` is set. */
export function ListRow({ index, title, desc, href }: ListRowProps) {
  const body = (
    <>
      <span className="text-[15px] font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="text-[clamp(24px,2.8vw,40px)] font-semibold tracking-[-.03em]">{title}</h3>
      <p className="leading-[1.55] text-[#d3dcd7] max-[900px]:hidden">{desc}</p>
      {href ? <i className="inline-grid place-items-center not-italic transition-transform [transition-duration:400ms] group-hover/row:-translate-y-1 group-hover/row:translate-x-1 group-focus-visible/row:-translate-y-1 group-focus-visible/row:translate-x-1"><ArrowUpRight className="!size-7" /></i> : <i aria-hidden="true" />}
    </>
  );
  return (
    <li className="[&:last-child>*]:border-b [&:last-child>*]:border-b-[#ffffff33]">
      {href ? (
        <TransitionLink
          href={href}
          data-reveal=""
          className={cn(row, "group/row transition-[padding,background] duration-500 [transition-timing-function:cubic-bezier(.16,1,.3,1)] hover:bg-[#ffffff12] hover:px-[18px] focus-visible:bg-[#ffffff12] focus-visible:px-[18px]")}
        >
          {body}
        </TransitionLink>
      ) : (
        <div data-reveal="" className={row}>
          {body}
        </div>
      )}
    </li>
  );
}
