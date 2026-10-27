"use client";
import { Brand } from "@/shared/components/brand";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/modules/site/config";
import { scroller } from "@/modules/motion/smooth-scroll";
import { Button } from "@/shared/ui/button";
import { ArrowUpRight } from "@/shared/components/icons";
import { TransitionLink } from "./transition-link";

const isActive = (pathname: string, href: string) => "/" + (pathname.split("/")[1] ?? "") === href;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    open ? scroller.stop() : scroller.start();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        document.getElementById("mb")?.focus();
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        id="nav"
        className="fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-[100] flex items-center justify-between gap-5 border-b border-[#ffffff1a] bg-[rgba(4,18,11,.76)] px-[clamp(20px,7vw,132px)] py-3 backdrop-blur-[16px]"
      >
        <TransitionLink href="/" aria-label="Iqbal Hasan / home" className="flex items-center gap-2.5 text-lg font-bold text-white no-underline">
          <Brand />
        </TransitionLink>
        <nav aria-label="Primary" className="max-[900px]:hidden">
          <ul className="flex list-none gap-1.5">
            {nav.map((n) => (
              <li key={n.href}>
                <TransitionLink
                  href={n.href}
                  aria-current={isActive(pathname, n.href) ? "page" : undefined}
                  className="block rounded-full px-3.5 py-2.5 font-medium text-[#e3efe8] no-underline transition-colors duration-300 hover:bg-[#ffffff14] aria-[current=page]:bg-[#123d28] aria-[current=page]:text-white"
                >
                  {n.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild variant="glass" className="max-[900px]:hidden">
          <TransitionLink href="/contact">
            Book a call <ArrowUpRight />
          </TransitionLink>
        </Button>
        <button
          id="mb"
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="hidden size-12 rounded-xl border border-[#2a6b47] bg-[#123d28] text-white max-[900px]:block"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="mx-auto size-[22px]">
            <path d={open ? "M5 5l14 14M19 5L5 19" : "M4 7h16M4 12h16M4 17h16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </button>
      </header>
      <div
        id="menu"
        role="dialog"
        aria-label="Menu"
        aria-modal="true"
        onClick={(e) => (e.target as Element).closest("a") && setOpen(false)}
        className={`fixed inset-0 z-[99] flex-col justify-center gap-1.5 bg-ink px-7 pb-10 pt-[100px] text-white ${open ? "flex" : "hidden"}`}
      >
        {nav.map((n) => (
          <TransitionLink
            key={n.href}
            href={n.href}
            aria-current={isActive(pathname, n.href) ? "page" : undefined}
            className="py-1.5 text-[clamp(34px,10vw,56px)] font-semibold no-underline aria-[current=page]:text-accent"
          >
            {n.label}
          </TransitionLink>
        ))}
      </div>
    </>
  );
}
