"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";
import { services } from "@/modules/services/data/services";
import { images } from "@/shared/assets/images";
import { Heading } from "@/shared/components/heading";
import { Section } from "@/shared/components/section";
import { Tag } from "@/shared/components/tag";
import { TransitionLink } from "@/modules/shell/transition-link";
import { ArrowUpRight } from "@/shared/components/icons";
export function ServicesPreview(){
 const [open,setOpen]=useState<number|null>(null);
 useEffect(()=>{const frame=requestAnimationFrame(()=>ScrollTrigger.refresh());return()=>cancelAnimationFrame(frame)},[open]);
 return <Section pal="dark" aria-labelledby="sv" className="service-section"><Tag>Services</Tag><Heading id="sv" lines={["What I can do","for your business"]}/><p data-reveal="" className="section-intro light">From a single screen to a complete product, I help you make the next design decision with confidence.</p><div className="service-list">{services.map((s,i)=><article key={s.title} data-reveal="" className={`service-preview ${open===i?'is-open':''}`} onPointerEnter={e=>{if(e.pointerType!=="touch")setOpen(i)}} onPointerLeave={e=>{if(e.pointerType!=="touch")setOpen(null)}} onFocus={e=>{if(e.target.matches(":focus-visible"))setOpen(i)}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(null)}}><span className="service-number">{String(i+1).padStart(2,'0')}</span><div className="service-copy"><button type="button" aria-expanded={open===i} aria-controls={`service-panel-${i}`} onClick={e=>{if(e.detail>0&&window.matchMedia("(hover: hover)").matches)setOpen(i);else setOpen(open===i?null:i)}} className="service-trigger"><h3>{s.title}</h3>{open===i?<Minus size={22}/>:<Plus size={22}/>}</button><div id={`service-panel-${i}`} className="service-description" aria-hidden={open!==i}><p>{s.desc}</p><TransitionLink tabIndex={open===i?0:-1} href="/services">Explore this service <ArrowUpRight/></TransitionLink></div></div><div className="service-art" aria-hidden="true"><div className={`service-art-frame ${s.img==='spiritWise'?'is-mobile':''}`}><Image src={images[s.img]} alt="" sizes="(max-width:760px) 80vw, 32vw"/><span>{s.project}</span></div></div></article>)}</div></Section>;
}
