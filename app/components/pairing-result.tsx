import RecommendationCard from "./recommendation-card";
import { MENU_BY_ID } from "../data/menu";

function formatPrice(price: number) {
  return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
}

type PairingResultProps = {
  /** What the guest already had. Shown first, because they chose it first. */
  anchorId: string;
  partnerId: string;
  reason: string | null;
};

/**
 * Shared by every route into a pairing so they all look identical. The total is
 * added up here from menu data — the model never sees a price, let alone a sum.
 */
export default function PairingResult({
  anchorId,
  partnerId,
  reason,
}: PairingResultProps) {
  const anchor = MENU_BY_ID[anchorId];
  const partner = MENU_BY_ID[partnerId];

  if (!anchor || !partner) return null;

  return (
    <div>
      {reason && (
        <p className="mb-4 font-serif text-sm leading-relaxed text-[#4A3A32]">
          {reason}
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <RecommendationCard item={anchor} />
        <RecommendationCard item={partner} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#E8D5D2] pt-4">
        <span className="font-serif text-[#6B5A52]">Total</span>
        <span className="font-serif text-xl text-[#1F1814]">
          {formatPrice(anchor.price + partner.price)}
        </span>
      </div>
    </div>
  );
}
