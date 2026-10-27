import { cn } from "@/shared/lib/utils";
export function Brand({ className }: { className?: string }) {
  return <span className={cn("brand-lockup", className)}><img src="/brand/iqbal-mark.svg" width="44" height="44" alt="" /><span>Iqbal Hasan<small>UI/UX DESIGNER</small></span></span>;
}
