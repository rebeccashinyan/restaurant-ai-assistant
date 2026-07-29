import { findPairing, isPairingDirection } from "../_lib/find-pairing";
import type { PairingDirection } from "../../data/menu";

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

  const result = await findPairing(drinkId, direction);

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json({
    drinkId: result.drinkId,
    dessertId: result.dessertId,
    reason: result.reason,
  });
}
