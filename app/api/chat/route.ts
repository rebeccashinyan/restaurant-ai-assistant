import OpenAI from "openai";
import { MENU, MENU_BY_ID } from "../../data/menu";
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
  },
  required: ["reply", "itemIds", "allergyWarning"],
  additionalProperties: false,
} as const;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
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

  try {
    const body = await request.json();
    message = typeof body.message === "string" ? body.message.trim() : "";
    history = parseHistory(body.history);
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
    };

    // Second gate: even a schema-conforming id is dropped if it left the menu.
    const itemIds = parsed.itemIds.filter((id) => id in MENU_BY_ID);

    return Response.json({
      reply: parsed.reply,
      itemIds,
      allergyWarning: parsed.allergyWarning,
    });
  } catch (error) {
    console.error("Ask Sakura API error:", error);

    return Response.json(
      { error: "Sakura could not answer just now. Try again in a moment." },
      { status: 500 },
    );
  }
}
