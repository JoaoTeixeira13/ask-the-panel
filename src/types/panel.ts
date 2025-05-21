import { z } from "zod";
import { CharacterId } from "@/types/characters";
import { ResponseLength } from "@/types/responseLength";
import { QUESTION_MAX_LENGTH, QUESTION_MIN_LENGTH } from "@/lib/constants";
import { MessageRole } from "./messages";

export const MessageSchema = z.object({
    role: z.nativeEnum(MessageRole),
    content: z.string(),
});

export const PanelRequestSchema = z.object({
    selectedCharacter: z.nativeEnum(CharacterId),
    responseLength: z.nativeEnum(ResponseLength),
    question: z
        .string()
        .min(
            QUESTION_MIN_LENGTH,
            `Question must be at least ${QUESTION_MIN_LENGTH} characters long.`
        )
        .max(
            QUESTION_MAX_LENGTH,
            `Question must be no more than ${QUESTION_MAX_LENGTH} characters.`
        ),
    messageHistory: z.array(MessageSchema),
});

export type PanelRequest = z.infer<typeof PanelRequestSchema>;
