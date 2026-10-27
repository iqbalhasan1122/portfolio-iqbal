"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { navigateWithTransition } from "./page-transition";

/** next/link that plays the green wipe transition before navigating. */
export function TransitionLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || props.target === "_blank") return;
        e.preventDefault();
        const to = typeof href === "string" ? href : href.pathname ?? "/";
        if (to === pathname) return;
        navigateWithTransition(to);
      }}
      {...props}
    />
  );
}
