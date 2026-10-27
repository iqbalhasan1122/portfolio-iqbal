import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border-[1.5px] border-transparent px-[26px] py-3.5 text-base font-semibold no-underline transition-colors duration-300 [&>svg:not(.ar)]:size-[22px] [&>svg:not(.ar)]:flex-none [&>svg.ar]:size-4 [&>svg.ar]:flex-none [&>svg.ar]:transition-transform hover:[&>svg.ar]:-translate-y-0.5 hover:[&>svg.ar]:translate-x-0.5",
  {
    variants: {
      variant: {
        default: "bg-accent text-ink hover:bg-[#7be9ab]",
        dark: "bg-brand text-white hover:bg-accent hover:text-ink",
        ghost: "border-current bg-transparent hover:bg-ink hover:text-white",
        ghostInverse: "border-current bg-transparent text-white hover:bg-white hover:text-ink",
        glass: "border-[#2a6b47] bg-[#123d28] text-white hover:border-accent hover:bg-accent hover:text-ink",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
