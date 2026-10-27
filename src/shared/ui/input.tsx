import * as React from "react";
import { cn } from "@/shared/lib/utils";

const fieldClass =
  "min-h-12 w-full border-0 border-b-[1.5px] border-white bg-transparent px-1.5 py-3.5 text-[17px] font-medium text-white outline-none placeholder:text-[#cdd6d1] focus-visible:rounded-none focus-visible:border-accent focus-visible:shadow-[0_2px_0_#34d27b]";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input type={type} className={cn(fieldClass, className)} ref={ref} {...props} />
));
Input.displayName = "Input";

export { Input, fieldClass };
