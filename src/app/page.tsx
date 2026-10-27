import type { Metadata } from "next";
import { Hero } from "@/modules/home/components/hero";
import { TrustedLogos } from "@/modules/home/components/trusted-logos";
import { IntroSection } from "@/modules/home/components/intro-section";
import { ServicesPreview } from "@/modules/home/components/services-preview";
import { FeaturedWork } from "@/modules/home/components/featured-work";
import { WhySection } from "@/modules/home/components/why-section";
import { TestimonialsSection } from "@/modules/testimonials/components/testimonials-section";
import { ProcessSection } from "@/modules/process/components/process-panel";
import { FaqSection } from "@/modules/faq/components/faq-section";
import { HomeContact } from "@/modules/contact/components/home-contact";

export const metadata: Metadata = { title: "UI/UX Designer & Developer" };

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedLogos />
      <IntroSection />
      <ServicesPreview />
      <FeaturedWork />
      <ProcessSection id="pr" pal="light" />
      <WhySection />
      <TestimonialsSection />
      <FaqSection id="fq" tag="FAQ" lines={["Your questions,", "answered"]} />
      <HomeContact />
    </>
  );
}
