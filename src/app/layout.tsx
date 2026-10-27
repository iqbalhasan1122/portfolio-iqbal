import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SceneCanvas } from "@/modules/scene/SceneCanvas";
import { SmoothScroll } from "@/modules/motion/smooth-scroll";
import { PageMotion } from "@/modules/motion/page-motion";
import { Preloader } from "@/modules/shell/preloader";
import { Cursor } from "@/modules/shell/cursor";
import { SkipLink } from "@/modules/shell/skip-link";
import { Header } from "@/modules/shell/header";
import { Footer } from "@/modules/shell/footer";
import { PageTransition } from "@/modules/shell/page-transition";

export const metadata: Metadata = {
  icons: { icon: "/brand/iqbal-mark.svg" },
  title: { default: "Iqbal Hasan / UI/UX Designer & Developer", template: "%s / Iqbal Hasan" },
  description: "Iqbal Hasan / UI/UX designer and developer crafting AI-powered products and high-converting websites.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <style>{"#pre{display:none!important}"}</style>
        </noscript>
        <SmoothScroll />
        <SkipLink />
        <Preloader />
        <Cursor />
        <PageTransition />
        <SceneCanvas />
        <Header />
        <main id="view" tabIndex={-1} className="relative z-[2] outline-none">
          {children}
          <Footer />
        </main>
        <PageMotion />
      </body>
    </html>
  );
}
