import { ArrowUpRight } from "@/shared/components/icons";
import { Section } from "@/shared/components/section";
import { Stats } from "@/shared/components/stats";
import { Tag } from "@/shared/components/tag";
import { Button } from "@/shared/ui/button";
import { TransitionLink } from "@/modules/shell/transition-link";

export function IntroSection() {
  return (
    <Section pal="light" aria-labelledby="ab">
      <Tag>About me</Tag>
      <h2 id="ab" className="sr-only">
        About me
      </h2>
      <p data-reveal="" className="max-w-[1150px] text-[clamp(28px,4.2vw,64px)] font-semibold leading-[1.2] tracking-[-.035em]">
        I design and build <em className="signature-underline not-italic">clear, accessible<svg viewBox="0 0 440 20" preserveAspectRatio="none" aria-hidden="true"><path d="M3 12C115 5 268 5 382 10c17 1 31 5 48 3"/></svg></em> digital products that feel easy to use. From the first user flow to a polished, consistent interface.
      </p>
      <Stats />
      <div className="mt-14">
        <Button asChild variant="dark" data-mag="" data-reveal="">
          <TransitionLink href="/about">
            More about me <ArrowUpRight />
          </TransitionLink>
        </Button>
      </div>
    </Section>
  );
}
