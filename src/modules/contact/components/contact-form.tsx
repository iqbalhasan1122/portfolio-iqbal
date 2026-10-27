"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { ArrowUpRight } from "@/shared/components/icons";

const budgets = ["Less than $5k", "$5k - $10k", "$10k - $20k", "$20k - $50k", "More than $50k"];
const err = "mt-1.5 min-h-0 text-sm text-[#ffb4a8]";

interface Errors {
  name?: string;
  email?: string;
  details?: string;
}

/** Accessible project-inquiry form (labels, aria-invalid, live errors, success status). */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [budget, setBudget] = useState(budgets[1]);
  const ok = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (sent) ok.current?.focus();
  }, [sent]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const data = new FormData(f);
    const next: Errors = {};
    if (String(data.get("n") ?? "").trim().length <= 1) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("e") ?? ""))) next.email = "Please enter a valid email address.";
    if (String(data.get("d") ?? "").trim().length <= 5) next.details = "Please tell me a little about your project.";
    setErrors(next);
    const first = next.name ? "f1" : next.email ? "f2" : next.details ? "f4" : null;
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    setSent(true);
    f.reset();
    setBudget(budgets[1]);
  };

  return (
    <form id="cf" noValidate aria-label="Project inquiry" onSubmit={onSubmit}>
      <Label htmlFor="f1">Full name *</Label>
      <Input id="f1" name="n" type="text" autoComplete="name" placeholder="e.g. Alex Morgan" required aria-describedby="e1" aria-invalid={!!errors.name} />
      <p id="e1" role="alert" className={err}>{errors.name}</p>

      <Label htmlFor="f2">Your email *</Label>
      <Input id="f2" name="e" type="email" autoComplete="email" placeholder="you@company.com" required aria-describedby="e2" aria-invalid={!!errors.email} />
      <p id="e2" role="alert" className={err}>{errors.email}</p>

      <fieldset className="m-0 border-0 p-0">
        <legend className="mt-[22px] block text-xl font-semibold text-white">Project budget</legend>
        <RadioGroup name="b" value={budget} onValueChange={setBudget} className="mb-2 mt-3.5 flex flex-wrap gap-2.5">
          {budgets.map((b) => (
            <label key={b} className="block cursor-pointer text-[15px] font-medium text-white">
              <RadioGroupItem value={b} />
              <span className="inline-flex min-h-11 items-center rounded-lg border-[1.5px] border-white px-3.5 py-2 transition-all duration-300 peer-focus-visible:shadow-[0_0_0_3px_#fff,0_0_0_6px_#063b26] peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent peer-data-[state=checked]:text-ink">
                {b}
              </span>
            </label>
          ))}
        </RadioGroup>
      </fieldset>

      <Label htmlFor="f4">Project details *</Label>
      <Textarea id="f4" name="d" rows={3} placeholder="Tell me about your goals, timeline and product…" required aria-describedby="e4" aria-invalid={!!errors.details} />
      <p id="e4" role="alert" className={err}>{errors.details}</p>

      <Button type="submit" className="mt-7">
        Send inquiry <ArrowUpRight />
      </Button>
      <p ref={ok} id="ok" role="status" tabIndex={-1} className={sent ? "mt-[22px] block rounded-[10px] bg-[#1f9d55] p-4 font-semibold text-white" : "hidden"}>
        Thank you! Your inquiry was received. Expect a reply within 24 hours.
      </p>
    </form>
  );
}
