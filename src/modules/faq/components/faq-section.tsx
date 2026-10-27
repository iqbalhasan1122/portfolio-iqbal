import { Heading } from "@/shared/components/heading";
import { Section } from "@/shared/components/section";
import { Tag } from "@/shared/components/tag";
import { FaqList } from "./faq-list";

interface FaqSectionProps {
  id: string;
  pal?: "light" | "soft";
  lines: string[];
  tag?: string;
}

export function FaqSection({ id, pal = "soft", lines, tag }: FaqSectionProps) {
  return (
    <Section pal={pal} aria-labelledby={id}>
      {tag && <Tag>{tag}</Tag>}
      <Heading id={id} lines={lines} />
      <FaqList />
    </Section>
  );
}
