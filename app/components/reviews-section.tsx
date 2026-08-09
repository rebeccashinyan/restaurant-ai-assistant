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
const PROFILE_STAGGER_MS = 140;

function fadeUpClass(inView: boolean, reducedMotion: boolean) {
  if (reducedMotion || inView) {
    return "translate-y-0 opacity-100";
  }
  return "translate-y-10 opacity-0";
}

function isSectionInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  return rect.top < vh * 0.88 && rect.bottom > vh * 0.08;
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

    const reveal = () => setInView(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);

    if (isSectionInViewport(el)) {
      reveal();
      observer.disconnect();
    }

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

  const entranceClasses =
    "will-change-[opacity,transform] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none " +
    fadeUpClass(inView, reducedMotion);

  return (
    <section ref={sectionRef} className="page-shell py-24">
      <div
        className={entranceClasses}
        style={inView && !reducedMotion ? { transitionDelay: "0ms" } : undefined}
      >
        <h2 className="mb-4 font-serif text-4xl md:text-5xl">Customers Review</h2>
        <p className="mb-14 font-serif text-3xl uppercase tracking-wide md:text-5xl">
          20K+ Happy Customers Say About Our Product
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[2.3fr_0.7fr] md:items-stretch">
        <div
          className={`min-w-0 ${entranceClasses}`}
          style={inView && !reducedMotion ? { transitionDelay: "120ms" } : undefined}
        >
          <div className="flex min-h-[420px] flex-col rounded-3xl bg-[#F7F3ED] p-10 text-[#1F1814] md:min-h-[480px] md:p-12">
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
        </div>

        <div className="flex min-h-[420px] flex-col gap-4 md:min-h-[480px]">
          {reviews.map((item, index) => {
            const isActive = active === index;
            const staggerDelay = 240 + index * PROFILE_STAGGER_MS;

            return (
              <div
                key={item.name}
                className={`${entranceClasses} ${isActive ? "flex-[2]" : "flex-1"}`}
                style={
                  inView && !reducedMotion
                    ? { transitionDelay: `${staggerDelay}ms` }
                    : undefined
                }
              >
                <button
                  type="button"
                  onClick={() => selectReview(index)}
                  aria-pressed={isActive}
                  aria-label={`Read review from ${item.name}`}
                  className={`relative h-full w-full overflow-hidden rounded-3xl bg-[#E8E3D9] transition-[transform,box-shadow,min-height,opacity] duration-200 ease-out motion-reduce:transition-none hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.2)] motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none ${
                    isActive
                      ? "min-h-[200px]"
                      : `min-h-[100px] ${inView ? "opacity-80 hover:opacity-100" : ""}`
                  }`}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
