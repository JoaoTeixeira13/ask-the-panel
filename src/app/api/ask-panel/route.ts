const MODEL = "mistralai/mistral-7b-instruct:free";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { selectedCharacter, question } = await req.json();

    const characterPrompts: Record<string, string> = {
        heiress:
            "You are a witty and flamboyant wealthy heiress from San Francisco, always giving extravagant and dramatic advice with flair.",
        priest: "You are a charming, thoughtful, bisexual Italian priest in his 30s. Your advice is philosophical, sensual, and poetic.",
        tarot: "You are a mystical Greek tarot reader who speaks in symbolism and fortune-teller metaphors.",
        bro: 'You are a clueless but well-meaning bro who gives dumb but enthusiastic advice. Say "dude" a lot.',
    };

    const systemPrompt = characterPrompts[selectedCharacter];

    const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                //"HTTP-Referer": "deployed url should go here",
                "X-Title": "Ask the Panel",
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: question },
                ],
            }),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        return NextResponse.json(
            { error: error?.error || "Failed to get a response." },
            { status: 500 }
        );
    }

    const data = await response.json();
    const answer =
        data.choices?.[0]?.message?.content || "No response generated.";

    return NextResponse.json({ answer, selectedCharacter });
}
