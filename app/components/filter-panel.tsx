"use client";

import RecommendationCard from "./recommendation-card";
import {
  FILTER_KEYS,
  activeFilterCount,
  applyFilters,
  type MenuFilters,
} from "../data/menu";

const CAFFEINE_CHIP = {
  none: "Caffeine-free",
  low: "Low caffeine or less",
  medium: "Medium caffeine or less",
  high: "Any caffeine level",
} as const;

const CATEGORY_CHIP = {
  drinks: "Drinks",
  desserts: "Desserts",
  "soft-serve": "Soft serve",
} as const;

/** Turns one stored condition into the words the guest sees on the tag. */
function chipLabel(key: keyof MenuFilters, filters: MenuFilters): string | null {
  switch (key) {
    case "temperature":
      return filters.temperature === "iced" ? "Iced" : "Hot";
    case "maxSweetness":
      return `Sweetness ${filters.maxSweetness} of 5 or less`;
    case "minMatcha":
      return `Matcha ${filters.minMatcha} of 5 or more`;
    case "maxCaffeine":
      return CAFFEINE_CHIP[filters.maxCaffeine!];
    case "dairyFree":
      return "Dairy-free";
    case "vegan":
      return "Vegan";
    case "glutenFree":
      return "Gluten-free";
    case "maxPrice":
      return `Under $${filters.maxPrice}`;
    case "category":
      return CATEGORY_CHIP[filters.category!];
    default:
      return null;
  }
}

type FilterPanelProps = {
  filters: MenuFilters;
  onRemove: (key: keyof MenuFilters) => void;
  onClearAll: () => void;
};

export default function FilterPanel({
  filters,
  onRemove,
  onClearAll,
}: FilterPanelProps) {
  const count = activeFilterCount(filters);
  if (count === 0) return null;

  const activeKeys = FILTER_KEYS.filter((key) => filters[key] !== null);
  const matches = applyFilters(filters);

  return (
    <section
      aria-label="Menu filters"
      className="rounded-3xl bg-[#F7F3F0] p-8 text-[#1F1814] md:p-10"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl">What Sakura understood</h3>
        <button
          type="button"
          onClick={onClearAll}
          className="font-serif text-sm text-[#6B5A52] underline underline-offset-4 transition-colors duration-300 hover:text-[#1F1814] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C09F9D] motion-reduce:transition-none"
        >
          Clear all
        </button>
      </div>

      <p className="mt-2 font-serif text-sm text-[#6B5A52]">
        Remove anything that isn&apos;t right and the list updates.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {activeKeys.map((key) => {
          const label = chipLabel(key, filters);
          if (!label) return null;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onRemove(key)}
              aria-label={`Remove filter: ${label}`}
              className="group inline-flex items-center gap-2 rounded-full border border-[#C09F9D]/45 bg-white px-4 py-2 font-serif text-sm text-[#4A3A32] transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#C09F9D] hover:bg-[#F4EAE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C09F9D] active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {label}
              <span
                aria-hidden
                className="text-base leading-none text-[#A08A84] transition-colors duration-300 group-hover:text-[#1F1814] motion-reduce:transition-none"
              >
                ×
              </span>
            </button>
          );
        })}
      </div>

      <hr className="my-7 border-[#E8D5D2]" />

      {matches.length > 0 ? (
        <>
          <p className="mb-5 font-serif text-sm text-[#6B5A52]">
            {matches.length} {matches.length === 1 ? "item" : "items"} match
            {matches.length === 1 ? "es" : ""} all {count}{" "}
            {count === 1 ? "filter" : "filters"}.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((item) => (
              <RecommendationCard key={item.id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#C09F9D]/50 px-6 py-10 text-center">
          <p className="font-serif text-lg">Nothing on the menu matches all of these.</p>
          <p className="mx-auto mt-2 max-w-md font-serif text-sm leading-relaxed text-[#6B5A52]">
            Remove a tag above to widen the search, or tell Sakura which part
            matters most.
          </p>
          <button
            type="button"
            onClick={onClearAll}
            className="mt-6 rounded-xl bg-[#C1C8BC] px-6 py-3 font-serif text-[#1F1814] transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#b5bdb0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C09F9D] active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            Start over
          </button>
        </div>
      )}
    </section>
  );
}
