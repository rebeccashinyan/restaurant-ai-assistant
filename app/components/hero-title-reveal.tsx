"use client";

import { useEffect, useState } from "react";

const HERO_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const TITLE_DURATION_MS = 1200;
const TITLE_OFFSET_PX = 24;

type HeroTitleRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function HeroTitleReveal({
  children,
  className = "",
  delay = 0,
}: HeroTitleRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncReduced = () => {
      const reduced = media.matches;
      setReducedMotion(reduced);
      if (reduced) setRevealed(true);
    };

    syncReduced();
    media.addEventListener("change", syncReduced);

    if (media.matches) {
      return () => media.removeEventListener("change", syncReduced);
    }

    const frame = window.requestAnimationFrame(() => setRevealed(true));

    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener("change", syncReduced);
    };
  }, []);

  const motionActive = !reducedMotion;

  return (
    <div
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translate3d(0, 0, 0)" : `translate3d(0, ${TITLE_OFFSET_PX}px, 0)`,
        transition: motionActive
          ? `opacity ${TITLE_DURATION_MS}ms ${HERO_EASE}, transform ${TITLE_DURATION_MS}ms ${HERO_EASE}`
          : "none",
        transitionDelay: motionActive && revealed ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
