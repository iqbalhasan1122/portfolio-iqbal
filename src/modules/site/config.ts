export const site = {
  name: 'Iqbal Hasan',
  email: 'uiuxriaz@gmail.com',
  whatsapp: 'https://wa.me/8801860702149',
  year: 2026,
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

/** Names from the actual Figma portfolio. Design studies are included, without implying a client relationship. */
export const clientLogos = [
 { name: "Pure Bullion" }, { name: "Oxton" }, { name: "Tandem" }, { name: "Play Tennis" }, { name: "Plant Zone" }, { name: "MojoBlend" }, { name: "Spirit Wise" },
] as const;
