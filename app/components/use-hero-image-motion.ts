"use client";

import { useEffect, useState, type RefObject } from "react";

export const HERO_MOTION_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
export const HERO_LOAD_SCALE = 1.06;

export function useHeroImageMotion(
  containerRef: RefObject<HTMLElement | null>,
  enabled = true,
) {
  const [loadScale, setLoadScale] = useState(1);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncReduced = () => {
      const reduced = media.matches;
      setReducedMotion(reduced);
      if (reduced) {
        setLoadScale(1);
        setScrollOffset(0);
      }
    };

    syncReduced();
    media.addEventListener("change", syncReduced);

    if (!enabled || media.matches) {
      return () => media.removeEventListener("change", syncReduced);
    }

    const frame = window.requestAnimationFrame(() => setLoadScale(HERO_LOAD_SCALE));

    const handleScroll = () => {
      const section = containerRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 1.5)));
      setScrollOffset(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      media.removeEventListener("change", syncReduced);
    };
  }, [containerRef, enabled]);

  const motionActive = enabled && !reducedMotion;

  const imageTransform = motionActive
    ? `scale(${loadScale + scrollOffset * 0.025}) translate3d(0, ${scrollOffset * 18}px, 0)`
    : undefined;

  const imageTransition = motionActive
    ? `transform 2400ms ${HERO_MOTION_EASE}`
    : undefined;

  return { imageTransform, imageTransition, reducedMotion };
}
