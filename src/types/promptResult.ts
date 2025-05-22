import { z } from "zod";
import { ChatMessageRole } from "./messages";

export const PromptResultSchema = z.object({
    role: z.literal(ChatMessageRole.Assistant),
    content: z.string(),
});

export type PromptResult = z.infer<typeof PromptResultSchema>;

export const AIModelResponseSchema = z.object({
    choices: z
        .array(
            z.object({
                message: z.object({
                    content: z.string(),
                }),
            })
        )
        .nonempty(),
});
