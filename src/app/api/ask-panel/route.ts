import { getCharacterPrompt } from "@/lib/characters";
import { config } from "@/lib/config";
import { getMessageHistoryWithinTokenBudget } from "@/lib/messageHistoryTokenizer";
import {
    ChatMessageRole,
    SystemRole,
    UploadModelMessage,
} from "@/types/messages";
import { PanelRequestSchema } from "@/types/panel";
import {
    AIModelResponseSchema,
    PromptResult,
    PromptResultSchema,
} from "@/types/promptResult";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
    try {
        const { selectedCharacter, question, responseLength, messageHistory } =
            PanelRequestSchema.parse(await req.json());

        const characterPrompt = getCharacterPrompt(
            selectedCharacter,
            responseLength
        );

        const trimmedMessageHistory = getMessageHistoryWithinTokenBudget(
            messageHistory,
            characterPrompt,
            question
        );

        const messages: UploadModelMessage[] = [
            { role: SystemRole.System, content: characterPrompt },
            ...trimmedMessageHistory,
            { role: ChatMessageRole.User, content: question },
        ];

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
                messages,
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

        const rawData = await response.json();
        const parsed = AIModelResponseSchema.safeParse(rawData);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid data format from external API" },
                { status: 500 }
            );
        }

        const content = parsed.data.choices[0].message.content;

        const replyMessage: PromptResult = PromptResultSchema.parse({
            role: ChatMessageRole.Assistant,
            content,
        });

        return NextResponse.json(replyMessage);
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
