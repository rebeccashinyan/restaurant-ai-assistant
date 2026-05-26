"use client";

import { useEffect, useRef, useState } from "react";

const PARALLAX_STRENGTH = 28;
const FADE_OFFSET = 56;
const IMAGE_OBSERVER = { threshold: 0.1, rootMargin: "0px 0px -20% 0px" } as const;

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  /** Delay after entering view before fade-up plays (ms) */
  entryDelay?: number;
};

export default function ParallaxImage({
  src,
  alt,
  className = "",
  imageClassName = "h-[480px] w-full object-cover",
  entryDelay = 0,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);
    if (reduced) {
      setVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      IMAGE_OBSERVER,
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const updateParallax = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = elementCenter - viewportCenter;
      const range = window.innerHeight * 0.85 + rect.height * 0.5;
      const progress = Math.max(-1, Math.min(1, distance / range));
      setParallaxY(progress * PARALLAX_STRENGTH);
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
    };
  }, [reducedMotion]);

  const entryOffset = visible || reducedMotion ? 0 : FADE_OFFSET;
  const y = parallaxY + entryOffset;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden rounded-2xl ${className}`}
    >
      <div
        className={`transition-[opacity,transform] duration-[1280ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          visible || reducedMotion ? "opacity-100" : "opacity-0"
        }`}
        style={
          reducedMotion
            ? undefined
            : {
                transform: `translate3d(0, ${y}px, 0)`,
                transitionDelay: visible ? `${entryDelay}ms` : "0ms",
              }
        }
      >
        <img
          src={src}
          alt={alt}
          className={imageClassName}
        />
      </div>
    </div>
  );
}
