import OpenAI from "openai";
import { describeItem } from "../_lib/menu-context";
import {
  MENU_BY_ID,
  PAIRING_DIRECTIONS,
  pairingCandidates,
  type PairingDirection,
} from "../../data/menu";
import { DIRECTION_GUIDANCE } from "./direction-guidance";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function isPairingDirection(value: unknown): value is PairingDirection {
  return (
    typeof value === "string" &&
    (PAIRING_DIRECTIONS as string[]).includes(value)
  );
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "Missing OPENAI_API_KEY in .env.local" },
      { status: 500 },
    );
  }

  let drinkId: string;
  let direction: PairingDirection;

  try {
    const body = await request.json();
    drinkId = typeof body.drinkId === "string" ? body.drinkId : "";
    if (!isPairingDirection(body.direction)) {
      return Response.json(
        { error: "Choose a pairing direction." },
        { status: 400 },
      );
    }
    direction = body.direction;
  } catch {
    return Response.json({ error: "Could not read the request." }, { status: 400 });
  }

  const drink = MENU_BY_ID[drinkId];
  if (!drink || drink.category !== "drinks" || !drink.available) {
    return Response.json({ error: "Pick a drink from the menu first." }, { status: 400 });
  }

  const candidates = pairingCandidates(direction);

  if (candidates.length === 0) {
    return Response.json({ drinkId, dessertId: null, reason: null });
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
      return Response.json(
        { error: "Sakura could not find a pairing just now." },
        { status: 500 },
      );
    }

    return Response.json({
      drinkId,
      dessertId: parsed.dessertId,
      reason: parsed.reason,
    });
  } catch (error) {
    console.error("Ask Sakura pairing API error:", error);

    return Response.json(
      { error: "Sakura could not find a pairing just now." },
      { status: 500 },
    );
  }
}
