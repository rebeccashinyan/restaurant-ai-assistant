import OpenAI from "openai";
import { describeItem } from "./menu-context";
import {
  CATEGORY_NOUN,
  MENU_BY_ID,
  PAIRING_DIRECTIONS,
  pairingCandidates,
  type Category,
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
  | { ok: true; anchorId: string; partnerId: string | null; reason: string | null }
  | { ok: false; status: number; error: string };

/**
 * The one place the second item is actually chosen. The anchor is whatever the
 * guest has already settled on — a drink, a dessert, or a soft serve — and the
 * partner comes from a different category they picked. Every route into a
 * pairing calls this, so one reached by typing carries exactly the same
 * guarantee as one reached by clicking: the candidate list is narrowed in code
 * first, and the model can only answer with an id from that list.
 */
export async function findPairing(
  anchorId: string,
  partnerCategory: Category,
  direction: PairingDirection,
): Promise<PairingOutcome> {
  const anchor = MENU_BY_ID[anchorId];
  if (!anchor || !anchor.available) {
    return { ok: false, status: 400, error: "Pick an item from the menu first." };
  }

  if (anchor.category === partnerCategory) {
    return {
      ok: false,
      status: 400,
      error: "A pairing needs two different parts of the menu.",
    };
  }

  const candidates = pairingCandidates(partnerCategory, direction);

  // No candidate survives the guest's own condition — every soft serve we make
  // contains dairy, so a vegan one does not exist. The caller says so plainly
  // rather than the model talking around it.
  if (candidates.length === 0) {
    return { ok: true, anchorId, partnerId: null, reason: null };
  }

  const candidateIds = candidates.map((item) => item.id);

  const schema = {
    type: "object",
    properties: {
      partnerId: {
        type: "string",
        description: "The item you are pairing with what the guest is having.",
        enum: candidateIds,
      },
      reason: {
        type: "string",
        description:
          "One or two sentences on why this pairs well. No prices, no ingredient lists.",
      },
    },
    required: ["partnerId", "reason"],
    additionalProperties: false,
  } as const;

  const prompt = `You are Sakura, building a pairing at Sakura Bloom Matcha.

The guest has already chosen this ${CATEGORY_NOUN[anchor.category]}:
${describeItem(anchor)}

They want a ${CATEGORY_NOUN[partnerCategory]} to go with it.

Direction requested: ${direction}
${DIRECTION_GUIDANCE[direction]}

Choose exactly one item from this list — nothing outside it is eligible:

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
      partnerId: string;
      reason: string;
    };

    // Second gate: re-check against the real candidate set, not just the enum.
    if (!candidateIds.includes(parsed.partnerId)) {
      return {
        ok: false,
        status: 500,
        error: "Sakura could not find a pairing just now.",
      };
    }

    return {
      ok: true,
      anchorId,
      partnerId: parsed.partnerId,
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
