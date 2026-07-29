"use client";

import { useRef } from "react";
import HeroGrain from "./hero-grain";
import HeroTitleReveal from "./hero-title-reveal";
import { useHeroAtmosphere } from "./use-hero-atmosphere";

const heroImage = "/images/hero-pic.png";

export default function HomeHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    scrollDarkenOpacity,
    contentOpacity,
    contentTransition,
  } = useHeroAtmosphere(sectionRef);

  return (
    <section className="w-full">
      <div
        ref={sectionRef}
        className="relative h-[72vh] w-full overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-[center_70%]"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div
          className="absolute inset-0 bg-black"
          style={{
            opacity: scrollDarkenOpacity,
            transition: "opacity 0.35s ease-out",
          }}
        />
        <HeroGrain />
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{
            opacity: contentOpacity,
            transition: contentTransition,
          }}
        >
          <HeroTitleReveal>
            <h1 className="font-serif text-5xl text-[#F3E8E8] md:text-7xl">
              Sakura Bloom Matcha
            </h1>
          </HeroTitleReveal>
        </div>
      </div>
    </section>
  );
}
