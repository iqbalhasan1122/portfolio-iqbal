"use client";

import { faqs } from "@/modules/faq/data/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";

export function FaqList() {
  return (
    <Accordion type="multiple" className="mt-11 w-full rounded-[28px] border border-[#0e0e0d1a] bg-white px-[clamp(20px,4vw,64px)] py-[clamp(6px,1.5vw,18px)]">
      {faqs.map((f, i) => (
        <AccordionItem key={f.q} value={`faq-${i}`} data-reveal="">
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
