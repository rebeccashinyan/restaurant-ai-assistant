import OpenAI from "openai";
import {
  EMPTY_FILTERS,
  FILTER_KEYS,
  MENU,
  MENU_BY_ID,
  matchesFilters,
  mergeFilters,
  normalizeFilters,
  type MenuFilters,
} from "../../data/menu";
import { SYSTEM_PROMPT } from "./system-prompt";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/** Keeps the request bounded without losing the thread of a short consultation. */
const MAX_HISTORY_MESSAGES = 12;

const ALL_ITEM_IDS = MENU.map((item) => item.id);

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
  },
  required: ["reply", "itemIds", "allergyWarning", "filters"],
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
    };

    const filters = normalizeFilters(
      mergeFilters(EMPTY_FILTERS, parsed.filters ?? {}),
    );

    for (const key of removedFilters) {
      if (!FILTER_KEYWORDS[key].test(message)) filters[key] = null;
    }

    // Second gate: a schema-conforming id is still dropped if it left the menu,
    // and a highlighted item that fails the guest's own filters is a
    // contradiction on screen — the panel wins, not the prose.
    const itemIds = parsed.itemIds
      .filter((id) => id in MENU_BY_ID)
      .filter((id) => matchesFilters(MENU_BY_ID[id], filters));

    return Response.json({
      reply: parsed.reply,
      itemIds,
      allergyWarning: parsed.allergyWarning,
      filters,
    });
  } catch (error) {
    console.error("Ask Sakura API error:", error);

    return Response.json(
      { error: "Sakura could not answer just now. Try again in a moment." },
      { status: 500 },
    );
  }
}
