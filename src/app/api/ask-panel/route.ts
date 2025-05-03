const MODEL = "mistralai/mistral-7b-instruct:free";

import { getCharacterPrompt, LENGTH_INSTRUCTIONS } from "@/lib/characters";
import { PanelRequestSchema } from "@/types/panel";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
    try {
        const body = PanelRequestSchema.parse(await req.json());
        const { selectedCharacter, question, responseLength } = body;

        const characterPrompt = getCharacterPrompt(
            selectedCharacter,
            responseLength
        );

        const systemPrompt = `${characterPrompt}\n\n${LENGTH_INSTRUCTIONS[responseLength]}`;

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
                {
                    error:
                        error?.error ||
                        "Failed to get a response from the model.",
                },
                { status: 500 }
            );
        }

        const data = await response.json();
        const answer =
            data.choices?.[0]?.message?.content || "No response generated.";

        return NextResponse.json({ answer, selectedCharacter });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: "Invalid request format", details: error.errors },
                { status: 400 }
            );
        }

        if (error instanceof Error) {
            console.error("Unexpected Error:", error);
            return NextResponse.json(
                {
                    error: "An unexpected error occurred",
                    details: error.message,
                },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "An unexpected error occurred", details: "Unknown error" },
            { status: 500 }
        );
    }
}
