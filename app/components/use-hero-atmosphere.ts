"use client";

import { useEffect, useState, type RefObject } from "react";

type HeroAtmosphereOptions = {
  scrollDarken?: number;
  contentFade?: number;
};

export function useHeroAtmosphere(
  containerRef: RefObject<HTMLElement | null>,
  { scrollDarken = 0.22, contentFade = 0.4 }: HeroAtmosphereOptions = {},
) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncReduced = () => {
      const reduced = media.matches;
      setReducedMotion(reduced);
      if (reduced) setScrollProgress(0);
    };

    syncReduced();
    media.addEventListener("change", syncReduced);

    if (media.matches) {
      return () => media.removeEventListener("change", syncReduced);
    }

    const handleScroll = () => {
      const section = containerRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      media.removeEventListener("change", syncReduced);
    };
  }, [containerRef]);

  const scrollDarkenOpacity = reducedMotion ? 0 : scrollProgress * scrollDarken;
  const contentOpacity = reducedMotion ? 1 : 1 - scrollProgress * contentFade;
  const contentTransition = reducedMotion ? "none" : "opacity 0.35s ease-out";

  return {
    reducedMotion,
    scrollDarkenOpacity,
    contentOpacity,
    contentTransition,
  };
}
