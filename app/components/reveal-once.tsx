"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const REVEAL_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const ENTER_OFFSET_PX = 40;
const REVEAL_DURATION_MS = 950;

type RevealOnceProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/** Fade-up once on scroll enter; locks in place afterward (no reverse / float). */
export default function RevealOnce({
  children,
  className = "",
  delay = 0,
}: RevealOnceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasRevealedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [locked, setLocked] = useState(false);
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
        setLocked(true);
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

  useEffect(() => {
    if (!revealed || locked || reducedMotion) return;
    const timer = window.setTimeout(
      () => setLocked(true),
      REVEAL_DURATION_MS + delay + 80,
    );
    return () => window.clearTimeout(timer);
  }, [revealed, locked, reducedMotion, delay]);

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "transform" || !revealed) return;
    setLocked(true);
  };

  const isVisible = reducedMotion || revealed;

  const motionStyle = (): CSSProperties => {
    if (reducedMotion || locked) {
      return { opacity: 1, transform: "none" };
    }

    const base: CSSProperties = {
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? "translate3d(0, 0, 0)"
        : `translate3d(0, ${ENTER_OFFSET_PX}px, 0)`,
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
    <div
      ref={ref}
      onTransitionEnd={handleTransitionEnd}
      className={className}
      style={motionStyle()}
    >
      {children}
    </div>
  );
}
