import React from "react";

type PanelResponseProps = {
    character: string;
    answer: string;
};

const characterNames: Record<string, string> = {
    heiress: "Wealthy Heiress",
    priest: "Italian Priest",
    tarot: "Greek Tarot Reader",
    bro: "Clueless Bro",
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
