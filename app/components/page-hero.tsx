"use client";

import { useRef } from "react";
import HeroGrain from "./hero-grain";
import HeroTitleReveal from "./hero-title-reveal";
import { useHeroAtmosphere } from "./use-hero-atmosphere";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1600&auto=format&fit=crop";

export default function PageHero({ title }: { title: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    scrollDarkenOpacity,
    contentOpacity,
    contentTransition,
  } = useHeroAtmosphere(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[280px] items-center justify-center overflow-hidden md:h-[320px]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: scrollDarkenOpacity,
          transition: "opacity 0.35s ease-out",
        }}
      />
      <HeroGrain />
      <div
        className="relative z-10 flex w-full items-center justify-center"
        style={{
          opacity: contentOpacity,
          transition: contentTransition,
        }}
      >
        <HeroTitleReveal>
          <h1 className="font-serif text-5xl font-bold text-white md:text-6xl">
            {title}
          </h1>
        </HeroTitleReveal>
      </div>
    </section>
  );
}
