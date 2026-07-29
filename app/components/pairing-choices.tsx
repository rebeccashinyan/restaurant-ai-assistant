"use client";

import { itemsByCategory, type PairingDirection } from "../data/menu";

const DRINKS = itemsByCategory("drinks");

const DIRECTIONS: { value: PairingDirection; label: string }[] = [
  { value: "similar", label: "Similar flavor" },
  { value: "contrast", label: "Contrasting flavor" },
  { value: "light", label: "Something light" },
  { value: "rich", label: "Something rich" },
  { value: "budget", label: "Budget-friendly" },
  { value: "dairy-free", label: "Dairy-free" },
  { value: "vegan", label: "Vegan" },
];

const CHOICE_CLASS =
  "rounded-full border border-[#C09F9D]/40 bg-white px-4 py-2 font-serif text-sm text-[#4A3A32] transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#C09F9D]/70 hover:bg-[#F4EAE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C09F9D] active:translate-y-0 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

type PairingChoicesProps = {
  kind: "drink" | "direction";
  disabled: boolean;
  onChooseDrink: (drinkId: string, label: string) => void;
  onChooseDirection: (direction: PairingDirection, label: string) => void;
};

/**
 * The buttons under Sakura's question. Clicking sends the exact id or direction
 * rather than a sentence for the model to interpret, so the choice cannot be
 * misread on the way back.
 */
export default function PairingChoices({
  kind,
  disabled,
  onChooseDrink,
  onChooseDirection,
}: PairingChoicesProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {kind === "drink"
        ? DRINKS.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={disabled}
              onClick={() => onChooseDrink(item.id, item.name)}
              className={CHOICE_CLASS}
            >
              {item.name}
            </button>
          ))
        : DIRECTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              disabled={disabled}
              onClick={() => onChooseDirection(value, label)}
              className={CHOICE_CLASS}
            >
              {label}
            </button>
          ))}
    </div>
  );
}
