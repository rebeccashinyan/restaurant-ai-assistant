"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const LINE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const LINE_DURATION_MS = 900;

type RevealLineProps = {
  className?: string;
  delay?: number;
};

export default function RevealLine({
  className = "",
  delay = 180,
}: RevealLineProps) {
  const ref = useRef<HTMLHRElement>(null);
  const hasRevealedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncReduced = () => {
      const reduced = media.matches;
      setReducedMotion(reduced);
      if (reduced) {
        hasRevealedRef.current = true;
        setRevealed(true);
      }
    };

    syncReduced();
    media.addEventListener("change", syncReduced);

    if (media.matches || hasRevealedRef.current) {
      return () => media.removeEventListener("change", syncReduced);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRevealedRef.current) {
          hasRevealedRef.current = true;
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", syncReduced);
    };
  }, []);

  const isVisible = reducedMotion || revealed;

  const lineStyle = (): CSSProperties => {
    if (reducedMotion) {
      return { transform: "scaleX(1)" };
    }

    return {
      transform: isVisible ? "scaleX(1)" : "scaleX(0)",
      transformOrigin: "left center",
      transitionProperty: "transform",
      transitionDuration: `${LINE_DURATION_MS}ms`,
      transitionTimingFunction: LINE_EASE,
      transitionDelay: isVisible ? `${delay}ms` : "0ms",
    };
  };

  return (
    <hr
      ref={ref}
      aria-hidden
      className={`h-px border-0 bg-[#E4DBCA]/25 ${className}`}
      style={lineStyle()}
    />
  );
}
