import { site } from "@/modules/site/config";
import { ArrowUpRight } from "@/shared/components/icons";
import { Heading } from "@/shared/components/heading";
import { Section } from "@/shared/components/section";
import { Tag } from "@/shared/components/tag";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { Button } from "@/shared/ui/button";
import { TransitionLink } from "@/modules/shell/transition-link";

/** Closing call-to-action used on every inner page. */
export function CtaSection() {
  return (
    <Section pal="dark" aria-labelledby="ct" className="py-[clamp(90px,11vw,170px)]">
      <Tag>Let’s work together</Tag>
      <Heading id="ct" lines={["Have a project in mind?", "Let’s make it real."]} className="text-[clamp(40px,7vw,104px)]" />
      <div data-reveal="" className="mt-[38px] flex flex-wrap items-center gap-3">
        <Button asChild data-mag="">
          <TransitionLink href="/contact">
            Start a project <ArrowUpRight />
          </TransitionLink>
        </Button>
        <Button asChild variant="ghostInverse" data-mag="">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </Button>
        <WhatsAppLink />
      </div>
    </Section>
  );
}
