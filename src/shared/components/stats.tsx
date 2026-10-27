import { Star } from "lucide-react";
import { cn } from "@/shared/lib/utils";
const items = [
 { n: "2.5", dec: 1, sfx: "", label: "Years in UI/UX design" },
 { n: "150", dec: 0, sfx: "+", label: "Projects completed" },
 { n: "4.9", dec: 1, sfx: "/5", label: "Client rating" },
] as const;
export function Stats({ className }: { className?: string }) {
 return <dl className={cn("portfolio-stats",className)}>{items.map((s,i)=><div key={s.label} data-reveal="" className="portfolio-stat"><dt>{s.label}</dt><dd><b data-count={s.n} data-dec={s.dec} data-sfx={s.sfx}>{s.n}{s.sfx}</b></dd>{i===2?<span className="rating-stars" aria-label="Rated 4.9 out of 5">{Array.from({length:5},(_,n)=><Star key={n} size={16} fill="currentColor" strokeWidth={1.5}/>)}</span>:<span className="stat-caption">{i===0?'Thoughtful work, every day':'From first idea to final handoff'}</span>}<span className="stat-rule" aria-hidden="true" /></div>)}</dl>;
}
