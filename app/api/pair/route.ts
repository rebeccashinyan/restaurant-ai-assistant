import { findPairing, isPairingDirection } from "../_lib/find-pairing";
import { isCategory, type Category, type PairingDirection } from "../../data/menu";

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "Missing OPENAI_API_KEY in .env.local" },
      { status: 500 },
    );
  }

  let anchorId: string;
  let partnerCategory: Category;
  let direction: PairingDirection;

  try {
    const body = await request.json();
    anchorId = typeof body.anchorId === "string" ? body.anchorId : "";

    if (!isCategory(body.partnerCategory)) {
      return Response.json(
        { error: "Choose what to pair it with." },
        { status: 400 },
      );
    }
    partnerCategory = body.partnerCategory;

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

  const result = await findPairing(anchorId, partnerCategory, direction);

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json({
    anchorId: result.anchorId,
    partnerId: result.partnerId,
    reason: result.reason,
  });
}
