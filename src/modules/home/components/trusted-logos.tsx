"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { clientLogos } from "@/modules/site/config";
import { Section } from "@/shared/components/section";
import { motionPref } from "@/modules/motion/motion-preference";
export function TrustedLogos(){
 const track=useRef<HTMLDivElement>(null);
 useEffect(()=>{const tween=gsap.to(track.current,{xPercent:-50,duration:38,ease:"none",repeat:-1});const tick=()=>{tween.timeScale(motionPref.get()?0:1)};gsap.ticker.add(tick);return()=>{gsap.ticker.remove(tick);tween.kill()};},[]);
 return <Section id="logos" pal="light" aria-label="Selected teams and design projects" className="trusted-banner"><p>Trusted by teams. Chosen for thoughtful design.</p><div className="trusted-viewport"><div ref={track} className="trusted-track">{[0,1].map(set=><div key={set} className="trusted-set" aria-hidden={set===1?true:undefined}>{clientLogos.map(l=><span key={l.name} className="trusted-wordmark">{l.name}</span>)}</div>)}</div></div><span className="trusted-note">A selection of client work and independent product design studies</span></Section>;
}
