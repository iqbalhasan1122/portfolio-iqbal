import type { Metadata } from "next";
import { PageHead } from "@/shared/components/page-head";
import { Section } from "@/shared/components/section";
import { Stats } from "@/shared/components/stats";
import { AboutStory } from "@/modules/about/components/about-story";
import { Principles } from "@/modules/about/components/principles";
import { ProcessSection } from "@/modules/process/components/process-panel";
import { CtaSection } from "@/modules/contact/components/cta-section";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>

    
      <PageHead tag="About me" lines={["Designing with", "purpose"]} lead="I’m Iqbal Hasan, a UI/UX designer with 2.5 years of experience and more than 150 completed projects across websites, mobile apps and digital products." />
      <AboutStory />
      <Section pal="light" aria-label="Numbers">
        <Stats className="mt-0" />
      </Section>
      <Principles />
      <ProcessSection id="pc2" pal="soft" />
      <CtaSection />
    </>
  );
}
