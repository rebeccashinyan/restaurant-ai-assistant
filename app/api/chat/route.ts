import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "Missing OPENAI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const response = await client.responses.create({
        model: "gpt-4o-mini",
        input: message,
    });

    return Response.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error("API error:", error);

    return Response.json(
      { error: "Backend API error. Check Terminal for details." },
      { status: 500 }
    );
  }
}