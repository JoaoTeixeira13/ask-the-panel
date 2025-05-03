import { z } from "zod";
import { CharacterId } from "@/types/characters";
import { ResponseLength } from "@/types/responseLength";

export const PanelRequestSchema = z.object({
    selectedCharacter: z.nativeEnum(CharacterId),
    responseLength: z.nativeEnum(ResponseLength),
    question: z.string().min(1),
});

export type PanelRequest = z.infer<typeof PanelRequestSchema>;
