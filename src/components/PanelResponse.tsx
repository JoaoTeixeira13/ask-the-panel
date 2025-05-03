import { CharacterId } from "@/types/characters";
import React from "react";

type PanelResponseProps = {
    character: CharacterId;
    answer: string;
};

const characterNames: Record<string, string> = {
    [CharacterId.Heiress]: "Wealthy Heiress",
    [CharacterId.Priest]: "Italian Priest",
    [CharacterId.Tarot]: "Greek Tarot Reader",
    [CharacterId.Bro]: "Clueless Bro",
};

export const PanelResponse: React.FC<PanelResponseProps> = ({
    character,
    answer,
}) => {
    return (
        <div className="border p-4 rounded-xl shadow-md bg-white mb-4">
            <h2 className="text-xl font-semibold mb-2">
                {characterNames[character]}
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{answer}</p>
        </div>
    );
};
