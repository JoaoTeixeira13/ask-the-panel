import { z } from "zod";
import { CharacterId } from "@/types/characters";
import { ResponseLength } from "@/types/responseLength";

export const PanelRequestSchema = z.object({
    selectedCharacter: z.nativeEnum(CharacterId),
    responseLength: z.nativeEnum(ResponseLength),
    question: z
        .string()
        .min(10, "Question must be at least 10 characters long.")
        .max(160, "Question must be no more than 160 characters."),
});

export type PanelRequest = z.infer<typeof PanelRequestSchema>;
