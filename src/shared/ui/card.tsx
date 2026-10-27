import * as React from "react";
import { cn } from "@/shared/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-tilt=""
    className={cn("rounded-[20px] border border-[#0e0e0d1f] bg-white p-[26px] transition-[transform,box-shadow] duration-500 hover:-translate-y-2 hover:shadow-[0_18px_40px_#0e0e0d14]", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("mb-2 mt-[22px] text-xl font-semibold", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("leading-[1.55] text-muted", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export { Card, CardTitle, CardDescription };
