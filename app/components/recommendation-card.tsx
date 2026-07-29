import type { MenuItem } from "../data/menu";

const CAFFEINE_LABEL = {
  none: "Caffeine-free",
  low: "Low caffeine",
  medium: "Medium caffeine",
  high: "High caffeine",
} as const;

const TEMPERATURE_LABEL = {
  hot: "Hot",
  iced: "Iced",
  "hot-or-iced": "Hot or iced",
  chilled: "Chilled",
  frozen: "Frozen",
  ambient: "Room temperature",
} as const;

function formatPrice(price: number) {
  return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
}

/** Five dots reading left to right — the card's one piece of visual shorthand. */
function Meter({
  label,
  value,
  tint,
}: {
  label: string;
  value: number;
  tint: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 shrink-0 text-xs tracking-wide text-[#7A6A60]">
        {label}
      </span>
      <span className="flex gap-1" role="img" aria-label={`${label} ${value} of 5`}>
        {[1, 2, 3, 4, 5].map((step) => (
          <span
            key={step}
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: step <= value ? tint : "#DCD3C9" }}
          />
        ))}
      </span>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[#C09F9D]/35 px-2.5 py-1 text-xs text-[#6B5A52]">
      {children}
    </span>
  );
}

export default function RecommendationCard({ item }: { item: MenuItem }) {
  const tags = [
    item.vegan ? "Vegan" : null,
    !item.containsDairy ? "Dairy-free" : null,
    item.containsDairy && item.plantMilkAvailable ? "Oat milk available" : null,
    item.glutenFree ? "Gluten-free" : null,
  ].filter((tag): tag is string => tag !== null);

  return (
    <article className="rounded-2xl border border-[#E8D5D2]/70 bg-[#FCFAF8] p-5 shadow-[0_6px_20px_rgba(31,24,20,0.05)]">
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="font-serif text-lg text-[#1F1814]">{item.name}</h4>
        <span className="font-serif text-lg text-[#1F1814]">
          {formatPrice(item.price)}
        </span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-[#4A3A32]">
        {item.description}
      </p>

      <div className="mt-4 space-y-1.5">
        <Meter label="Sweetness" value={item.sweetness} tint="#C09F9D" />
        {/* An empty matcha row on a non-matcha item is noise, not information. */}
        {item.matchaIntensity > 0 && (
          <Meter label="Matcha" value={item.matchaIntensity} tint="#8C9A84" />
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Tag>{TEMPERATURE_LABEL[item.temperature]}</Tag>
        <Tag>{CAFFEINE_LABEL[item.caffeine]}</Tag>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      {item.allergens.length > 0 && (
        <p className="mt-3 text-xs text-[#7A6A60]">
          Contains {item.allergens.join(", ")}
        </p>
      )}
    </article>
  );
}
