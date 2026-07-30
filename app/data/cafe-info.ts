/**
 * Sakura Bloom café facts — single source of truth.
 *
 * The Visit and Contact sections, the map embed, the FAQ, and Ask Sakura all
 * read from this file. The assistant is only allowed to state a fact that
 * appears here, so an address or an opening hour can never drift between what
 * the page shows and what the AI says.
 */

export type OpeningHours = {
  /** Display label for the day range, e.g. "Mon – Fri". */
  days: string;
  /** Display label for the times, e.g. "8AM – 8PM". */
  hours: string;
};

export type FaqEntry = {
  question: string;
  answer: string;
};

export const CAFE = {
  name: "Sakura Bloom Matcha",
  description:
    "A modern matcha café in New York, inspired by tea houses in Tokyo and Kyoto. Calm, quiet, and designed for slowing down.",

  address: {
    street: "128 Sakura Street",
    cityStateZip: "New York, NY 10012",
  },

  hours: [
    { days: "Mon – Fri", hours: "8AM – 8PM" },
    { days: "Sat – Sun", hours: "9AM – 9PM" },
  ] satisfies OpeningHours[],

  phone: "(212) 555-2038",
  email: "hello@sakurabloommatcha.com",
} as const;

/** One line, the way the address is spoken rather than stacked on the page. */
export const ADDRESS_LINE = `${CAFE.address.street}, ${CAFE.address.cityStateZip}`;

/** Query string for the Google Maps embed on the Visit page. */
export const MAPS_QUERY = encodeURIComponent(ADDRESS_LINE);

/**
 * Answers to the questions guests ask most often. Shown as the FAQ accordion on
 * the Ask page and given to the assistant as fact, so a guest gets the same
 * answer whether they open the accordion or type the question.
 */
export const FAQ: FaqEntry[] = [
  {
    question: "What kind of matcha does Sakura Bloom use?",
    answer:
      "We use ceremonial-grade matcha sourced from Uji, Japan. It is stone-ground for a smooth, vibrant flavor and whisked fresh for every drink.",
  },
  {
    question: "Do you offer dairy-free options?",
    answer:
      "Yes. Oat milk is available for all lattes and specialty drinks, and many desserts can be made without dairy upon request.",
  },
  {
    question: "Are your desserts made fresh daily?",
    answer:
      "Our wagashi, cakes, and pastries are prepared in small batches each morning so they stay soft, delicate, and at their best throughout the day.",
  },
  {
    question: "What is the most popular drink at Sakura Bloom?",
    answer:
      "The Sakura Bloom Latte is our signature — ceremonial matcha with milk and delicate sakura cream foam. The Strawberry Sakura Matcha is a close favorite.",
  },
  {
    question: "Can I study or work at Sakura Bloom?",
    answer:
      "Absolutely. Our space is designed to feel calm and welcoming, with comfortable seating and a quiet atmosphere perfect for reading, studying, or remote work.",
  },
  {
    question: "Do you offer seasonal menu items?",
    answer:
      "Yes. We rotate limited-time drinks and desserts inspired by cherry blossom season, summer fruit, and other Japanese seasonal traditions.",
  },
  {
    question: "Is Sakura Bloom inspired by Japanese cafés?",
    answer:
      "Very much so. Our aesthetic, ingredients, and pacing are influenced by tea houses and specialty matcha shops in Tokyo and Kyoto, reimagined for a modern New York setting.",
  },
];
