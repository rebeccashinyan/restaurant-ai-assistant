"use client";

import { useEffect, useRef, useState } from "react";

export type FadeUpVariant = "text" | "heading" | "image" | "fadeIn" | "heroReveal";

/** Editorial stagger offsets (ms) — use with the `delay` prop */
export const FADE_UP_STAGGER = {
  afterHeading: 140,
  betweenParagraphs: 100,
  imageAfterText: 200,
} as const;

type FadeUpProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay after the element enters view (ms) */
  delay?: number;
  variant?: FadeUpVariant;
};

/** Calm luxury ease — slow start, soft landing (Aesop / Apple–style) */
const EASE_PREMIUM = "cubic-bezier(0.16, 1, 0.3, 1)";

const VARIANTS: Record<
  FadeUpVariant,
  {
    offsetHidden: string;
    durationMs: number;
    threshold: number;
    rootMargin: string;
  }
> = {
  heading: {
    offsetHidden: "translate-y-20",
    durationMs: 1050,
    threshold: 0.15,
    rootMargin: "0px 0px -22% 0px",
  },
  text: {
    offsetHidden: "translate-y-16",
    durationMs: 1150,
    threshold: 0.12,
    rootMargin: "0px 0px -24% 0px",
  },
  image: {
    offsetHidden: "translate-y-14",
    durationMs: 1280,
    threshold: 0.1,
    rootMargin: "0px 0px -20% 0px",
  },
  fadeIn: {
    offsetHidden: "translate-y-0",
    durationMs: 1100,
    threshold: 0.2,
    rootMargin: "0px 0px -15% 0px",
  },
  heroReveal: {
    offsetHidden: "translate-y-8",
    durationMs: 1300,
    threshold: 0.15,
    rootMargin: "0px 0px -12% 0px",
  },
};

export default function FadeUp({
  children,
  className = "",
  delay = 0,
  variant = "text",
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const config = VARIANTS[variant];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncReduced = () => {
      const reduced = media.matches;
      setReducedMotion(reduced);
      if (reduced) setVisible(true);
    };

    syncReduced();
    media.addEventListener("change", syncReduced);

    if (media.matches) {
      return () => media.removeEventListener("change", syncReduced);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin,
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", syncReduced);
    };
  }, [config.threshold, config.rootMargin]);

  const motionClasses = reducedMotion
    ? "translate-y-0 opacity-100"
    : visible
      ? "translate-y-0 opacity-100"
      : `${config.offsetHidden} opacity-0`;

  return (
    <div
      ref={ref}
      className={`will-change-[opacity,transform] motion-reduce:transition-none ${
        reducedMotion ? "" : "transition-[opacity,transform]"
      } ${motionClasses} ${className}`}
      style={
        reducedMotion
          ? undefined
          : {
              transitionDuration: `${config.durationMs}ms`,
              transitionTimingFunction: EASE_PREMIUM,
              transitionDelay: visible ? `${delay}ms` : "0ms",
            }
      }
    >
      {children}
    </div>
  );
}
