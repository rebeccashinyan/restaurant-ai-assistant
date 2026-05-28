"use client";

import { useRef } from "react";
import FadeUp, { type FadeUpVariant } from "./fade-up";
import { useHeroImageMotion } from "./use-hero-image-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1600&auto=format&fit=crop";

export default function PageHero({
  title,
  titleVariant = "fadeIn",
  imageMotion = true,
}: {
  title: string;
  titleVariant?: FadeUpVariant;
  /** Subtle load zoom + scroll parallax on the hero image */
  imageMotion?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { imageTransform, imageTransition } = useHeroImageMotion(
    sectionRef,
    imageMotion,
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[280px] items-center justify-center overflow-hidden md:h-[320px]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform motion-reduce:transition-none"
        style={{
          backgroundImage: `url('${HERO_IMAGE}')`,
          transform: imageTransform,
          transition: imageTransition,
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <FadeUp variant={titleVariant} className="relative z-10">
        <h1 className="font-serif text-5xl font-bold text-white md:text-6xl">
          {title}
        </h1>
      </FadeUp>
    </section>
  );
}
