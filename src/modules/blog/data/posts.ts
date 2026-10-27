import type { ImageKey } from '@/shared/assets/images';

export interface Post {
  id: string; title: string; cat: string; date: string; read: string; img: ImageKey; ex: string; body: string[];
}

export const posts: Post[] = [
  {
    id: "ux-audit-checklist",
    title: "A practical UX audit checklist for SaaS products",
    cat: "UX",
    date: "Oct 12, 2026",
    read: "6 min read",
    img: "oxton",
    ex: "The exact questions I ask in the first week of a redesign, and how to turn the answers into a prioritised roadmap.",
    body: ["A UX audit is not a list of opinions. It is a structured way to find where users lose time, trust or motivation, and to rank those problems by business impact.", "## Start with the goals", "Before opening any screen, write down the three outcomes the product must drive, such as activation, retention or revenue. Every finding later gets scored against these.", "## Walk the critical journeys", "Pick the two or three journeys that matter most and walk them as a new user would. Note every hesitation, dead end and unclear label.", "- Is the next action always obvious?", "- Can a keyboard-only user complete the task?", "- Does the interface explain errors in plain language?", "## Prioritise and share", "Score each issue by impact and effort, then present a short roadmap. Teams act on five clear fixes far more than on fifty observations."],
  },
  {
    id: "design-systems-small-teams",
    title: "Design systems for small teams: start small, scale smart",
    cat: "Design Systems",
    date: "Sep 28, 2026",
    read: "5 min read",
    img: "tandem",
    ex: "You do not need a hundred components. Here is the minimum system that keeps products consistent and fast to build.",
    body: ["Small teams often skip design systems because they sound expensive. In practice, a tiny system pays back within weeks.", "## The minimum viable system", "Start with colour tokens, a type scale, spacing and five components: button, input, card, modal and navigation. Document usage in one page.", "## Keep design and code in sync", "Name tokens the same in Figma and in code. When a name changes in one place, change it in the other the same day.", "- Audit what already exists", "- Consolidate duplicates", "- Document with real examples", "## Grow by need", "Add a component only when it appears in a third screen. This prevents a bloated library nobody trusts."],
  },
  {
    id: "accessible-by-default",
    title: "Accessible by default: WCAG habits every designer should have",
    cat: "Accessibility",
    date: "Sep 9, 2026",
    read: "7 min read",
    img: "plantZone",
    ex: "Contrast, focus states, labels and motion: small design decisions that make products usable for everyone.",
    body: ["Accessibility is a design quality, not a late-stage checklist. Building the habits early is cheaper and produces better products for all users.", "## Contrast and type", "Aim for at least 4.5:1 contrast for body text and 3:1 for large text and interface components. Never rely on colour alone to convey meaning.", "## Focus and keyboard", "Every interactive element needs a visible focus state and a logical tab order. Test your design by navigating with only the keyboard.", "## Respect motion", "Offer a way to reduce or pause animation, and honour the reduced-motion setting. Smooth does not have to mean constant.", "- Provide text alternatives for images", "- Label every form field visibly", "- Announce page changes to assistive tech"],
  },
  {
    id: "motion-that-converts",
    title: "Motion that helps: using animation without hurting conversion",
    cat: "Motion",
    date: "Aug 21, 2026",
    read: "4 min read",
    img: "playTennis",
    ex: "How to use scroll, depth and micro-interactions to guide attention while keeping pages fast and accessible.",
    body: ["Great motion explains what is happening and where to look next. Bad motion distracts, slows pages and excludes people.", "## Purposeful movement", "Use animation to show cause and effect: a card lifting on hover, a section revealing in order, a page transition that keeps context.", "## Performance first", "Animate transforms and opacity, keep scenes lightweight and test on mid-range phones. A smooth 60fps beats a spectacular 20fps.", "## Give people control", "Offer a pause or reduce-motion option and make sure nothing important depends on animation alone."],
  },
];

export const getPost = (id: string) => posts.find((p) => p.id === id);
