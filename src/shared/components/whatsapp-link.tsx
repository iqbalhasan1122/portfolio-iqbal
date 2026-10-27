import { site } from "@/modules/site/config";
import { WhatsAppGlyph } from "./icons";
import { cn } from "@/shared/lib/utils";

/** Round WhatsApp icon button / links to a chat without printing the number. */
export function WhatsAppLink({ className }: { className?: string }) {
  return (
    <a
      data-mag=""
      href={site.whatsapp}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp (opens in a new tab)"
      className={cn("inline-grid size-[52px] place-items-center rounded-full bg-[#128c4a] text-white no-underline", className)}
    >
      <WhatsAppGlyph />
    </a>
  );
}
