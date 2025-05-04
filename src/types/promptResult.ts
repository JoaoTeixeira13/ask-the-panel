import { CharacterId } from "./characters";
import { z } from "zod";

export const PromptResultSchema = z.object({
    answer: z.string(),
    selectedCharacter: z.nativeEnum(CharacterId),
});

export type PromptResut = z.infer<typeof PromptResultSchema>;
