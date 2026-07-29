import OpenAI from "openai";
import {
  EMPTY_FILTERS,
  FILTER_KEYS,
  MENU,
  MENU_BY_ID,
  PAIRING_DIRECTIONS,
  itemsByCategory,
  matchesFilters,
  mergeFilters,
  normalizeFilters,
  type MenuFilters,
  type PairingDirection,
} from "../../data/menu";
import { findPairing, isPairingDirection } from "../_lib/find-pairing";
import { SYSTEM_PROMPT } from "./system-prompt";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/** Keeps the request bounded without losing the thread of a short consultation. */
const MAX_HISTORY_MESSAGES = 12;

const ALL_ITEM_IDS = MENU.map((item) => item.id);
const DRINK_IDS = itemsByCategory("drinks").map((item) => item.id);

/**
 * Longest name first, so "Sakura Blossom Milk" matches before a shorter name
 * that happens to be its prefix would.
 */
const NAME_MATCHERS = [...MENU]
  .sort((a, b) => b.name.length - a.name.length)
  .map((item) => ({
    id: item.id,
    // Escape the name, then allow it to match as a whole word/phrase only.
    pattern: new RegExp(
      `\\b${item.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "i",
    ),
  }));

/**
 * The model is told to put every item it names into itemIds (route.ts calls
 * this a hard rule) but does not reliably follow it — see the "mentions Cloud
 * Matcha, itemIds: []" failure mode. Rather than keep tightening the prompt,
 * this reads the id back out of the sentence itself, which cannot drift.
 */
function itemIdsMentionedIn(text: string): string[] {
  return NAME_MATCHERS.filter(({ pattern }) => pattern.test(text)).map(
    ({ id }) => id,
  );
}

/**
 * The model may only pick ids that already exist, so it cannot name an item we
 * don't sell. Prices and allergens never cross this boundary — the client
 * renders those from the menu module.
 */
const REPLY_SCHEMA = {
  type: "object",
  properties: {
    reply: {
      type: "string",
      description: "What Sakura says. No prices, no ingredient lists.",
    },
    itemIds: {
      type: "array",
      description: "Menu items to show as cards alongside the reply.",
      items: { type: "string", enum: ALL_ITEM_IDS },
    },
    allergyWarning: {
      type: "boolean",
      description: "True when the guest raised an allergy or dietary restriction.",
    },
    filters: {
      type: "object",
      description:
        "The guest's stated requirements as menu conditions. Null means the guest did not mention it.",
      properties: {
        temperature: {
          type: ["string", "null"],
          enum: ["hot", "iced", null],
        },
        maxSweetness: {
          type: ["integer", "null"],
          description: "0 = not sweet, 5 = dessert-sweet. 'Not too sweet' is 2.",
        },
        minMatcha: {
          type: ["integer", "null"],
          description: "0-5. Use when the guest wants a strong matcha flavour.",
        },
        maxCaffeine: {
          type: ["string", "null"],
          enum: ["none", "low", "medium", "high", null],
        },
        dairyFree: { type: ["boolean", "null"] },
        vegan: { type: ["boolean", "null"] },
        glutenFree: { type: ["boolean", "null"] },
        maxPrice: {
          type: ["integer", "null"],
          description: "Budget ceiling for a single item, in dollars.",
        },
        category: {
          type: ["string", "null"],
          enum: ["drinks", "desserts", "soft-serve", null],
        },
      },
      required: [
        "temperature",
        "maxSweetness",
        "minMatcha",
        "maxCaffeine",
        "dairyFree",
        "vegan",
        "glutenFree",
        "maxPrice",
        "category",
      ],
      additionalProperties: false,
    },
    pairingRequest: {
      type: "object",
      description:
        "Set when the guest wants a dessert paired with a drink. Each field stays null until they have actually told you that part.",
      properties: {
        wantsPairing: {
          type: "boolean",
          description:
            "True whenever the guest is asking for a dessert to go with a drink, even if they have not said which drink or what kind of pairing yet.",
        },
        drinkId: {
          type: ["string", "null"],
          description: "The drink they want paired.",
          enum: [...DRINK_IDS, null],
        },
        direction: {
          type: ["string", "null"],
          description:
            "The kind of pairing they asked for. 'something rich' or 'indulgent' is rich; 'light' or 'refreshing' is light; 'a vegan dessert' is vegan; 'dairy-free' is dairy-free; 'cheap' or 'affordable' is budget; 'goes well with' is similar; 'contrasting' or 'balance it out' is contrast.",
          enum: [...PAIRING_DIRECTIONS, null],
        },
      },
      required: ["wantsPairing", "drinkId", "direction"],
      additionalProperties: false,
    },
  },
  required: [
    "reply",
    "itemIds",
    "allergyWarning",
    "filters",
    "pairingRequest",
  ],
  additionalProperties: false,
} as const;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

/**
 * A tag the guest removed by hand comes back only when they raise the subject
 * again in their own words. Asking the model which conditions were "just
 * mentioned" does not work — it reports anything still visible in the history —
 * so the guest's latest message is matched directly.
 */
const FILTER_KEYWORDS: Record<keyof MenuFilters, RegExp> = {
  temperature: /\b(hot|iced|ice|cold|warm|chilled)\b/i,
  maxSweetness: /\b(sweet|sweetness|sugar|sugary|unsweetened)\b/i,
  minMatcha: /\bmatcha\b/i,
  maxCaffeine: /\b(caffeine|caffeinated|decaf|decaffeinated)\b/i,
  dairyFree: /\b(dairy|milk|lactose|milky|creamy)\b/i,
  vegan: /\bvegan\b/i,
  glutenFree: /\bgluten\b/i,
  maxPrice: /(\$|\b(price|budget|cheap|cheaper|afford|spend|cost|under|below)\b)/i,
  category: /\b(drink|drinks|dessert|desserts|soft serve|ice cream|sweets)\b/i,
};

/**
 * The model reliably identifies which drink the guest named but drops the
 * direction about half the time — "something rich" and "a vegan dessert" both
 * came back null while "a light dessert" worked. Read it out of the guest's own
 * wording instead. Dietary terms are checked first: they are hard constraints,
 * and "a rich vegan dessert" must resolve to vegan, not rich.
 */
const DIRECTION_KEYWORDS: [PairingDirection, RegExp][] = [
  ["vegan", /\bvegan\b/i],
  ["dairy-free", /(\bdairy[\s-]?free\b|\bno dairy\b|\blactose\b|\bwithout milk\b)/i],
  ["budget", /(\$|\b(budget|cheap|cheaper|affordable|inexpensive|spend less)\b)/i],
  ["light", /\b(light|lighter|refreshing|fresh|delicate|airy)\b/i],
  ["rich", /\b(rich|richer|indulgent|decadent|heavy|dense|luxurious)\b/i],
  ["contrast", /\b(contrast|contrasting|opposite|different|balance it out|cut through)\b/i],
  ["similar", /\b(similar|complement|complementary|matching|goes well|harmonious)\b/i],
];

/** Backstop for a pairing request the model failed to flag. */
const PAIRING_INTENT =
  /\b(pair|pairing|goes? (well )?with|to go with|match(es)? my|alongside)\b/i;

function directionFromText(text: string): PairingDirection | null {
  for (const [direction, pattern] of DIRECTION_KEYWORDS) {
    if (pattern.test(text)) return direction;
  }
  return null;
}

function parseHistory(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((entry): entry is ChatMessage => {
      if (typeof entry !== "object" || entry === null) return false;
      const { role, content } = entry as Record<string, unknown>;
      return (
        (role === "user" || role === "assistant") &&
        typeof content === "string" &&
        content.trim().length > 0
      );
    })
    .slice(-MAX_HISTORY_MESSAGES);
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "Missing OPENAI_API_KEY in .env.local" },
      { status: 500 },
    );
  }

  let message: string;
  let history: ChatMessage[];
  let currentFilters: Partial<MenuFilters>;
  let removedFilters: (keyof MenuFilters)[];
  let chosenDrinkId: string | null;
  let chosenDirection: PairingDirection | null;

  try {
    const body = await request.json();
    message = typeof body.message === "string" ? body.message.trim() : "";
    history = parseHistory(body.history);
    currentFilters =
      typeof body.filters === "object" && body.filters !== null
        ? body.filters
        : {};
    removedFilters = Array.isArray(body.removedFilters)
      ? body.removedFilters.filter((key: unknown): key is keyof MenuFilters =>
          FILTER_KEYS.includes(key as keyof MenuFilters),
        )
      : [];

    // What the guest clicked. An explicit choice is exact, so it outranks
    // anything the model infers from the sentence.
    const chosen = body.pairingRequest;
    chosenDrinkId =
      typeof chosen?.drinkId === "string" && DRINK_IDS.includes(chosen.drinkId)
        ? chosen.drinkId
        : null;
    chosenDirection = isPairingDirection(chosen?.direction)
      ? chosen.direction
      : null;
  } catch {
    return Response.json({ error: "Could not read the request." }, { status: 400 });
  }

  if (!message) {
    return Response.json({ error: "Message is empty." }, { status: 400 });
  }

  try {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        {
          role: "system",
          content:
            `Filters currently on the guest's screen: ${JSON.stringify(currentFilters)}. ` +
            "Anything absent here was either never set or the guest removed the tag themselves. " +
            "Carry these forward in your answer and do not re-add a condition they took off.",
        },
        { role: "user", content: message },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "sakura_reply",
          strict: true,
          schema: REPLY_SCHEMA,
        },
      },
    });

    const parsed = JSON.parse(response.output_text) as {
      reply: string;
      itemIds: string[];
      allergyWarning: boolean;
      filters: Partial<MenuFilters>;
      pairingRequest: {
        wantsPairing: boolean;
        drinkId: string | null;
        direction: PairingDirection | null;
      } | null;
    };

    const filters = normalizeFilters(
      mergeFilters(EMPTY_FILTERS, parsed.filters ?? {}),
    );

    for (const key of removedFilters) {
      if (!FILTER_KEYWORDS[key].test(message)) filters[key] = null;
    }

    // Roughly one turn in four the model invents a condition nobody asked for —
    // "maxCaffeine: none" on a request that never mentioned caffeine. A brand
    // new dietary or caffeine constraint has to appear somewhere in the guest's
    // own words or in what was already on screen.
    for (const key of ["maxCaffeine", "vegan", "glutenFree", "dairyFree"] as const) {
      const isNew = filters[key] !== null && currentFilters[key] == null;
      if (isNew && !FILTER_KEYWORDS[key].test(message)) filters[key] = null;
    }

    // Union with names found in the prose itself — see itemIdsMentionedIn.
    const candidateIds = new Set([
      ...parsed.itemIds,
      ...itemIdsMentionedIn(parsed.reply),
    ]);

    // Second gate: a schema-conforming id is still dropped if it left the menu,
    // and a highlighted item that fails the guest's own filters is a
    // contradiction on screen — the panel wins, not the prose.
    const itemIds = [...candidateIds]
      .filter((id) => id in MENU_BY_ID)
      .filter((id) => matchesFilters(MENU_BY_ID[id], filters));

    // Once the guest has named both a drink and a direction, the pairing runs
    // through the same code the panel uses — the chat model never picks the
    // dessert itself, it only collects the two inputs.
    const request = parsed.pairingRequest;

    // A clicked value is exact; the model's reading is the fallback.
    const drinkId = chosenDrinkId ?? request?.drinkId ?? null;

    // A named drink is the model's own signal that this turn is about pairing,
    // so reading the direction out of the wording here cannot fire by accident
    // on an ordinary "I want something light" request.
    const direction =
      chosenDirection ??
      request?.direction ??
      (drinkId ? directionFromText(message) : null);

    // Clicking a button is itself a pairing request, whatever the model decided.
    const wantsPairing =
      Boolean(request?.wantsPairing) ||
      Boolean(chosenDrinkId) ||
      Boolean(chosenDirection) ||
      PAIRING_INTENT.test(message);

    let pairing = null;
    let awaitingPairingChoice: "drink" | "direction" | null = null;

    if (drinkId && direction) {
      const outcome = await findPairing(drinkId, direction);
      if (outcome.ok && outcome.dessertId) {
        pairing = {
          drinkId: outcome.drinkId,
          dessertId: outcome.dessertId,
          reason: outcome.reason,
        };
      }
    } else if (wantsPairing) {
      // Mid-flow: tell the client which set of buttons to offer next.
      awaitingPairingChoice = drinkId ? "direction" : "drink";
    }

    return Response.json({
      reply: parsed.reply,
      itemIds,
      allergyWarning: parsed.allergyWarning,
      filters,
      pairing,
      awaitingPairingChoice,
      pairingRequest: { drinkId, direction },
    });
  } catch (error) {
    console.error("Ask Sakura API error:", error);

    return Response.json(
      { error: "Sakura could not answer just now. Try again in a moment." },
      { status: 500 },
    );
  }
}
