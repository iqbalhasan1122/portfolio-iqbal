import type { Metadata } from "next";
import { PageHead } from "@/shared/components/page-head";
import { Section } from "@/shared/components/section";
import { WorkGrid } from "@/modules/work/components/work-grid";
import { CtaSection } from "@/modules/contact/components/cta-section";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <PageHead tag="Selected work" lines={["Work that moves", "the needle"]} lead="A selection of my product, mobile, website and branding designs. Explore the design focus, approach and deliverables behind each project." />
      <Section pal="soft" aria-label="Projects" className="pt-5">
        <WorkGrid />
      </Section>
      <CtaSection />
    </>
  );
}
