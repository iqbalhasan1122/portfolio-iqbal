import type { Metadata } from "next";
import { site } from "@/modules/site/config";
import { images } from "@/shared/assets/images";
import { Heading } from "@/shared/components/heading";
import { WhatsAppGlyph } from "@/shared/components/icons";
import { ImageFrame } from "@/shared/components/image-frame";
import { PageHead } from "@/shared/components/page-head";
import { Section } from "@/shared/components/section";
import { Button } from "@/shared/ui/button";
import { ContactForm } from "@/modules/contact/components/contact-form";
import { ContactPanel } from "@/modules/contact/components/contact-panel";
import { FaqSection } from "@/modules/faq/components/faq-section";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHead tag="Contact" lines={["Let’s talk about", "your project"]} lead="Tell me what you’re building. I reply within 24 hours and can sign an NDA on request." />
      <Section pal="dark" aria-label="Contact details and form" className="pt-[clamp(40px,5vw,70px)]">
        <ContactPanel>
          <div>
            <Heading lines={["Reach me directly"]} className="text-[clamp(30px,3.4vw,48px)]" />
            <ul className="mt-[26px] grid list-none gap-[22px] text-xl">
              <li>
                <span className="text-[13px] uppercase tracking-[.1em] text-[#a9bdb2]">Email</span>
                <br />
                <a href={`mailto:${site.email}`} className="underline">
                  {site.email}
                </a>
              </li>
              <li>
                <span className="text-[13px] uppercase tracking-[.1em] text-[#a9bdb2]">WhatsApp</span>
                <br />
                <Button asChild data-mag="" className="mt-2">
                  <a href={site.whatsapp} target="_blank" rel="noopener">
                    <WhatsAppGlyph size={22} /> Message me on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
              </li>
            </ul>
            <ImageFrame src={images.card} alt="Iqbal Hasan" className="mt-10 h-80 w-[min(320px,100%)]" sizes="320px" />
          </div>
          <ContactForm />
        </ContactPanel>
      </Section>
      <FaqSection id="fq3" lines={["Before you write"]} />
    </>
  );
}
