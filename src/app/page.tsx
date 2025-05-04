"use client";

import { useState } from "react";
import { PanelResponse } from "@/components/PanelResponse";
import { CharacterId } from "@/types/characters";
import { ResponseLength } from "@/types/responseLength";

const charactersList = [
    { id: CharacterId.Heiress, label: "Wealthy Heiress" },
    { id: CharacterId.Priest, label: "Italian Priest" },
    { id: CharacterId.Tarot, label: "Greek Tarot Reader" },
    { id: CharacterId.Bro, label: "Crypto Bro" },
];

export default function Home() {
    const [question, setQuestion] = useState("");
    const [selectedCharacter, setSelectedCharacter] = useState<CharacterId>(
        CharacterId.Heiress
    );
    const [responseLength, setResponseLength] = useState<ResponseLength>(
        ResponseLength.Long
    );
    const [result, setResult] = useState<{
        answer: string;
        selectedCharacter: CharacterId;
    } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCharacter) return;

        setLoading(true);
        setResult(null);

        const response = await fetch("/api/ask-panel", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                selectedCharacter,
                question,
                responseLength,
            }),
        });

        const data = await response.json();
        setResult({
            answer: data.answer,
            selectedCharacter: data.selectedCharacter,
        });
        setLoading(false);
    };

    return (
        <main className="max-w-2xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-serif font-semibold mb-10 text-center text-luxury tracking-wide">
                Ask the Panel
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md border border-secondary mb-8"
            >
                <textarea
                    className="w-full border border-muted rounded-lg p-4 mb-6 bg-white text-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    rows={5}
                    placeholder="Ask your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                />

                <div className="flex flex-wrap gap-4 mb-6 justify-center">
                    {charactersList.map((character) => (
                        <button
                            type="button"
                            key={character.id}
                            onClick={() => setSelectedCharacter(character.id)}
                            className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                                selectedCharacter === character.id
                                    ? "bg-luxury text-primary"
                                    : "bg-accent border-muted text-primary hover:bg-luxury hover:text-primary"
                            }`}
                        >
                            {character.label}
                        </button>
                    ))}
                </div>

                <div className="mb-6 flex justify-center">
                    <div className="flex border border-accent rounded-full overflow-hidden text-sm">
                        <button
                            type="button"
                            onClick={() =>
                                setResponseLength(ResponseLength.Short)
                            }
                            className={`px-4 py-2 text-primary ${
                                responseLength === ResponseLength.Short
                                    ? "bg-luxury"
                                    : "bg-accent"
                            }`}
                        >
                            Short
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setResponseLength(ResponseLength.Long)
                            }
                            className={`px-4 py-2 text-primary ${
                                responseLength === ResponseLength.Long
                                    ? "bg-luxury"
                                    : "bg-accent"
                            }`}
                        >
                            Long
                        </button>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading || !selectedCharacter}
                        className="bg-coral hover:bg-darkCoral text-primary px-8 py-3 w-24 rounded-lg font-semibold transition disabled:opacity-50"
                    >
                        {loading ? "Asking..." : "Ask"}
                    </button>
                </div>
            </form>
            <div className="h-12 flex justify-center items-center mt-3 mb-3">
                {loading && (
                    <img
                        src="images/coral.png"
                        alt="Loading..."
                        className="h-12 w-12 animate-spin rounded-full border border-dotted border-accent"
                    />
                )}
            </div>

            <PanelResponse
                character={result?.selectedCharacter}
                answer={result?.answer}
            />
        </main>
    );
}
