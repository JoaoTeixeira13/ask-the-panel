"use client";
import { CharacterId } from "@/types/characters";
import React from "react";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";

type PanelResponseProps = {
    answerCharacter?: CharacterId;
    answer?: string;
    loading: boolean;
    selectedCharatcer?: string;
    error: string | null;
    onSetError: (value: string | null) => void;
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
    error,
    onSetError,
}) => {
    return (
        <div className="flex-1 relative overflow-y-auto mb-2 border border-primary rounded-xl shadow-md p-4 bg-background shadow-inner">
            <h2 className="text-xl font-semibold mb-4 text-luxury z-10 relative">
                {getPanelTitle(loading, answerCharacter, selectedCharatcer)}
            </h2>

            {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <LoadingSpinner loading={loading} />
                </div>
            ) : (
                <>
                    <p className="text-gray-700 whitespace-pre-line">
                        {answer}
                    </p>
                    {error && (
                        <ErrorMessage message={error} onSetError={onSetError} />
                    )}
                </>
            )}
        </div>
    );
};
