import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { fieldClass } from "./input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea className={cn(fieldClass, "resize-y", className)} ref={ref} {...props} />
));
Textarea.displayName = "Textarea";

export { Textarea };
