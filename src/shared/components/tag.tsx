import { cn } from "@/shared/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      data-reveal=""
      className={cn(
        "mb-6 inline-flex items-center gap-2.5 text-base font-semibold uppercase tracking-[.06em] before:size-[30px] before:animate-spin-slow before:rounded-full before:border before:border-dashed before:border-[#1fa75a] before:bg-[radial-gradient(circle,#1fa75a_3px,transparent_4px)] before:content-['']",
        className
      )}
    >
      {children}
    </div>
  );
}
