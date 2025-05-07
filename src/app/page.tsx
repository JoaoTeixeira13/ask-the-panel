"use client";

import { useState } from "react";
import { PanelResponse } from "@/components/PanelResponse";
import { CharacterId } from "@/types/characters";
import { ResponseLength } from "@/types/responseLength";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { QuestionForm } from "@/components/QuestionForm";
import { PromptResultSchema, PromptResut } from "@/types/promptResult";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function Home() {
    const [question, setQuestion] = useState("");
    const [selectedCharacter, setSelectedCharacter] = useState<CharacterId>(
        CharacterId.Heiress
    );
    const [responseLength, setResponseLength] = useState<ResponseLength>(
        ResponseLength.Long
    );
    const [result, setResult] = useState<PromptResut | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCharacter) return;

        if (question.trim().length < 10) {
            setError("Your question is too short. Please provide more detail.");
            return;
        }

        if (question.length > 160) {
            setError(
                "Your question is too long. Try to keep it under 160 characters."
            );
            return;
        }

        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await fetch("/api/ask-panel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    selectedCharacter,
                    question,
                    responseLength,
                }),
            });

            const rawData = await response.json();

            const validatedResponse = PromptResultSchema.safeParse(rawData);

            if (!validatedResponse.success) {
                setError("Unexpected data format received from the panel.");
                return;
            }

            setResult(validatedResponse.data);
        } catch (error) {
            setError(`An error occured when submitting the form: ${error}`);
        } finally {
            setLoading(false);
        }
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
            {error && <ErrorMessage message={error} />}
            <PanelResponse
                answerCharacter={result?.selectedCharacter}
                answer={result?.answer}
                loading={loading}
                selectedCharatcer={selectedCharacter}
            />
        </main>
    );
}
