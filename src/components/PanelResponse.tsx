import { CharacterId } from "@/types/characters";
import React from "react";

type PanelResponseProps = {
    answerCharacter?: CharacterId;
    answer?: string;
    loading: boolean;
    selectedCharatcer?: string;
};

const characterNames: Record<string, string> = {
    [CharacterId.Heiress]: "Tiffany Vandergilt",
    [CharacterId.Priest]: "Don Andrea Bellucci",
    [CharacterId.Tarot]: "Sibylla Naxos",
    [CharacterId.Bro]: "Chad 'Stacks' Ellison",
};

const getPanelTitle = (
    loading: boolean,
    answerCharacter?: string,
    selectedCharacter?: string
) => {
    if (loading && selectedCharacter) {
        return `${characterNames[selectedCharacter]} is thinking...`;
    }
    if (!loading && answerCharacter) {
        return `${characterNames[answerCharacter]} says:`;
    }
    return "The panel awaits your question";
};

export const PanelResponse: React.FC<PanelResponseProps> = ({
    answerCharacter,
    answer,
    loading,
    selectedCharatcer,
}) => {
    return (
        <div className="border border-accent p-4 rounded-xl shadow-md bg-background mb-4">
            <h2 className="text-xl font-semibold mb-2 text-luxury">
                {getPanelTitle(loading, answerCharacter, selectedCharatcer)}
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{answer}</p>
        </div>
    );
};
