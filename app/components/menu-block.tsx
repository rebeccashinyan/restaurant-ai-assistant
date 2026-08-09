"use client";

import { useEffect, useRef, useState } from "react";

/**
 * From md up the photo is taken out of flow so it never drives the row height —
 * the card decides how tall the block is and the photo sits centered against it,
 * a little shorter than the card so it reads as an inset panel.
 */
const MENU_IMAGE_CLASS =
  "h-[320px] w-full rounded-2xl object-cover md:absolute md:inset-x-0 md:top-1/2 md:h-[80%] md:-translate-y-1/2";
const REVEAL_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const ENTER_OFFSET_PX = 64;

type MenuBlockProps = {
  image: string;
  alt: string;
  imageSide?: "left" | "right";
  children: React.ReactNode;
};

export default function MenuBlock({
  image,
  alt,
  imageSide = "left",
  children,
}: MenuBlockProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", syncReduced);
    };
  }, []);

  const imageEl = (
    <div
      className={`relative z-0 w-full shrink-0 md:w-[600px] ${
        imageSide === "right" ? "md:-ml-24" : ""
      }`}
    >
      <img src={image} alt={alt} className={MENU_IMAGE_CLASS} />
    </div>
  );

  const cardEl = (
    <div
      className={`relative z-10 min-w-0 flex-1 ${
        imageSide === "left" ? "md:-ml-24" : ""
      }`}
    >
      <div className="rounded-2xl bg-[#E4DBCA] p-10 text-[#1F1814] md:p-12">
        {children}
      </div>
    </div>
  );

  return (
    <div
      ref={groupRef}
      className="menu-reveal-float flex flex-col gap-6 will-change-[opacity,transform] motion-reduce:transition-none md:flex-row md:items-stretch"
      style={
        reducedMotion
          ? { opacity: 1, transform: "none" }
          : {
              opacity: revealed ? 1 : 0,
              transform: revealed
                ? "translate3d(0, 0, 0)"
                : `translate3d(0, ${ENTER_OFFSET_PX}px, 0)`,
              transition: `opacity 3500ms ${REVEAL_EASE}, transform 10000ms ${REVEAL_EASE}`,
            }
      }
    >
      {imageSide === "left" ? (
        <>
          {imageEl}
          {cardEl}
        </>
      ) : (
        <>
          {cardEl}
          {imageEl}
        </>
      )}
    </div>
  );
}