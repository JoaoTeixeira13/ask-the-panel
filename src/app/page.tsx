"use client";

import { useState } from "react";
import { PanelResponse } from "@/components/PanelResponse";
import { CharacterId } from "@/types/characters";
import { ResponseLength } from "@/types/responseLength";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { QuestionForm } from "@/components/QuestionForm";

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

            <QuestionForm
                question={question}
                onQuestionChange={setQuestion}
                selectedCharacter={selectedCharacter}
                onSelectCharacter={setSelectedCharacter}
                responseLength={responseLength}
                onResponseLengthChange={setResponseLength}
                onSubmit={handleSubmit}
                loading={loading}
            />

            <LoadingSpinner loading={loading} />
            <PanelResponse
                character={result?.selectedCharacter}
                answer={result?.answer}
            />
        </main>
    );
}
