import { projects } from "@/modules/work/data/projects";
import { WorkCard } from "@/modules/work/components/work-card";
import { ArrowUpRight } from "@/shared/components/icons";
import { Heading } from "@/shared/components/heading";
import { Section } from "@/shared/components/section";
import { Tag } from "@/shared/components/tag";
import { Button } from "@/shared/ui/button";
import { TransitionLink } from "@/modules/shell/transition-link";

export function FeaturedWork() {
  return (
    <Section pal="soft" aria-labelledby="fw">
      <Tag>Selected work</Tag>
      <Heading id="fw" lines={["Selected work.", "Thoughtfully designed."]} />
      <div className="mt-14 grid grid-cols-[repeat(auto-fill,minmax(min(100%,420px),1fr))] gap-x-8 gap-y-11">
        {projects.slice(0, 4).map((p) => (
          <WorkCard key={p.id} project={p} />
        ))}
      </div>
      <div className="mt-14">
        <Button asChild variant="dark" data-mag="">
          <TransitionLink href="/work">
            See all work <ArrowUpRight />
          </TransitionLink>
        </Button>
      </div>
    </Section>
  );
}
