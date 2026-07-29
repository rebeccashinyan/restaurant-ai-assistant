import OpenAI from "openai";
import { describeItem } from "./menu-context";
import {
  MENU_BY_ID,
  PAIRING_DIRECTIONS,
  pairingCandidates,
  type PairingDirection,
} from "../../data/menu";
import { DIRECTION_GUIDANCE } from "../pair/direction-guidance";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export function isPairingDirection(value: unknown): value is PairingDirection {
  return (
    typeof value === "string" && (PAIRING_DIRECTIONS as string[]).includes(value)
  );
}

export type PairingOutcome =
  | { ok: true; drinkId: string; dessertId: string | null; reason: string | null }
  | { ok: false; status: number; error: string };

/**
 * The one place a dessert is actually chosen. The panel and the chatbot both
 * call this, so a pairing reached by typing carries exactly the same guarantee
 * as one reached by clicking: the candidate list is narrowed in code first, and
 * the model can only answer with an id from that list.
 */
export async function findPairing(
  drinkId: string,
  direction: PairingDirection,
): Promise<PairingOutcome> {
  const drink = MENU_BY_ID[drinkId];
  if (!drink || drink.category !== "drinks" || !drink.available) {
    return { ok: false, status: 400, error: "Pick a drink from the menu first." };
  }

  const candidates = pairingCandidates(direction);

  if (candidates.length === 0) {
    return { ok: true, drinkId, dessertId: null, reason: null };
  }

  const candidateIds = candidates.map((item) => item.id);

  const schema = {
    type: "object",
    properties: {
      dessertId: {
        type: "string",
        description: "The dessert you are pairing with the drink.",
        enum: candidateIds,
      },
      reason: {
        type: "string",
        description:
          "One or two sentences on why this pairs well. No prices, no ingredient lists.",
      },
    },
    required: ["dessertId", "reason"],
    additionalProperties: false,
  } as const;

  const prompt = `You are Sakura, pairing a dessert with a drink at Sakura Bloom Matcha.

The guest is having:
${describeItem(drink)}

Direction requested: ${direction}
${DIRECTION_GUIDANCE[direction]}

Choose exactly one dessert from this list — nothing outside it is eligible:

${candidates.map(describeItem).join("\n\n")}

Never state a price or an ingredient list in "reason". Two sentences at most, warm and concrete.`;

  try {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [{ role: "system", content: prompt }],
      text: {
        format: {
          type: "json_schema",
          name: "sakura_pairing",
          strict: true,
          schema,
        },
      },
    });

    const parsed = JSON.parse(response.output_text) as {
      dessertId: string;
      reason: string;
    };

    // Second gate: re-check against the real candidate set, not just the enum.
    if (!candidateIds.includes(parsed.dessertId)) {
      return {
        ok: false,
        status: 500,
        error: "Sakura could not find a pairing just now.",
      };
    }

    return {
      ok: true,
      drinkId,
      dessertId: parsed.dessertId,
      reason: parsed.reason,
    };
  } catch (error) {
    console.error("Ask Sakura pairing error:", error);

    return {
      ok: false,
      status: 500,
      error: "Sakura could not find a pairing just now.",
    };
  }
}
