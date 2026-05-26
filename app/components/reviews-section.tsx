"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const reviews = [
  {
    name: "Emily R.",
    title: "Creative Director",
    quote:
      "One of the most calming cafés I've been to in NYC. The interior feels so intentional and peaceful, and the matcha quality is actually amazing — not overly sweet like most places. I ordered the Strawberry Sakura Matcha and the Sakura Nerikiri, and both looked almost too pretty to eat.",
    image:
      "https://images.unsplash.com/photo-1515378791214-9ef2b66d7852?w=800&h=600&fit=crop",
  },
  {
    name: "Daniel K.",
    title: "Product Manager",
    quote:
      "Sakura Bloom feels less like a café and more like a quiet little escape from the city. The Cloud Matcha was incredibly smooth, and the soft serve with mochi bites was honestly one of the best desserts I've had recently. You can tell every detail is carefully designed.",
    image:
      "https://images.unsplash.com/photo-1554048612-3879760701e0?w=800&h=600&fit=crop",
  },
  {
    name: "Sophia L.",
    title: "Investment Banking Analyst",
    quote:
      "I came here because of the aesthetic photos online, but the drinks genuinely exceeded my expectations. The Hojicha Blossom Latte had such a rich roasted flavor, and the atmosphere made me want to stay for hours. Perfect place for studying, catching up with friends, or just slowing down for a bit.",
    image:
      "https://images.unsplash.com/photo-1524502397800-2e58a319a569?w=800&h=600&fit=crop",
  },
];

const CROSSFADE_MS = 280;
const PROFILE_STAGGER_MS = 120;

function entranceClass(
  inView: boolean,
  reducedMotion: boolean,
  withScale = false,
) {
  if (reducedMotion || inView) {
    return withScale
      ? "translate-y-0 scale-100 opacity-100"
      : "translate-y-0 opacity-100";
  }
  return withScale
    ? "translate-y-8 scale-[0.97] opacity-0"
    : "translate-y-8 opacity-0";
}

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [active, setActive] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const [displayedIndex, setDisplayedIndex] = useState(0);

  const review = reviews[displayedIndex];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);
    if (reduced) {
      setInView(true);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const selectReview = useCallback(
    (index: number) => {
      if (index === active) return;

      if (reducedMotion) {
        setActive(index);
        setDisplayedIndex(index);
        return;
      }

      setActive(index);
      setContentVisible(false);
      window.setTimeout(() => {
        setDisplayedIndex(index);
        setContentVisible(true);
      }, CROSSFADE_MS);
    },
    [active, reducedMotion],
  );

  return (
    <section ref={sectionRef} className="page-shell py-24">
      <div
        className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${entranceClass(inView, reducedMotion)}`}
      >
        <h2 className="mb-4 font-serif text-4xl md:text-5xl">Users Review</h2>
        <p className="mb-14 font-serif text-3xl uppercase tracking-wide md:text-5xl">
          20K+ Happy Users Says About Our Product
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[2.3fr_0.7fr] md:items-stretch">
        <div
          className={`flex min-h-[420px] flex-col rounded-3xl bg-[#F7F3ED] p-10 text-[#1F1814] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none md:min-h-[480px] md:p-12 ${entranceClass(inView, reducedMotion, true)}`}
          style={
            reducedMotion || !inView ? undefined : { transitionDelay: "120ms" }
          }
        >
          <div
            className={`mb-12 flex flex-1 flex-col transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${
              contentVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="flex-1 font-serif text-xl leading-relaxed md:text-2xl">
              &ldquo;{review.quote}&rdquo;
            </p>
          </div>
          <div
            className={`transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${
              contentVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="font-serif text-lg font-bold">{review.name}</p>
            <p className="font-serif text-lg">{review.title}</p>
          </div>
        </div>

        <div className="flex min-h-[420px] flex-col gap-4 md:min-h-[480px]">
          {reviews.map((item, index) => {
            const isActive = active === index;
            const staggerDelay = 220 + index * PROFILE_STAGGER_MS;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => selectReview(index)}
                aria-pressed={isActive}
                aria-label={`Read review from ${item.name}`}
                className={`relative overflow-hidden rounded-3xl bg-[#E8E3D9] transition-[opacity,transform,box-shadow,min-height,flex] duration-200 ease-out motion-reduce:transition-none hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.2)] motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none ${entranceClass(inView, reducedMotion)} ${
                  isActive
                    ? "z-10 min-h-[200px] flex-[2]"
                    : "min-h-[100px] flex-1 opacity-80 hover:opacity-100"
                }`}
                style={
                  reducedMotion || !inView
                    ? undefined
                    : { transitionDelay: `${staggerDelay}ms` }
                }
              >
                <img
                  src={item.image}
                  alt={`${item.name} at a café`}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div
                  className={
                    isActive
                      ? "absolute inset-0 bg-black/15 transition-colors duration-200"
                      : "absolute inset-0 bg-black/30 transition-colors duration-200"
                  }
                />
                <span className="absolute bottom-4 left-4 font-serif text-sm text-white md:text-base">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
