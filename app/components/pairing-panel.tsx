"use client";

import { useState } from "react";
import RecommendationCard from "./recommendation-card";
import {
  MENU_BY_ID,
  itemsByCategory,
  type PairingDirection,
} from "../data/menu";

const DIRECTIONS: { value: PairingDirection; label: string }[] = [
  { value: "similar", label: "Similar flavor" },
  { value: "contrast", label: "Contrasting flavor" },
  { value: "light", label: "Something light" },
  { value: "rich", label: "Something rich" },
  { value: "budget", label: "Budget-friendly" },
  { value: "dairy-free", label: "Dairy-free" },
  { value: "vegan", label: "Vegan" },
];

const DRINKS = itemsByCategory("drinks");

const SELECT_CLASS =
  "w-full rounded-xl border border-transparent bg-white px-4 py-3 font-serif text-[#1F1814] outline-none transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#C09F9D]/35 hover:shadow-[0_4px_18px_rgba(192,157,157,0.1)] focus:border-[#C09F9D]/55 focus:shadow-[0_6px_22px_rgba(192,157,157,0.16)]";

const DIRECTION_CHIP_CLASS =
  "rounded-full border px-4 py-2 font-serif text-sm transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C09F9D] active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const FIND_BUTTON_CLASS =
  "rounded-xl bg-[#1F1814] px-8 py-3 font-serif text-[#F7F3ED] transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#4A3A32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C09F9D] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

function formatPrice(price: number) {
  return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
}

type PairResult =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "empty" }
  | { status: "found"; dessertId: string; reason: string };

export default function PairingPanel() {
  const [drinkId, setDrinkId] = useState("");
  const [direction, setDirection] = useState<PairingDirection | null>(null);
  const [result, setResult] = useState<PairResult>({ status: "idle" });

  const drink = drinkId ? MENU_BY_ID[drinkId] : undefined;
  const dessert =
    result.status === "found" ? MENU_BY_ID[result.dessertId] : undefined;

  const canSubmit = Boolean(drinkId && direction) && result.status !== "loading";

  const findPairing = async () => {
    if (!drinkId || !direction) return;

    setResult({ status: "loading" });

    try {
      const response = await fetch("/api/pair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ drinkId, direction }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResult({
          status: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
        return;
      }

      if (!data.dessertId) {
        setResult({ status: "empty" });
        return;
      }

      setResult({
        status: "found",
        dessertId: data.dessertId,
        reason: data.reason,
      });
    } catch {
      setResult({
        status: "error",
        message: "Sakura could not be reached. Check your connection and try again.",
      });
    }
  };

  const startOver = () => {
    setResult({ status: "idle" });
  };

  return (
    <section className="rounded-3xl bg-[#F7F3F0] p-8 text-[#1F1814] md:p-10">
      <h3 className="font-serif text-2xl">Pair a Dessert With Your Drink</h3>
      <p className="mt-2 font-serif text-sm text-[#6B5A52]">
        Choose a drink and a direction, and Sakura will pick a dessert to go with it.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="pairing-drink" className="mb-2 block font-serif text-sm">
            Your drink
          </label>
          <select
            id="pairing-drink"
            value={drinkId}
            onChange={(event) => {
              setDrinkId(event.target.value);
              startOver();
            }}
            className={SELECT_CLASS}
          >
            <option value="" disabled>
              Select a drink…
            </option>
            {DRINKS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="mb-2 block font-serif text-sm">Pairing direction</span>
          <div className="flex flex-wrap gap-2">
            {DIRECTIONS.map(({ value, label }) => {
              const active = direction === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setDirection(value);
                    startOver();
                  }}
                  aria-pressed={active}
                  className={`${DIRECTION_CHIP_CLASS} ${
                    active
                      ? "border-[#1F1814] bg-[#1F1814] text-[#F7F3ED]"
                      : "border-[#C09F9D]/45 bg-white text-[#4A3A32] hover:border-[#C09F9D]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={findPairing}
        disabled={!canSubmit}
        className={`${FIND_BUTTON_CLASS} mt-6`}
      >
        {result.status === "loading" ? "Finding a pairing…" : "Find a Pairing"}
      </button>

      {result.status === "error" && (
        <p className="mt-6 rounded-xl border border-[#C09F9D]/45 bg-[#F4EAE8] px-4 py-3 text-sm leading-relaxed text-[#6B4A44]">
          {result.message}
        </p>
      )}

      {result.status === "empty" && (
        <div className="mt-6 rounded-2xl border border-dashed border-[#C09F9D]/50 px-6 py-8 text-center">
          <p className="font-serif text-lg">
            Nothing on the dessert menu fits that direction right now.
          </p>
          <p className="mx-auto mt-2 max-w-md font-serif text-sm leading-relaxed text-[#6B5A52]">
            Try a different pairing direction for this drink.
          </p>
        </div>
      )}

      {result.status === "found" && drink && dessert && (
        <div className="mt-6">
          <p className="mb-4 font-serif text-sm leading-relaxed text-[#4A3A32]">
            {result.reason}
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <RecommendationCard item={drink} />
            <RecommendationCard item={dessert} />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[#E8D5D2] pt-4">
            <span className="font-serif text-[#6B5A52]">Total</span>
            <span className="font-serif text-xl">
              {formatPrice(drink.price + dessert.price)}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
