import { Heading } from "./heading";
import { Section } from "./section";
import { Tag } from "./tag";

interface PageHeadProps {
  tag: string;
  lines: string[];
  lead: string;
}

/** Standard page header used by Work, About, Services, Blog and Contact. */
export function PageHead({ tag, lines, lead }: PageHeadProps) {
  return (
    <Section pal="light" st=".74,.12,.7" className="min-h-[62vh] pt-[calc(150px+env(safe-area-inset-top,0px))]">
      <Tag>{tag}</Tag>
      <Heading as="h1" lines={lines} tabIndex={-1} />
      <p data-reveal="" className="mt-[26px] max-w-[640px] text-[clamp(18px,1.6vw,24px)] leading-[1.55] text-muted">
        {lead}
      </p>
    </Section>
  );
}
