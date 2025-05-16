import { getCharacterPrompt } from "@/lib/characters";
import { config } from "@/lib/config";
import { MessageRole } from "@/types/messageRole";
import { PanelRequestSchema } from "@/types/panel";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
    try {
        const { selectedCharacter, question, responseLength } =
            PanelRequestSchema.parse(await req.json());

        const characterPrompt = getCharacterPrompt(
            selectedCharacter,
            responseLength
        );

        const response = await fetch(config.openRouterUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${config.openRouterApiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": config.siteUrl,
                "X-Title": config.panelTitle,
            },
            body: JSON.stringify({
                model: config.model,
                messages: [
                    { role: MessageRole.System, content: characterPrompt },
                    { role: MessageRole.User, content: question },
                ],
            }),
        });

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
