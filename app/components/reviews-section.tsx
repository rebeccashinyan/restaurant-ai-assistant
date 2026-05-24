"use client";

import { useState } from "react";

// Lifestyle photos from Unsplash (free under the Unsplash License)
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

export default function ReviewsSection() {
  const [active, setActive] = useState(0);
  const review = reviews[active];

  return (
    <section className="page-shell py-24">
      <h2 className="mb-4 font-serif text-4xl md:text-5xl">Users Review</h2>
      <p className="mb-14 font-serif text-3xl uppercase tracking-wide md:text-5xl">
        20K+ Happy Users Says About Our Product
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[2.3fr_0.7fr] md:items-stretch">
        <div className="flex min-h-[420px] flex-col rounded-3xl bg-[#F7F3ED] p-10 text-[#1F1814] md:min-h-[480px] md:p-12">
          <p className="mb-12 flex-1 font-serif text-xl leading-relaxed md:text-2xl">
            &ldquo;{review.quote}&rdquo;
          </p>
          <div>
            <p className="font-serif text-lg font-bold">{review.name}</p>
            <p className="font-serif text-lg">{review.title}</p>
          </div>
        </div>

        <div className="flex min-h-[420px] flex-col gap-4 md:min-h-[480px]">
          {reviews.map((item, index) => {
            const isActive = active === index;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={isActive}
                aria-label={`Read review from ${item.name}`}
                className={`relative overflow-hidden rounded-3xl bg-[#E8E3D9] transition-all duration-500 ease-in-out ${
                  isActive
                    ? "min-h-[200px] flex-[2]"
                    : "min-h-[100px] flex-1 opacity-80 hover:opacity-100"
                }`}
              >
                <img
                  src={item.image}
                  alt={`${item.name} at a café`}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    isActive ? "bg-black/15" : "bg-black/30"
                  }`}
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
