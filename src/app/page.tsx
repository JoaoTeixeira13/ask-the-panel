"use client";

import { useState } from "react";
import { PanelResponse } from "@/components/PanelResponse";
import { CharacterId } from "@/types/characters";
import { ResponseLength } from "@/types/responseLength";

const charactersList = [
    { id: CharacterId.Heiress, label: "Wealthy Heiress" },
    { id: CharacterId.Priest, label: "Italian Priest" },
    { id: CharacterId.Tarot, label: "Greek Tarot Reader" },
    { id: CharacterId.Bro, label: "Clueless Bro" },
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
        <main className="max-w-xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Ask the Panel
            </h1>

            <form onSubmit={handleSubmit} className="mb-6">
                <textarea
                    className="w-full border rounded-lg p-3 mb-4"
                    rows={4}
                    placeholder="Ask your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                />

                <div className="flex flex-wrap gap-4 mb-4 justify-center">
                    {charactersList.map((char) => (
                        <button
                            type="button"
                            key={char.id}
                            onClick={() => setSelectedCharacter(char.id)}
                            className={`px-4 py-2 rounded-full border cursor-pointer ${
                                selectedCharacter === char.id
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                        >
                            {char.label}
                        </button>
                    ))}
                </div>

                <div className="mb-6 flex justify-center">
                    <div className="flex border rounded-full overflow-hidden text-sm">
                        <button
                            type="button"
                            onClick={() =>
                                setResponseLength(ResponseLength.Short)
                            }
                            className={`px-4 py-2 transition-all duration-200 cursor-pointer ${
                                responseLength === ResponseLength.Short
                                    ? "bg-green-600 text-white"
                                    : "bg-white text-gray-700"
                            }`}
                        >
                            Short
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setResponseLength(ResponseLength.Long)
                            }
                            className={`px-4 py-2 transition-all duration-200 cursor-pointer ${
                                responseLength === ResponseLength.Long
                                    ? "bg-green-600 text-white"
                                    : "bg-white text-gray-700"
                            }`}
                        >
                            Long
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !selectedCharacter}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                    {loading ? "Asking..." : "Ask"}
                </button>
            </form>

            {result?.answer && (
                <PanelResponse
                    character={result.selectedCharacter ?? ""}
                    answer={result.answer}
                />
            )}
        </main>
    );
}
