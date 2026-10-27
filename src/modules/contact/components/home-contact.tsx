import { site } from "@/modules/site/config";
import { Heading } from "@/shared/components/heading";
import { WhatsAppGlyph } from "@/shared/components/icons";
import { Section } from "@/shared/components/section";
import { Tag } from "@/shared/components/tag";
import { Button } from "@/shared/ui/button";
import { ContactForm } from "./contact-form";
import { ContactPanel } from "./contact-panel";

/** Landing-page contact block: copy + direct links on the left, inquiry form on the right. */
export function HomeContact() {
  return (
    <Section pal="dark" aria-labelledby="ct2">
      <ContactPanel>
        <div>
          <Tag>Contact</Tag>
          <Heading id="ct2" lines={["Let’s discuss", "your project"]} className="text-[clamp(34px,4.4vw,64px)]" />
          <p data-reveal="" className="mt-[22px] max-w-[420px] text-[19px] leading-[1.6] text-[#d3dcd7]">
            Tell me what you’re building. I reply within 24 hours and can sign an NDA on request.
          </p>
          <ul className="mt-[30px] grid list-none gap-[22px] text-xl">
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
        </div>
        <ContactForm />
      </ContactPanel>
    </Section>
  );
}
