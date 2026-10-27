import * as React from "react";
import { cn } from "@/shared/lib/utils";

/** Background palette the 3D scene blends to while this section is in view. */
export type Palette = "hero" | "light" | "soft" | "green" | "dark";

interface SectionProps extends React.ComponentPropsWithoutRef<"section"> {
  pal?: Palette;
  /** Resting spot of the travelling 3D element: "x,y,scale" (x/y as fractions of the half viewport). */
  st?: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(function Section({ pal = "light", st, className, children, ...rest }, ref) {
  return (
    <section
      ref={ref}
      data-sec=""
      data-pal={pal}
      data-st={st}
      className={cn("relative px-[clamp(20px,7vw,132px)] py-[clamp(70px,8vw,130px)]", pal === "dark" && "text-white", className)}
      {...rest}
    >
      {children}
    </section>
  );
});
