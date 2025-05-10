import { ResponseLength } from "./responseLength";

export enum CharacterId {
    Heiress = "heiress",
    Priest = "priest",
    Tarot = "tarot",
    Bro = "bro",
}

export type Character = {
    id: CharacterId;
    name: string;
    image: string;
    tooltip: string;
    quotes: string[];
};

export type LengthPrompt = Record<ResponseLength, string>;

export type CharacterPrompt = Record<CharacterId, LengthPrompt>;

export type CharacterQuote = Record<CharacterId, string>;
