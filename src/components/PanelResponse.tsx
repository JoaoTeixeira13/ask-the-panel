"use client";
import { CharacterId } from "@/types/characters";
import React, { useEffect, useRef } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";
import { ChatMessage } from "@/types/messages";
import { Message } from "./Message";

type PanelResponseProps = {
    loading: boolean;
    selectedCharatcer: string;
    chatHistory: ChatMessage[];
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
    chatHistory: ChatMessage[],
    selectedCharacter: string
) => {
    if (loading) {
        return `${characterNames[selectedCharacter]} is thinking...`;
    }
    if (chatHistory.length === 0) {
        return `${characterNames[selectedCharacter]} awaits your question`;
    }
    if (!loading) {
        return `${characterNames[selectedCharacter]} says:`;
    }
};

export const PanelResponse = ({
    loading,
    selectedCharatcer,
    chatHistory,
    error,
    onSetError,
}: PanelResponseProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [chatHistory]);

    return (
        <div className="flex flex-1 flex-col justify-center mb-2 border border-primary rounded-xl shadow-md p-4 bg-background shadow-inner">
            <h2 className="text-xl font-semibold mb-6 text-luxury z-10 relative">
                {getPanelTitle(loading, chatHistory, selectedCharatcer)}
            </h2>

            <div
                ref={containerRef}
                className="bg-white p-4 rounded shadow h-86 overflow-y-auto"
            >
                {chatHistory.map((message: ChatMessage, index) => (
                    <Message key={index} message={message} />
                ))}
                {loading && <LoadingSpinner loading={loading} />}
            </div>

            {error && <ErrorMessage message={error} onSetError={onSetError} />}
        </div>
    );
};
