import { Brand } from "@/shared/components/brand";
import { nav, site } from "@/modules/site/config";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { MotionToggle } from "./motion-toggle";
import { TransitionLink } from "./transition-link";

export function Footer() {
  return (
    <footer data-sec="" data-pal="dark" className="relative border-t border-[#ffffff22] bg-deep px-[clamp(20px,7vw,132px)] pb-[22px] pt-9 text-white">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <TransitionLink href="/" aria-label="Iqbal Hasan / home" className="flex items-center gap-2.5 text-lg font-bold text-white no-underline">
          <Brand />
        </TransitionLink>
        <nav aria-label="Footer">
          <ul className="flex list-none flex-wrap gap-x-6 gap-y-0.5">
            {nav.map((n) => (
              <li key={n.href}>
                <TransitionLink href={n.href} className="inline-block py-2.5 font-medium text-white no-underline hover:underline">
                  {n.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-wrap items-center gap-4">
          <a href={`mailto:${site.email}`} className="font-medium text-white no-underline">
            {site.email}
          </a>
          <WhatsAppLink />
        </div>
      </div>
      <div className="mt-[22px] flex flex-wrap items-center justify-between gap-3.5 border-t border-[#ffffff22] pt-[18px] text-[15px] text-[#d3dcd7]">
        <span>© {site.year} {site.name}. All rights reserved.</span>
        <MotionToggle />
      </div>
    </footer>
  );
}
