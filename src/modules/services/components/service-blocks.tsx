import { images } from "@/shared/assets/images";
import { ArrowUpRight } from "@/shared/components/icons";
import { ImageFrame } from "@/shared/components/image-frame";
import { Button } from "@/shared/ui/button";
import { TransitionLink } from "@/modules/shell/transition-link";
import { cn } from "@/shared/lib/utils";
import { services } from "../data/services";

/** Alternating image/text service rows with checklists. */
export function ServiceBlocks() {
  return (
    <>
      {services.map((s, i) => (
        <article key={s.title} className="grid grid-cols-2 items-center gap-[clamp(30px,6vw,90px)] border-t border-[#0e0e0d26] py-[clamp(36px,5vw,70px)] max-[900px]:grid-cols-1">
          <ImageFrame reveal src={images[s.img]} alt={s.project} fit="contain" className={cn("h-[min(46vw,440px)]", i % 2 && "order-2 max-[900px]:order-none")} />
          <div data-reveal="">
            <span className="text-3xl font-extrabold text-teal">0{i + 1}</span>
            <h2 className="mb-4 mt-3 text-[clamp(30px,3.4vw,50px)] font-bold leading-[1.15] tracking-[-.04em]">{s.title}</h2>
            <p className="text-lg leading-[1.6] text-muted">{s.desc}</p>
            <ul className="mb-[30px] mt-[22px] grid list-none gap-2.5">
              {s.items.map((x) => (
                <li key={x} className="border-l-2 border-accent pl-3">
                  {x}
                </li>
              ))}
            </ul>
            <Button asChild variant="dark" data-mag="">
              <TransitionLink href="/contact">
                Discuss this service <ArrowUpRight />
              </TransitionLink>
            </Button>
          </div>
        </article>
      ))}
    </>
  );
}
