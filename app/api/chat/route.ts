import OpenAI from "openai";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  EMPTY_FILTERS,
  FILTER_KEYS,
  MENU,
  MENU_BY_ID,
  PAIRING_DIRECTIONS,
  availableInCategory,
  isCategory,
  matchesFilters,
  mergeFilters,
  normalizeFilters,
  pairingDirections,
  partnerCategories,
  type Category,
  type MenuFilters,
  type MenuItem,
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
const AVAILABLE_ITEM_IDS = MENU.filter((item) => item.available).map(
  (item) => item.id,
);

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
        "Set when the guest wants two items paired. Each field stays null until they have actually told you that part.",
      properties: {
        wantsPairing: {
          type: "boolean",
          description:
            "True whenever the guest is asking for something to go with an item, whichever side they started from, even if they have not said which item or what kind of pairing yet.",
        },
        anchorId: {
          type: ["string", "null"],
          description:
            "The item the guest already has or has decided on — the one they want something to go WITH. Never the item you are being asked to find.",
          enum: [...AVAILABLE_ITEM_IDS, null],
        },
        partnerCategory: {
          type: ["string", "null"],
          description:
            "The part of the menu the guest wants the second item to come from. Must differ from the anchor's own category.",
          enum: [...CATEGORIES, null],
        },
        direction: {
          type: ["string", "null"],
          description:
            "The kind of pairing they asked for. 'something rich' or 'indulgent' is rich; 'light' or 'refreshing' is light; 'a vegan option' is vegan; 'dairy-free' is dairy-free; 'cheap' or 'affordable' is budget; 'goes well with' is similar; 'contrasting' or 'balance it out' is contrast.",
          enum: [...PAIRING_DIRECTIONS, null],
        },
        unmatchedAnchor: {
          type: ["string", "null"],
          description:
            "What the guest said they are having, quoted from their own message, when nothing on the menu is that thing — 'orange ice cream' when we make no orange soft serve. Null whenever the menu does have it.",
        },
      },
      required: [
        "wantsPairing",
        "anchorId",
        "partnerCategory",
        "direction",
        "unmatchedAnchor",
      ],
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
 * The model reliably identifies which item the guest named but drops the
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

/**
 * Words that name a part of the menu without naming an item. Deliberately
 * concrete: "sweet" is left out because "not too sweet" is a sweetness
 * condition, not a request for a dessert.
 */
const CATEGORY_KEYWORDS: [Category, RegExp][] = [
  ["soft-serve", /\b(soft[\s-]?serve|softserve|ice[\s-]?cream)\b/],
  [
    "desserts",
    /\b(dessert|desserts|cake|cheesecake|pastry|mochi|nerikiri|pudding|sorbet|crepe)\b/,
  ],
  ["drinks", /\b(drink|drinks|beverage|beverages|latte|tea|something to sip)\b/],
];

/**
 * A category word sitting after one of these belongs to the item the guest
 * already has, not the one they are asking for: in "a dessert with my drink",
 * "drink" is the anchor and "dessert" is what they want. The trailing word slot
 * carries the guest's own adjectives — "if I have matcha ice cream" has to read
 * as the anchor just as "with my soft serve" does.
 */
const ANCHOR_CUE =
  /\b(?:with|alongside|beside|having|have|had|ordered|order|getting|get|drinking|eating|got)\s+(?:my|the|a|an|this|some|our)?\s*((?:[\w-]+\s+){0,2})$/i;

type CategoryMention = {
  category: Category;
  index: number;
  anchorSide: boolean;
  /** The guest's own phrase for it, adjectives included: "orange ice cream". */
  phrase: string;
};

function categoryMentions(text: string): CategoryMention[] {
  const mentions: CategoryMention[] = [];

  for (const [category, pattern] of CATEGORY_KEYWORDS) {
    const scanner = new RegExp(pattern.source, "gi");
    let match: RegExpExecArray | null;

    while ((match = scanner.exec(text)) !== null) {
      const cue = ANCHOR_CUE.exec(text.slice(Math.max(0, match.index - 32), match.index));

      mentions.push({
        category,
        index: match.index,
        anchorSide: cue !== null,
        phrase: `${cue?.[1] ?? ""}${match[0]}`.trim(),
      });
    }
  }

  return mentions.sort((a, b) => a.index - b.index);
}

/**
 * Which side of the menu each half of the request is on. A guest can name the
 * part of the menu they are already eating from without naming the item —
 * "what dessert goes with my soft serve" pins the anchor to a category and no
 * further, which is still enough to keep the question that follows short.
 */
function categorySidesFromText(
  text: string,
  knownAnchorCategory: Category | null,
): { anchor: Category | null; anchorPhrase: string | null; partner: Category | null } {
  const mentions = categoryMentions(text);
  const anchorMention = mentions.find((entry) => entry.anchorSide) ?? null;

  const anchor = knownAnchorCategory ?? anchorMention?.category ?? null;

  // A pairing is always across two categories, so the anchor's own side is
  // never what they are asking Sakura to fill.
  const partner =
    mentions.find((entry) => !entry.anchorSide && entry.category !== anchor)
      ?.category ?? null;

  return { anchor, anchorPhrase: anchorMention?.phrase ?? null, partner };
}

/**
 * The words in a description that say what kind of thing it is rather than what
 * is in it. Stripping them leaves the part that has to exist on the menu:
 * "matcha" out of "matcha ice cream", "orange" out of "orange ice cream".
 */
const GENERIC_DESCRIPTION_WORDS =
  /\b(ice[\s-]?cream|soft[\s-]?serve|softserve|gelato|dessert|desserts|drink|drinks|beverage|latte|tea|cake|pastry|pudding|sorbet|mochi|crepe|flavou?r|flavou?red|the|a|an|my|our|some|this|that|with|and)\b/gi;

/**
 * Whether anything we actually make answers to a description. The model is the
 * only thing that can notice a guest naming something off-menu, but it says so
 * inconsistently — one turn in three it claimed we had no matcha ice cream
 * while the Sakura Matcha Soft Serve was sitting right there. Telling a guest
 * we don't sell something we do sell is the worst outcome available here, so
 * the claim is checked against the menu's own vocabulary before it is repeated.
 */
function distinctiveWords(phrase: string): string[] {
  return [
    ...new Set(
      (phrase.toLowerCase().replace(GENERIC_DESCRIPTION_WORDS, " ").match(/[a-z]{3,}/g) ?? [])
        .flatMap((word) => (word.endsWith("s") ? [word, word.slice(0, -1)] : [word])),
    ),
  ];
}

/** Everything an item can be described by, other than its category. */
function itemVocabulary(item: MenuItem): string {
  return [item.name, ...item.primaryFlavors, ...item.ingredients]
    .join(" ")
    .toLowerCase();
}

function itemsAnsweringTo(phrase: string, category: Category | null): MenuItem[] {
  const words = distinctiveWords(phrase);
  if (words.length === 0) return [];

  const pool = category
    ? availableInCategory(category)
    : MENU.filter((item) => item.available);

  return pool.filter((item) => {
    const vocabulary = itemVocabulary(item);
    return words.some((word) => vocabulary.includes(word));
  });
}

function menuAnswersTo(phrase: string, category: Category | null): boolean {
  // Nothing distinctive left to check — not enough to call anything missing.
  if (distinctiveWords(phrase).length === 0) return true;
  return itemsAnsweringTo(phrase, category).length > 0;
}

/**
 * The item a description can only mean, within the section of the menu the
 * guest has already pinned down. "Matcha ice cream" leaves one matcha soft
 * serve; "creamy soft serve" leaves all three and resolves to nothing, which is
 * the question the interface then asks.
 */
function soleItemAnsweringTo(phrase: string, category: Category): string | null {
  const matches = itemsAnsweringTo(phrase, category);
  return matches.length === 1 ? matches[0].id : null;
}

/** Question text is owned by the interface — see PAIRING_QUESTION. */
type PairingChoiceKind = "anchor" | "partner" | "direction";

/**
 * The prompt fixes these questions word for word and forbids listing the
 * options, because the options are already on the buttons directly below. The
 * model keeps appending them anyway — "would you prefer something rich, light,
 * or similar?" — which makes the guest read the same list from two places.
 * The wording is not a judgement call, so the interface owns it outright.
 */
const PAIRING_QUESTION: Record<PairingChoiceKind, string> = {
  anchor: "What are you having?",
  partner: "What would you like alongside it?",
  direction: "What kind of pairing would you like?",
};

/** Backstop for a pairing request the model failed to flag. */
const PAIRING_INTENT =
  /\b(pair|pairing|goes? (well )?with|to go with|with my|match(es)? my|alongside)\b/i;

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
  let chosenAnchorId: string | null;
  let chosenPartnerCategory: Category | null;
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
    chosenAnchorId =
      typeof chosen?.anchorId === "string" &&
      AVAILABLE_ITEM_IDS.includes(chosen.anchorId)
        ? chosen.anchorId
        : null;
    chosenPartnerCategory = isCategory(chosen?.partnerCategory)
      ? chosen.partnerCategory
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
        anchorId: string | null;
        partnerCategory: Category | null;
        direction: PairingDirection | null;
        unmatchedAnchor: string | null;
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

    // Asking where the café is does not withdraw the preferences already on
    // screen, but the model returns all-null filters for a café question and
    // that read as the guest clearing them. Changing the subject is not the
    // same as changing your mind: if nothing in their words touched any of
    // these conditions, the panel stays as they left it.
    const clearedEverything = FILTER_KEYS.every((key) => filters[key] === null);
    const raisedAnyCondition = FILTER_KEYS.some((key) =>
      FILTER_KEYWORDS[key].test(message),
    );

    if (clearedEverything && !raisedAnyCondition) {
      Object.assign(filters, mergeFilters(EMPTY_FILTERS, currentFilters));
    }

    // Once the guest has given an anchor, a side of the menu, and a direction,
    // the pairing runs through shared code — the chat model never picks the
    // second item itself, it only helps collect the three inputs.
    const pairingIntent = parsed.pairingRequest;

    // Items the guest named in this message, longest name first. A name typed
    // out is the strongest signal available: it cannot be a hallucination, and
    // it survives the model dropping the field.
    const namedInMessage = itemIdsMentionedIn(message);

    // Category words are read from the sentence with the named items removed,
    // so "a drink with my Sakura Matcha Soft Serve" does not count its own
    // anchor's name as a request for soft serve.
    const messageWithoutNames = namedInMessage.reduce(
      (text, id) =>
        text.replace(
          new RegExp(
            MENU_BY_ID[id].name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            "gi",
          ),
          " ",
        ),
      message,
    );

    const anchorFromMessage =
      namedInMessage.find((id) => MENU_BY_ID[id].available) ?? null;

    const sides = categorySidesFromText(
      messageWithoutNames,
      chosenAnchorId
        ? MENU_BY_ID[chosenAnchorId].category
        : anchorFromMessage
          ? MENU_BY_ID[anchorFromMessage].category
          : null,
    );

    // A clicked value is exact; the guest's own typing is next; the model's
    // reading is the last resort. It is the only source that can turn "matcha
    // ice cream" into the Sakura Matcha Soft Serve, so it is worth having — but
    // only when it agrees with the sides the guest's own words already fixed.
    const modelAnchor =
      pairingIntent?.anchorId &&
      AVAILABLE_ITEM_IDS.includes(pairingIntent.anchorId) &&
      MENU_BY_ID[pairingIntent.anchorId].category !== sides.partner &&
      (!sides.anchor || MENU_BY_ID[pairingIntent.anchorId].category === sides.anchor)
        ? pairingIntent.anchorId
        : null;

    // Last resort, and the only one that does not depend on the model holding
    // its shape: once the guest's own words have pinned the section of the menu,
    // a flavor they mentioned may leave exactly one item standing.
    const soleAnchorInCategory = sides.anchor
      ? soleItemAnsweringTo(messageWithoutNames, sides.anchor)
      : null;

    const anchorId =
      chosenAnchorId ?? anchorFromMessage ?? modelAnchor ?? soleAnchorInCategory;

    // The item pins the category; failing that, the guest may still have named
    // the part of the menu they are eating from without naming the item.
    const anchorCategory = anchorId ? MENU_BY_ID[anchorId].category : sides.anchor;

    // The model's own reading is deliberately not a source for the remaining
    // two fields. Asked to fill them it will invent an answer the guest never
    // gave — a click on "Ceremonial Matcha" came back with a finished pairing,
    // skipping the questions entirely. A click is exact and the guest's own
    // wording is evidence; anything else means we do not know yet, and asking
    // is the right failure.
    const partnerCandidate = chosenPartnerCategory ?? sides.partner;
    const partnerCategory =
      partnerCandidate && partnerCandidate !== anchorCategory
        ? partnerCandidate
        : null;

    const direction = chosenDirection ?? directionFromText(message);

    /**
     * A guest can name something we simply do not make — "orange ice cream" —
     * and asking "what are you having?" on top of that ignores what they just
     * told us. Only the model can judge that no item is the thing they
     * described, but it does not get to put words in their mouth: the phrase
     * has to be lifted from their own message, and it cannot be something we
     * actually sell.
     */
    const unmatchedAnchor = (() => {
      if (anchorId) return null;

      // The guest's own phrase, read straight out of their sentence: a flavor
      // that leaves nothing standing in the section they named is a gap we can
      // see without asking the model at all, and it is the same every time.
      if (
        sides.anchor &&
        sides.anchorPhrase &&
        distinctiveWords(sides.anchorPhrase).length > 0 &&
        itemsAnsweringTo(sides.anchorPhrase, sides.anchor).length === 0
      ) {
        return sides.anchorPhrase;
      }

      // Otherwise the model may still have spotted one — worded however the
      // guest worded it, and only if the menu really has no answer to it.
      const phrase = pairingIntent?.unmatchedAnchor?.trim().replace(/[.,!?]+$/, "");
      if (!phrase) return null;
      if (!message.toLowerCase().includes(phrase.toLowerCase())) return null;
      if (itemIdsMentionedIn(phrase).length > 0) return null;
      if (menuAnswersTo(phrase, anchorCategory)) return null;
      return phrase;
    })();

    // Clicking a button is itself a pairing request, whatever the model decided,
    // and so is naming an item and a different part of the menu in one breath.
    const wantsPairing =
      Boolean(pairingIntent?.wantsPairing) ||
      Boolean(chosenAnchorId) ||
      Boolean(chosenPartnerCategory) ||
      Boolean(chosenDirection) ||
      PAIRING_INTENT.test(message) ||
      Boolean(sides.anchor && sides.partner);

    // Union with names found in the prose itself — see itemIdsMentionedIn.
    const candidateIds = new Set([
      ...parsed.itemIds,
      ...itemIdsMentionedIn(parsed.reply),
    ]);

    // Second gate: a schema-conforming id is still dropped if it left the menu,
    // and a highlighted item that fails the guest's own filters is a
    // contradiction on screen — the panel wins, not the prose.
    //
    // A pairing turn renders its own two items, with a total, in the pairing
    // block. Reading names back out of the sentence there produced both items a
    // second time, stacked above the block that already showed them — so a
    // pairing turn contributes no cards of its own.
    const itemIds = wantsPairing
      ? []
      : [...candidateIds]
          .filter((id) => id in MENU_BY_ID)
          .filter((id) => matchesFilters(MENU_BY_ID[id], filters));

    let pairing = null;
    let awaitingPairingChoice: PairingChoiceKind | null = null;
    /** The options behind the question being asked, if one is being asked. */
    let pairingChoiceOptions: {
      categories: Category[];
      directions: PairingDirection[];
    } | null = null;
    /** Set when the interface, not the model, owns the sentence for this turn. */
    let handoverLine: string | null = null;
    /**
     * True once all three inputs have been spent on an attempt. A dead end is
     * as final as a pairing: keeping the inputs would re-run the same failing
     * request on the guest's next message.
     */
    let pairingSettled = false;

    if (wantsPairing && anchorId && partnerCategory && direction) {
      pairingSettled = true;
      const outcome = await findPairing(anchorId, partnerCategory, direction);

      if (!outcome.ok) {
        handoverLine = outcome.error;
      } else if (outcome.partnerId) {
        pairing = {
          anchorId: outcome.anchorId,
          partnerId: outcome.partnerId,
          reason: outcome.reason,
        };

        // The prompt asks for a short handover line and no item names, since
        // the second item has not been chosen yet at the point the sentence is
        // written. The model guesses anyway — it named two desserts while the
        // block below it showed a third. The block carries its own reason,
        // which is written after the choice and is therefore about the right
        // item, so the line above it only has to hand over.
        handoverLine = `Here is what I would pair with your ${MENU_BY_ID[anchorId].name}.`;
      } else {
        // Nothing in that category can satisfy the condition — every soft serve
        // we make contains dairy, so a vegan one does not exist. Say so rather
        // than letting the model talk around an empty result.
        handoverLine =
          `Nothing on our ${CATEGORY_LABEL[partnerCategory].toLowerCase()} list is ${direction}, ` +
          "so I can't build that pairing.";
      }
    } else if (wantsPairing) {
      // Mid-flow: tell the client which question is on the table and which
      // buttons belong under it.
      awaitingPairingChoice = !anchorId
        ? "anchor"
        : !partnerCategory
          ? "partner"
          : "direction";

      pairingChoiceOptions = {
        // Narrow the anchor question by whatever the guest has already told us.
        // "What dessert goes with my soft serve" names the section they are
        // eating from, so only that section is offered; failing that, anything
        // but the side they asked Sakura to fill, which their answer cannot
        // contradict.
        categories:
          awaitingPairingChoice === "anchor"
            ? anchorCategory
              ? [anchorCategory]
              : partnerCategory
                ? partnerCategories(partnerCategory)
                : CATEGORIES
            : awaitingPairingChoice === "partner" && anchorCategory
              ? partnerCategories(anchorCategory)
              : [],
        directions:
          awaitingPairingChoice === "direction" && partnerCategory
            ? pairingDirections(partnerCategory)
            : [],
      };
    }

    // A question the guest has half-answered with something we don't make gets
    // the correction first, then the question. Anything else and the answer
    // ignores what they just told us.
    const pairingQuestion = awaitingPairingChoice
      ? awaitingPairingChoice === "anchor" && unmatchedAnchor
        ? // Phrased to sit on the guest's own words whether they named a thing
          // we count ("a mango latte") or a thing we don't ("orange ice cream").
          `There's no ${unmatchedAnchor} on our menu. ${PAIRING_QUESTION.anchor}`
        : PAIRING_QUESTION[awaitingPairingChoice]
      : null;

    return Response.json({
      reply: pairingQuestion ?? handoverLine ?? parsed.reply,
      itemIds,
      allergyWarning: parsed.allergyWarning,
      filters,
      pairing,
      awaitingPairingChoice,
      pairingChoiceOptions,
      pairingRequest: pairingSettled
        ? { anchorId: null, partnerCategory: null, direction: null }
        : { anchorId, partnerCategory, direction },
    });
  } catch (error) {
    console.error("Ask Sakura API error:", error);

    return Response.json(
      { error: "Sakura could not answer just now. Try again in a moment." },
      { status: 500 },
    );
  }
}
