"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const REVEAL_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const HORIZONTAL_OFFSET_PX = 28;
const REVEAL_DURATION_MS = 1000;

type RevealFromProps = {
  children: React.ReactNode;
  className?: string;
  direction: "left" | "right";
  delay?: number;
};

export default function RevealFrom({
  children,
  className = "",
  direction,
  delay = 0,
}: RevealFromProps) {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", syncReduced);
    };
  }, []);

  const isVisible = reducedMotion || revealed;
  const hiddenX =
    direction === "left" ? -HORIZONTAL_OFFSET_PX : HORIZONTAL_OFFSET_PX;

  const motionStyle = (): CSSProperties => {
    if (reducedMotion) {
      return { opacity: 1, transform: "none" };
    }

    const base: CSSProperties = {
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? "translate3d(0, 0, 0)"
        : `translate3d(${hiddenX}px, 0, 0)`,
    };

    if (!isVisible) {
      return { ...base, transitionProperty: "none" };
    }

    return {
      ...base,
      transitionProperty: "opacity, transform",
      transitionDuration: `${REVEAL_DURATION_MS}ms`,
      transitionTimingFunction: REVEAL_EASE,
      transitionDelay: `${delay}ms`,
    };
  };

  return (
    <div ref={ref} className={className} style={motionStyle()}>
      {children}
    </div>
  );
}
