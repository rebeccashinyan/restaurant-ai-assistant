/**
 * Sakura Bloom menu — single source of truth.
 *
 * Both the Menu page and Ask Sakura read from this file. The AI is only ever
 * allowed to return `id` values from here; prices, allergens, and images are
 * rendered from this data so the model cannot invent them.
 *
 * Scales:
 *   sweetness       0 = not sweet at all,  5 = dessert-sweet
 *   matchaIntensity 0 = no matcha,         5 = pure ceremonial matcha
 */

export type Category = "drinks" | "desserts" | "soft-serve";

/** 0–5, used for both sweetness and matcha intensity so filters can compare. */
export type Level = 0 | 1 | 2 | 3 | 4 | 5;

export type CaffeineLevel = "none" | "low" | "medium" | "high";

export type Temperature =
  | "hot"
  | "iced"
  | "hot-or-iced"
  | "chilled"
  | "frozen"
  | "ambient";

export type Allergen =
  | "milk"
  | "eggs"
  | "wheat"
  | "soy"
  | "sesame"
  | "peanuts"
  | "tree-nuts";

export type MenuItem = {
  id: string;
  name: string;
  category: Category;
  description: string;
  /** Convention: /images/menu/<id>.png — see MISSING_ITEM_IMAGES below. */
  image: string;
  price: number;
  available: boolean;

  primaryFlavors: string[];
  sweetness: Level;
  matchaIntensity: Level;
  caffeine: CaffeineLevel;
  temperature: Temperature;
  texture: string[];
  /** Suggested pairings, by item id. */
  pairsWith: string[];

  ingredients: string[];
  allergens: Allergen[];
  containsDairy: boolean;
  /** Can be remade with oat milk. */
  plantMilkAvailable: boolean;
  vegan: boolean;
  glutenFree: boolean;
};

export const MENU: MenuItem[] = [
  // ── Drinks ──────────────────────────────────────────────────────────────
  {
    id: "sakura-bloom-latte",
    name: "Sakura Bloom Latte",
    category: "drinks",
    description:
      "Ceremonial-grade matcha blended with milk and topped with delicate sakura cream foam.",
    image: "/images/menu/sakura-bloom-latte.png",
    price: 7,
    available: true,
    primaryFlavors: ["matcha", "floral", "creamy"],
    sweetness: 3,
    matchaIntensity: 4,
    caffeine: "medium",
    temperature: "hot-or-iced",
    texture: ["creamy", "smooth", "foamy"],
    pairsWith: ["sakura-nerikiri", "sakura-shortcake"],
    ingredients: [
      "ceremonial matcha",
      "whole milk",
      "sakura cream foam",
      "cane sugar",
    ],
    allergens: ["milk"],
    containsDairy: true,
    plantMilkAvailable: true,
    vegan: false,
    glutenFree: true,
  },
  {
    id: "strawberry-sakura-matcha",
    name: "Strawberry Sakura Matcha",
    category: "drinks",
    description:
      "Fresh strawberry puree layered with creamy matcha and cherry blossom cold foam.",
    image: "/images/menu/strawberry-sakura-matcha.png",
    price: 8,
    available: true,
    primaryFlavors: ["strawberry", "floral", "matcha", "creamy"],
    sweetness: 4,
    matchaIntensity: 2,
    caffeine: "medium",
    temperature: "iced",
    texture: ["creamy", "layered", "juicy"],
    pairsWith: ["sakura-shortcake", "yuzu-sakura-sorbet"],
    ingredients: [
      "strawberry puree",
      "ceremonial matcha",
      "whole milk",
      "sakura cold foam",
      "cane sugar",
    ],
    allergens: ["milk"],
    containsDairy: true,
    plantMilkAvailable: true,
    vegan: false,
    glutenFree: true,
  },
  {
    id: "cloud-matcha",
    name: "Cloud Matcha",
    category: "drinks",
    description: "Smooth matcha latte finished with a soft vanilla cream cloud.",
    image: "/images/menu/cloud-matcha.png",
    price: 7,
    available: true,
    primaryFlavors: ["matcha", "vanilla", "creamy"],
    sweetness: 3,
    matchaIntensity: 3,
    caffeine: "medium",
    temperature: "hot-or-iced",
    texture: ["creamy", "airy", "smooth"],
    pairsWith: ["matcha-mille-crepe", "hojicha-pudding"],
    ingredients: ["ceremonial matcha", "whole milk", "vanilla cream", "cane sugar"],
    allergens: ["milk"],
    containsDairy: true,
    plantMilkAvailable: true,
    vegan: false,
    glutenFree: true,
  },
  {
    id: "hojicha-blossom-latte",
    name: "Hojicha Blossom Latte",
    category: "drinks",
    description:
      "Roasted hojicha with floral cream and a subtle sakura sweetness.",
    image: "/images/menu/hojicha-blossom-latte.png",
    price: 7,
    available: true,
    primaryFlavors: ["roasted", "nutty", "floral", "creamy"],
    sweetness: 3,
    matchaIntensity: 0,
    caffeine: "low",
    temperature: "hot-or-iced",
    texture: ["creamy", "smooth"],
    pairsWith: ["black-sesame-mochi", "hojicha-pudding"],
    ingredients: ["roasted hojicha", "whole milk", "floral cream", "sakura sugar"],
    allergens: ["milk"],
    containsDairy: true,
    plantMilkAvailable: true,
    vegan: false,
    glutenFree: true,
  },
  {
    id: "ube-bloom-fusion",
    name: "Ube Bloom Fusion",
    category: "drinks",
    description:
      "Creamy ube and premium matcha swirled together for a rich, earthy flavor.",
    image: "/images/menu/ube-bloom-fusion.png",
    price: 8,
    available: true,
    primaryFlavors: ["ube", "earthy", "matcha", "creamy"],
    sweetness: 4,
    matchaIntensity: 3,
    caffeine: "medium",
    temperature: "hot-or-iced",
    texture: ["creamy", "thick", "smooth"],
    pairsWith: ["ube-blossom-soft-serve", "matcha-basque-cheesecake"],
    ingredients: [
      "ube puree",
      "ceremonial matcha",
      "whole milk",
      "condensed milk",
    ],
    allergens: ["milk"],
    containsDairy: true,
    plantMilkAvailable: true,
    vegan: false,
    glutenFree: true,
  },
  {
    id: "ceremonial-matcha",
    name: "Ceremonial Matcha",
    category: "drinks",
    description:
      "Stone-ground Uji matcha whisked with hot water. No milk, no sugar — the purest expression of the leaf.",
    image: "/images/menu/ceremonial-matcha.png",
    price: 6,
    available: true,
    primaryFlavors: ["matcha", "umami", "grassy", "bittersweet"],
    sweetness: 0,
    matchaIntensity: 5,
    caffeine: "high",
    temperature: "hot-or-iced",
    texture: ["light", "frothy", "clean"],
    pairsWith: ["black-sesame-mochi", "sakura-nerikiri", "momo-nerikiri"],
    ingredients: ["ceremonial matcha", "filtered water"],
    allergens: [],
    containsDairy: false,
    plantMilkAvailable: false,
    vegan: true,
    glutenFree: true,
  },
  {
    id: "yuzu-matcha-sparkle",
    name: "Yuzu Matcha Sparkle",
    category: "drinks",
    description:
      "Ceremonial matcha shaken with yuzu juice and sparkling water over ice. Bright, citrusy, and dairy-free.",
    image: "/images/menu/yuzu-matcha-sparkle.png",
    price: 7,
    available: true,
    primaryFlavors: ["yuzu", "citrus", "matcha", "refreshing"],
    sweetness: 2,
    matchaIntensity: 3,
    caffeine: "medium",
    temperature: "iced",
    texture: ["sparkling", "light", "crisp"],
    pairsWith: ["yuzu-sakura-sorbet", "momo-nerikiri"],
    ingredients: [
      "ceremonial matcha",
      "yuzu juice",
      "sparkling water",
      "cane sugar",
    ],
    allergens: [],
    containsDairy: false,
    plantMilkAvailable: false,
    vegan: true,
    glutenFree: true,
  },
  {
    id: "genmaicha-cream-latte",
    name: "Genmaicha Cream Latte",
    category: "drinks",
    description:
      "Genmaicha steeped with toasted rice, softened with steamed milk and a light cream top.",
    image: "/images/menu/genmaicha-cream-latte.png",
    price: 7,
    available: true,
    primaryFlavors: ["toasted rice", "nutty", "grassy", "creamy"],
    sweetness: 2,
    matchaIntensity: 1,
    caffeine: "low",
    temperature: "hot",
    texture: ["creamy", "smooth", "light"],
    pairsWith: ["momo-nerikiri", "sakura-nerikiri"],
    ingredients: ["genmaicha", "whole milk", "light cream", "cane sugar"],
    allergens: ["milk"],
    containsDairy: true,
    plantMilkAvailable: true,
    vegan: false,
    glutenFree: true,
  },
  {
    id: "sakura-blossom-milk",
    name: "Sakura Blossom Milk",
    category: "drinks",
    description:
      "Steamed milk infused with salt-cured sakura blossom and a touch of honey. No tea, no caffeine.",
    image: "/images/menu/sakura-blossom-milk.png",
    price: 6,
    available: true,
    primaryFlavors: ["floral", "milky", "lightly sweet"],
    sweetness: 3,
    matchaIntensity: 0,
    caffeine: "none",
    temperature: "hot-or-iced",
    texture: ["creamy", "silky"],
    pairsWith: ["sakura-shortcake", "sakura-nerikiri"],
    ingredients: ["whole milk", "salt-cured sakura blossom", "honey"],
    allergens: ["milk"],
    containsDairy: true,
    plantMilkAvailable: true,
    vegan: false,
    glutenFree: true,
  },

  // ── Desserts ────────────────────────────────────────────────────────────
  {
    id: "sakura-shortcake",
    name: "Sakura Shortcake",
    category: "desserts",
    description:
      "Light vanilla sponge layered with fresh strawberries and sakura cream.",
    image: "/images/menu/sakura-shortcake.png",
    price: 8,
    available: true,
    primaryFlavors: ["strawberry", "vanilla", "floral", "creamy"],
    sweetness: 4,
    matchaIntensity: 0,
    caffeine: "none",
    temperature: "chilled",
    texture: ["soft", "light", "fluffy"],
    pairsWith: ["ceremonial-matcha", "sakura-bloom-latte"],
    ingredients: [
      "vanilla sponge",
      "fresh strawberries",
      "sakura whipped cream",
      "wheat flour",
      "eggs",
    ],
    allergens: ["milk", "eggs", "wheat"],
    containsDairy: true,
    plantMilkAvailable: false,
    vegan: false,
    glutenFree: false,
  },
  {
    id: "matcha-mille-crepe",
    name: "Matcha Mille Crepe",
    category: "desserts",
    description:
      "Delicate layers of crepes with rich ceremonial matcha cream.",
    image: "/images/menu/matcha-mille-crepe.png",
    price: 9,
    available: true,
    primaryFlavors: ["matcha", "creamy", "vanilla"],
    sweetness: 3,
    matchaIntensity: 4,
    caffeine: "low",
    temperature: "chilled",
    texture: ["layered", "soft", "creamy"],
    pairsWith: ["hojicha-blossom-latte", "ceremonial-matcha"],
    ingredients: [
      "crepe layers",
      "ceremonial matcha pastry cream",
      "whole milk",
      "eggs",
      "wheat flour",
    ],
    allergens: ["milk", "eggs", "wheat"],
    containsDairy: true,
    plantMilkAvailable: false,
    vegan: false,
    glutenFree: false,
  },
  {
    id: "sakura-nerikiri",
    name: "Sakura Nerikiri",
    category: "desserts",
    description:
      "Handcrafted Japanese wagashi shaped like blooming sakura flowers, with a delicate sweet bean filling.",
    image: "/images/menu/sakura-nerikiri.png",
    price: 7,
    available: true,
    primaryFlavors: ["floral", "sweet bean", "delicate"],
    sweetness: 3,
    matchaIntensity: 0,
    caffeine: "none",
    temperature: "ambient",
    texture: ["smooth", "soft", "dense"],
    pairsWith: ["ceremonial-matcha", "genmaicha-cream-latte"],
    ingredients: [
      "white bean paste",
      "glutinous rice flour",
      "sakura extract",
      "sugar",
    ],
    allergens: [],
    containsDairy: false,
    plantMilkAvailable: false,
    vegan: true,
    glutenFree: true,
  },
  {
    id: "momo-nerikiri",
    name: "Momo Nerikiri",
    category: "desserts",
    description:
      "Elegant peach-shaped nerikiri served as a soft seasonal tea dessert with subtle floral sweetness.",
    image: "/images/menu/momo-nerikiri.png",
    price: 7,
    available: true,
    primaryFlavors: ["peach", "floral", "sweet bean"],
    sweetness: 3,
    matchaIntensity: 0,
    caffeine: "none",
    temperature: "ambient",
    texture: ["smooth", "soft", "dense"],
    pairsWith: ["ceremonial-matcha", "yuzu-matcha-sparkle"],
    ingredients: [
      "white bean paste",
      "glutinous rice flour",
      "peach extract",
      "sugar",
    ],
    allergens: [],
    containsDairy: false,
    plantMilkAvailable: false,
    vegan: true,
    glutenFree: true,
  },
  {
    id: "black-sesame-mochi",
    name: "Black Sesame Mochi",
    category: "desserts",
    description:
      "Chewy mochi filled with toasted black sesame paste and dusted with kinako.",
    image: "/images/menu/black-sesame-mochi.png",
    price: 6,
    available: true,
    primaryFlavors: ["black sesame", "nutty", "roasted", "toasty"],
    sweetness: 3,
    matchaIntensity: 0,
    caffeine: "none",
    temperature: "ambient",
    texture: ["chewy", "soft", "dense"],
    pairsWith: ["ceremonial-matcha", "hojicha-blossom-latte"],
    ingredients: [
      "glutinous rice flour",
      "black sesame paste",
      "kinako",
      "sugar",
    ],
    allergens: ["sesame", "soy"],
    containsDairy: false,
    plantMilkAvailable: false,
    vegan: true,
    glutenFree: true,
  },
  {
    id: "matcha-basque-cheesecake",
    name: "Matcha Basque Cheesecake",
    category: "desserts",
    description:
      "Deeply caramelized on top, custardy in the center, with ceremonial matcha folded through.",
    image: "/images/menu/matcha-basque-cheesecake.png",
    price: 9,
    available: true,
    primaryFlavors: ["matcha", "caramelized", "rich", "creamy"],
    sweetness: 3,
    matchaIntensity: 4,
    caffeine: "low",
    temperature: "chilled",
    texture: ["dense", "creamy", "custardy"],
    pairsWith: ["ceremonial-matcha"],
    ingredients: ["cream cheese", "ceremonial matcha", "eggs", "cream", "sugar"],
    allergens: ["milk", "eggs"],
    containsDairy: true,
    plantMilkAvailable: false,
    vegan: false,
    glutenFree: true,
  },
  {
    id: "hojicha-pudding",
    name: "Hojicha Pudding",
    category: "desserts",
    description:
      "Silky steamed custard infused with roasted hojicha and finished with brown sugar syrup.",
    image: "/images/menu/hojicha-pudding.png",
    price: 6,
    available: true,
    primaryFlavors: ["roasted", "caramel", "nutty", "creamy"],
    sweetness: 3,
    matchaIntensity: 0,
    caffeine: "low",
    temperature: "chilled",
    texture: ["silky", "soft", "wobbly"],
    pairsWith: ["cloud-matcha", "genmaicha-cream-latte"],
    ingredients: ["roasted hojicha", "whole milk", "cream", "eggs", "brown sugar"],
    allergens: ["milk", "eggs"],
    containsDairy: true,
    plantMilkAvailable: false,
    vegan: false,
    glutenFree: true,
  },
  {
    id: "yuzu-sakura-sorbet",
    name: "Yuzu Sakura Sorbet",
    category: "desserts",
    description:
      "Bright yuzu sorbet swirled with sakura syrup. Dairy-free and served frozen.",
    image: "/images/menu/yuzu-sakura-sorbet.png",
    price: 6,
    available: true,
    primaryFlavors: ["yuzu", "citrus", "floral", "refreshing"],
    sweetness: 3,
    matchaIntensity: 0,
    caffeine: "none",
    temperature: "frozen",
    texture: ["icy", "light", "smooth"],
    pairsWith: ["yuzu-matcha-sparkle", "strawberry-sakura-matcha"],
    ingredients: ["yuzu juice", "sakura syrup", "cane sugar", "water"],
    allergens: [],
    containsDairy: false,
    plantMilkAvailable: false,
    vegan: true,
    glutenFree: true,
  },

  // ── Soft serve (price shown is a single scoop) ───────────────────────────
  {
    id: "sakura-matcha-soft-serve",
    name: "Sakura Matcha Soft Serve",
    category: "soft-serve",
    description:
      "Ceremonial matcha soft serve swirled with sakura cream. Priced per scoop.",
    image: "/images/menu/sakura-matcha-soft-serve.png",
    price: 5,
    available: true,
    primaryFlavors: ["matcha", "floral", "creamy"],
    sweetness: 3,
    matchaIntensity: 3,
    caffeine: "low",
    temperature: "frozen",
    texture: ["creamy", "soft", "cold"],
    pairsWith: ["ceremonial-matcha", "black-sesame-mochi"],
    ingredients: ["milk", "cream", "ceremonial matcha", "sakura syrup", "sugar"],
    allergens: ["milk"],
    containsDairy: true,
    plantMilkAvailable: false,
    vegan: false,
    glutenFree: true,
  },
  {
    id: "hojicha-soft-serve",
    name: "Hojicha Soft Serve",
    category: "soft-serve",
    description:
      "Roasted hojicha soft serve with a toasty, caramel-like finish. Priced per scoop.",
    image: "/images/menu/hojicha-soft-serve.png",
    price: 5,
    available: true,
    primaryFlavors: ["roasted", "nutty", "caramel", "creamy"],
    sweetness: 3,
    matchaIntensity: 0,
    caffeine: "low",
    temperature: "frozen",
    texture: ["creamy", "soft", "cold"],
    pairsWith: ["ceremonial-matcha"],
    ingredients: ["milk", "cream", "roasted hojicha", "sugar"],
    allergens: ["milk"],
    containsDairy: true,
    plantMilkAvailable: false,
    vegan: false,
    glutenFree: true,
  },
  {
    id: "ube-blossom-soft-serve",
    name: "Ube Blossom Soft Serve",
    category: "soft-serve",
    description:
      "Sweet, earthy ube soft serve with a soft floral finish. Priced per scoop.",
    image: "/images/menu/ube-blossom-soft-serve.png",
    price: 5,
    available: true,
    primaryFlavors: ["ube", "earthy", "sweet", "creamy"],
    sweetness: 4,
    matchaIntensity: 0,
    caffeine: "none",
    temperature: "frozen",
    texture: ["creamy", "soft", "cold"],
    pairsWith: ["ube-bloom-fusion", "yuzu-matcha-sparkle"],
    ingredients: ["milk", "cream", "ube puree", "sugar"],
    allergens: ["milk"],
    containsDairy: true,
    plantMilkAvailable: false,
    vegan: false,
    glutenFree: true,
  },
];

/** Paid extras. Not recommendable on their own — they modify an item. */
export type Modifier = {
  id: string;
  name: string;
  price: number;
  appliesTo: Category[];
  allergens: Allergen[];
};

export const MODIFIERS: Modifier[] = [
  {
    id: "oat-milk",
    name: "Oat Milk",
    price: 1,
    appliesTo: ["drinks"],
    allergens: [],
  },
  {
    id: "matcha-shot",
    name: "Matcha Shot",
    price: 1.5,
    appliesTo: ["drinks"],
    allergens: [],
  },
  {
    id: "sakura-cream-foam",
    name: "Sakura Cream Foam",
    price: 1,
    appliesTo: ["drinks"],
    allergens: ["milk"],
  },
  {
    id: "mochi-bites",
    name: "Mochi Bites",
    price: 1.5,
    appliesTo: ["soft-serve"],
    allergens: ["soy"],
  },
  {
    id: "strawberry-drizzle",
    name: "Strawberry Drizzle",
    price: 1,
    appliesTo: ["soft-serve"],
    allergens: [],
  },
];

/** Soft serve is sold by scoop count; the per-item price above is one scoop. */
export const SOFT_SERVE_SCOOPS = [
  { scoops: 1, price: 5 },
  { scoops: 2, price: 8 },
  { scoops: 3, price: 11 },
] as const;

export const MENU_BY_ID: Record<string, MenuItem> = Object.fromEntries(
  MENU.map((item) => [item.id, item]),
);

export function getItem(id: string): MenuItem | undefined {
  return MENU_BY_ID[id];
}

export function itemsByCategory(category: Category): MenuItem[] {
  return MENU.filter((item) => item.category === category);
}

/* ── Filtering ──────────────────────────────────────────────────────────────
 * The model translates a sentence into these conditions; this file decides
 * which items match. Matching is arithmetic, not judgement, so a filtered
 * result set is always correct even when the translation is not.
 */

export type MenuFilters = {
  temperature: "hot" | "iced" | null;
  /** Item sweetness must be at or below this. */
  maxSweetness: Level | null;
  /** Item matcha intensity must be at or above this. */
  minMatcha: Level | null;
  maxCaffeine: CaffeineLevel | null;
  dairyFree: boolean | null;
  vegan: boolean | null;
  glutenFree: boolean | null;
  maxPrice: number | null;
  category: Category | null;
};

export const EMPTY_FILTERS: MenuFilters = {
  temperature: null,
  maxSweetness: null,
  minMatcha: null,
  maxCaffeine: null,
  dairyFree: null,
  vegan: null,
  glutenFree: null,
  maxPrice: null,
  category: null,
};

export const FILTER_KEYS = Object.keys(EMPTY_FILTERS) as (keyof MenuFilters)[];

const CAFFEINE_ORDER: Record<CaffeineLevel, number> = {
  none: 0,
  low: 1,
  medium: 2,
  high: 3,
};

/** "hot-or-iced" satisfies either request; a chilled dessert satisfies neither. */
function servedAt(item: MenuItem, temperature: "hot" | "iced") {
  if (item.temperature === "hot-or-iced") return true;
  return item.temperature === temperature;
}

export function matchesFilters(item: MenuItem, filters: MenuFilters): boolean {
  if (!item.available) return false;
  if (filters.category !== null && item.category !== filters.category) return false;
  if (filters.temperature !== null && !servedAt(item, filters.temperature)) {
    return false;
  }
  if (filters.maxSweetness !== null && item.sweetness > filters.maxSweetness) {
    return false;
  }
  if (filters.minMatcha !== null && item.matchaIntensity < filters.minMatcha) {
    return false;
  }
  if (
    filters.maxCaffeine !== null &&
    CAFFEINE_ORDER[item.caffeine] > CAFFEINE_ORDER[filters.maxCaffeine]
  ) {
    return false;
  }
  if (filters.dairyFree === true && item.containsDairy) return false;
  if (filters.vegan === true && !item.vegan) return false;
  if (filters.glutenFree === true && !item.glutenFree) return false;
  if (filters.maxPrice !== null && item.price > filters.maxPrice) return false;

  return true;
}

export function applyFilters(filters: MenuFilters): MenuItem[] {
  return MENU.filter((item) => matchesFilters(item, filters));
}

export function activeFilterCount(filters: MenuFilters): number {
  return FILTER_KEYS.filter((key) => filters[key] !== null).length;
}

/**
 * Drops conditions that exclude nothing. A model that fills every field rather
 * than leaving nulls produces tags like "Matcha 0 of 5 or more", which read as
 * a constraint the guest asked for and did not.
 */
export function normalizeFilters(filters: MenuFilters): MenuFilters {
  return {
    ...filters,
    maxSweetness: filters.maxSweetness === 5 ? null : filters.maxSweetness,
    minMatcha: filters.minMatcha === 0 ? null : filters.minMatcha,
    maxCaffeine: filters.maxCaffeine === "high" ? null : filters.maxCaffeine,
  };
}

/** Merges a partial update from the model over whatever is already on screen. */
export function mergeFilters(
  current: MenuFilters,
  incoming: Partial<MenuFilters>,
): MenuFilters {
  const next = { ...current };

  for (const key of FILTER_KEYS) {
    const value = incoming[key];
    if (value !== undefined && value !== null) {
      // @ts-expect-error — key/value stay aligned by construction.
      next[key] = value;
    }
  }

  return next;
}

/* ── Pairing ───────────────────────────────────────────────────────────────
 * A pairing is an anchor — whatever the guest has already decided on — plus one
 * item from a different category. Any category can be the anchor: a guest who
 * has picked a dessert is choosing a drink, and a guest who has picked a soft
 * serve is choosing either.
 *
 * Two directions are dietary facts and are resolved entirely in code, so the
 * model has no way to hand back an item that violates them. The remaining
 * directions are taste judgement, where the model's read genuinely adds
 * value — code narrows the field, the model picks within it.
 */

export type PairingDirection =
  | "similar"
  | "contrast"
  | "light"
  | "rich"
  | "budget"
  | "dairy-free"
  | "vegan";

export const PAIRING_DIRECTIONS: PairingDirection[] = [
  "similar",
  "contrast",
  "light",
  "rich",
  "budget",
  "dairy-free",
  "vegan",
];

export const CATEGORIES: Category[] = ["drinks", "desserts", "soft-serve"];

/** What the guest sees a category called. Plural for a list, singular for one. */
export const CATEGORY_LABEL: Record<Category, string> = {
  drinks: "Drinks",
  desserts: "Desserts",
  "soft-serve": "Soft serve",
};

export const CATEGORY_NOUN: Record<Category, string> = {
  drinks: "drink",
  desserts: "dessert",
  "soft-serve": "soft serve",
};

export function isCategory(value: unknown): value is Category {
  return typeof value === "string" && (CATEGORIES as string[]).includes(value);
}

/** The categories that can be paired with an anchor — every one but its own. */
export function partnerCategories(anchor: Category): Category[] {
  return CATEGORIES.filter((category) => category !== anchor);
}

export function availableInCategory(category: Category): MenuItem[] {
  return MENU.filter((item) => item.category === category && item.available);
}

/**
 * The items the model is allowed to choose from for a given partner category
 * and direction — used to build the request's id enum, so an ineligible id
 * cannot be returned even by mistake.
 */
export function pairingCandidates(
  category: Category,
  direction: PairingDirection,
): MenuItem[] {
  const pool = availableInCategory(category);

  switch (direction) {
    case "dairy-free":
      return pool.filter((item) => !item.containsDairy);
    case "vegan":
      return pool.filter((item) => item.vegan);
    case "budget": {
      // The cheaper half of that category, by price.
      const sorted = [...pool].sort((a, b) => a.price - b.price);
      return sorted.slice(0, Math.ceil(sorted.length / 2));
    }
    case "similar":
    case "contrast":
    case "light":
    case "rich":
      return pool;
  }
}

/**
 * Directions worth offering for a category. Every soft serve we make contains
 * dairy, so "vegan" and "dairy-free" have nothing to choose from there — a
 * button that can only end in "nothing matches" should not be on screen.
 */
export function pairingDirections(category: Category): PairingDirection[] {
  return PAIRING_DIRECTIONS.filter(
    (direction) => pairingCandidates(category, direction).length > 0,
  );
}
