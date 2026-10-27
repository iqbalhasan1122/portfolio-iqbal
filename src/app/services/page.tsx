import type { Metadata } from "next";
import { PageHead } from "@/shared/components/page-head";
import { Section } from "@/shared/components/section";
import { ServiceBlocks } from "@/modules/services/components/service-blocks";
import { ProcessSection } from "@/modules/process/components/process-panel";
import { FaqSection } from "@/modules/faq/components/faq-section";
import { CtaSection } from "@/modules/contact/components/cta-section";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHead tag="Services" lines={["Design and build,", "end to end"]} lead="Everything you need to research, design and launch a product / from a single landing page to a full design system." />
      <Section pal="light" aria-label="Service list" className="pt-5">
        <ServiceBlocks />
      </Section>
      <ProcessSection id="pc3" pal="soft" />
      <FaqSection id="fq2" pal="light" tag="FAQ" lines={["Common questions"]} />
      <CtaSection />
    </>
  );
}
