import { CharacterId } from "@/types/characters";
import React from "react";

type PanelResponseProps = {
    character?: CharacterId;
    answer?: string;
};

const characterNames: Record<string, string> = {
    [CharacterId.Heiress]: "Tiffany Vandergilt",
    [CharacterId.Priest]: "Don Andrea Bellucci",
    [CharacterId.Tarot]: "Sibylla Nyx",
    [CharacterId.Bro]: "Chad 'Stacks' Ellison",
};

export const PanelResponse: React.FC<PanelResponseProps> = ({
    character,
    answer,
}) => {
    return (
        <div className="border border-accent p-4 rounded-xl shadow-md bg-background mb-4">
            <h2 className="text-xl font-semibold mb-2">
                {character
                    ? `${characterNames[character]} says:`
                    : "The panel awaits your question"}
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{answer}</p>
        </div>
    );
};
