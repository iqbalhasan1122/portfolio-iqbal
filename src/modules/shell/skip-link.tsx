"use client";

export function SkipLink() {
  return (
    <a
      href="#view"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("view")?.focus();
      }}
      className="fixed -top-20 left-4 z-[200] rounded-lg bg-accent px-[18px] py-3 font-bold text-ink transition-[top] duration-200 focus:top-3"
    >
      Skip to main content
    </a>
  );
}
