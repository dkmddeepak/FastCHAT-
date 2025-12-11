import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const userMessage = body.message || "";

  // FastChat AI Engine (OpenAI style response)
  const prompt = `You are FastChat, an intelligent assistant. Reply clearly: ${userMessage}`;

  // Actual AI request
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.FASTCHAT_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();

  const reply = data.choices?.[0]?.message?.content || "FastChat could not reply.";

  return NextResponse.json({ reply });
}
