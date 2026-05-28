"use client";

import { useRef } from "react";
import { useHeroImageMotion } from "./use-hero-image-motion";

const heroImage =
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2000&auto=format&fit=crop";

export default function HomeHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { imageTransform, imageTransition } = useHeroImageMotion(sectionRef);

  return (
    <section className="w-full pt-4 md:pt-6">
      <div
        ref={sectionRef}
        className="relative h-[72vh] w-full overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform motion-reduce:transition-none"
          style={{
            backgroundImage: `url('${heroImage}')`,
            transform: imageTransform,
            transition: imageTransition,
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <h1 className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-[#F3E8E8] md:text-7xl">
          Sakura Bloom Matcha
        </h1>
      </div>
    </section>
  );
}
