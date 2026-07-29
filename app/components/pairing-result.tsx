import RecommendationCard from "./recommendation-card";
import { MENU_BY_ID } from "../data/menu";

function formatPrice(price: number) {
  return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
}

type PairingResultProps = {
  drinkId: string;
  dessertId: string;
  reason: string | null;
};

/**
 * Shared by the pairing panel and the chatbot so both routes to a pairing look
 * identical. The total is added up here from menu data — the model never sees
 * a price, let alone a sum.
 */
export default function PairingResult({
  drinkId,
  dessertId,
  reason,
}: PairingResultProps) {
  const drink = MENU_BY_ID[drinkId];
  const dessert = MENU_BY_ID[dessertId];

  if (!drink || !dessert) return null;

  return (
    <div>
      {reason && (
        <p className="mb-4 font-serif text-sm leading-relaxed text-[#4A3A32]">
          {reason}
        </p>
      )}

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
  );
}
