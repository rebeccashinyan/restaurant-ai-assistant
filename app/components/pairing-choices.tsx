"use client";

import {
  CATEGORY_LABEL,
  availableInCategory,
  type Category,
  type PairingDirection,
} from "../data/menu";

const DIRECTION_LABEL: Record<PairingDirection, string> = {
  similar: "Similar flavor",
  contrast: "Contrasting flavor",
  light: "Something light",
  rich: "Something rich",
  budget: "Budget-friendly",
  "dairy-free": "Dairy-free",
  vegan: "Vegan",
};

const CHOICE_CLASS =
  "rounded-full border border-[#C09F9D]/40 bg-white px-4 py-2 font-serif text-sm text-[#4A3A32] transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#C09F9D]/70 hover:bg-[#F4EAE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C09F9D] active:translate-y-0 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const GROUP_LABEL_CLASS = "mb-2 text-xs tracking-wide text-[#7A6A60]";

type PairingChoicesProps = {
  kind: "anchor" | "partner" | "direction";
  /** Which parts of the menu this question offers. Empty for a direction question. */
  categories: Category[];
  /** Which directions have something to choose from. Empty for the other two. */
  directions: PairingDirection[];
  disabled: boolean;
  onChooseAnchor: (itemId: string, label: string) => void;
  onChoosePartner: (category: Category, label: string) => void;
  onChooseDirection: (direction: PairingDirection, label: string) => void;
};

/**
 * The buttons under Sakura's question. Clicking sends the exact id, category, or
 * direction rather than a sentence for the model to interpret, so the choice
 * cannot be misread on the way back.
 *
 * The anchor question is the only one long enough to need grouping: it offers
 * whole sections of the menu, so each keeps its own heading rather than pooling
 * twenty pills into one undifferentiated wrap.
 */
export default function PairingChoices({
  kind,
  categories,
  directions,
  disabled,
  onChooseAnchor,
  onChoosePartner,
  onChooseDirection,
}: PairingChoicesProps) {
  if (kind === "anchor") {
    return (
      <div className="mt-3 space-y-4">
        {categories.map((category) => (
          <div key={category}>
            <p className={GROUP_LABEL_CLASS}>{CATEGORY_LABEL[category]}</p>
            <div className="flex flex-wrap gap-2">
              {availableInCategory(category).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => onChooseAnchor(item.id, item.name)}
                  className={CHOICE_CLASS}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "partner") {
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            disabled={disabled}
            onClick={() => onChoosePartner(category, CATEGORY_LABEL[category])}
            className={CHOICE_CLASS}
          >
            {CATEGORY_LABEL[category]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {directions.map((direction) => (
        <button
          key={direction}
          type="button"
          disabled={disabled}
          onClick={() => onChooseDirection(direction, DIRECTION_LABEL[direction])}
          className={CHOICE_CLASS}
        >
          {DIRECTION_LABEL[direction]}
        </button>
      ))}
    </div>
  );
}
