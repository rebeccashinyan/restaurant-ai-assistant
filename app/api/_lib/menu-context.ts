import { MENU, MODIFIERS, SOFT_SERVE_SCOOPS, type MenuItem } from "../../data/menu";

const yesNo = (value: boolean) => (value ? "yes" : "no");

/** One item, formatted the same way for every prompt that needs to describe it. */
export function describeItem(item: MenuItem) {
  return [
    `[${item.id}] ${item.name} — $${item.price} (${item.category})`,
    `  ${item.description}`,
    `  sweetness ${item.sweetness}/5 | matcha ${item.matchaIntensity}/5 | caffeine ${item.caffeine} | served ${item.temperature}`,
    `  flavors: ${item.primaryFlavors.join(", ")} | texture: ${item.texture.join(", ")}`,
    `  ingredients: ${item.ingredients.join(", ")}`,
    `  allergens: ${item.allergens.length ? item.allergens.join(", ") : "none declared"}`,
    `  dairy: ${yesNo(item.containsDairy)} | oat milk available: ${yesNo(item.plantMilkAvailable)} | vegan: ${yesNo(item.vegan)} | gluten-free: ${yesNo(item.glutenFree)}`,
    `  pairs well with: ${item.pairsWith.join(", ") || "—"}`,
    `  currently available: ${yesNo(item.available)}`,
  ].join("\n");
}

function buildMenuText() {
  const items = MENU.map(describeItem).join("\n\n");

  const modifiers = MODIFIERS.map(
    (modifier) =>
      `[${modifier.id}] ${modifier.name} +$${modifier.price} (applies to ${modifier.appliesTo.join(", ")})` +
      (modifier.allergens.length
        ? ` | allergens: ${modifier.allergens.join(", ")}`
        : ""),
  ).join("\n");

  const scoops = SOFT_SERVE_SCOOPS.map(
    ({ scoops: count, price }) => `${count} scoop${count > 1 ? "s" : ""}: $${price}`,
  ).join(" | ");

  return `## Items\n\n${items}\n\n## Add-ons\n\n${modifiers}\n\n## Soft serve pricing\n\n${scoops}`;
}

/** Built once at module load — the menu is static. Shared by every AI feature. */
export const MENU_TEXT = buildMenuText();
