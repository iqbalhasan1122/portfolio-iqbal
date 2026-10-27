import { cn } from "@/shared/lib/utils";

/** Dark rounded two-column panel that holds the contact details + form. */
export function ContactPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-14 rounded-[28px] bg-deep p-[clamp(24px,4vw,56px)] text-white max-[900px]:grid-cols-1", className)}>{children}</div>
  );
}
