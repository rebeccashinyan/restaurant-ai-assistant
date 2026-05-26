"use client";

import FadeUp, { type FadeUpVariant } from "./fade-up";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1600&auto=format&fit=crop";

export default function PageHero({
  title,
  titleVariant = "fadeIn",
}: {
  title: string;
  titleVariant?: FadeUpVariant;
}) {
  return (
    <section
      className="relative flex h-[280px] items-center justify-center bg-cover bg-center md:h-[320px]"
      style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <FadeUp variant={titleVariant} className="relative z-10">
        <h1 className="font-serif text-5xl font-bold text-white md:text-6xl">
          {title}
        </h1>
      </FadeUp>
    </section>
  );
}
