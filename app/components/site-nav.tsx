"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/visit", label: "Visit Us" },
  { href: "/contact", label: "Contact" },
  { href: "/ask", label: "Ask Sakura" },
];

/** Blossom pink marks the page you are on — a rule under the link on desktop,
 * beside it on mobile. Hover and focus borrow the same mark, so the vocabulary
 * for "this one" is the same whether you are pointing at it or standing on it. */
const MARK = "#E8D5D2";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8D5D2]";

function useIsActive() {
  const pathname = usePathname();

  return (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function SiteNav() {
  const isActive = useIsActive();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      // Escape should leave the keyboard where it started, not at the top of the page.
      toggleRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-black text-white">
      <div className="nav-shell flex items-center justify-between gap-4 py-4 md:py-6">
        {/* Desktop: links lead, wordmark closes. Unchanged from the original layout. */}
        <div className="hidden font-serif md:flex md:gap-10 md:text-2xl">
          {LINKS.map(({ href, label }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group relative rounded-sm py-1 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${FOCUS_RING} ${
                  active ? "" : "opacity-80 hover:opacity-100"
                }`}
              >
                {label}
                <span
                  aria-hidden
                  style={{ backgroundColor: MARK }}
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile: the wordmark leads instead, so the brand is the first thing read. */}
        <Link
          href="/"
          className={`rounded-sm font-serif text-xl md:text-3xl ${FOCUS_RING}`}
        >
          Sakura Bloom Matcha
        </Link>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((previous) => !previous)}
          aria-expanded={open}
          aria-controls="site-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          // Sized in px, not rem: the root `font-size: 80%` and `zoom: 0.9` in
          // globals.css shrink rem-based boxes, which took an h-11 target down
          // to 32px on device. 49 × 0.9 lands on the 44px minimum.
          className={`relative -mr-2 flex h-[49px] w-[49px] shrink-0 items-center justify-center rounded-sm md:hidden ${FOCUS_RING}`}
        >
          <span
            aria-hidden
            className={`absolute h-px w-6 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              open ? "rotate-45" : "-translate-y-1"
            }`}
          />
          <span
            aria-hidden
            className={`absolute h-px w-6 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              open ? "-rotate-45" : "translate-y-1"
            }`}
          />
        </button>
      </div>

      {/* Tapping the page behind the panel is a way of saying "never mind". */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        // Sits behind the bar rather than below it, so nothing has to guess the
        // bar's height. The bar is opaque, so the covered part never shows.
        className={`fixed inset-0 -z-10 cursor-default bg-black/50 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="site-nav-panel"
        // Hidden from assistive tech and from tab order when closed, so the
        // panel cannot be reached by keyboard while it is invisible.
        inert={open ? undefined : true}
        className={`absolute left-0 top-full w-full origin-top overflow-hidden border-b border-[#E8D5D2]/15 bg-[#1F1814] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:hidden ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <ul className="nav-shell py-2">
          {LINKS.map(({ href, label }, index) => {
            const active = isActive(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  // Choosing a destination answers the menu's question, so it closes.
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${80 + index * 45}ms` : "0ms" }}
                  className={`group flex items-center gap-4 rounded-sm py-4 font-serif text-2xl transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:translate-x-0 ${FOCUS_RING} ${
                    open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                  }`}
                >
                  <span
                    aria-hidden
                    style={{ backgroundColor: MARK }}
                    className={`h-7 w-0.5 origin-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                      active ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                    }`}
                  />
                  <span className={active ? "" : "text-white/85"}>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
