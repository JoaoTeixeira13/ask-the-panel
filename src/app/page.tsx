"use client";
import { CharacterSelector } from "@/components/CharacterSelector";
import { ChatInput } from "@/components/ChatInput";
import { PanelResponse } from "@/components/PanelResponse";
import { QUESTION_MAX_LENGTH, QUESTION_MIN_LENGTH } from "@/lib/constants";
import { CharacterId } from "@/types/characters";
import { PromptResultSchema, PromptResut } from "@/types/promptResult";
import { ResponseLength } from "@/types/responseLength";
import { useState } from "react";
import { useMediaQuery } from "./hooks/useMediaQuery";

const Home = () => {
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

    const isMobile = useMediaQuery();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCharacter) return;

        if (question.trim().length < QUESTION_MIN_LENGTH) {
            setError("Your question is too short. Please provide more detail.");
            return;
        }

        if (question.length > QUESTION_MAX_LENGTH) {
            setError(
                `Your question is too long. Try to keep it under ${QUESTION_MAX_LENGTH} characters.`
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
            setError(`An error occurred when submitting the form: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            className={`flex flex-col h-screen max-w-2xl mx-auto ${
                isMobile ? "p-6" : "p-4"
            }`}
        >
            <div className="mb-4">
                <h1 className="text-4xl font-serif text-center mb-6 text-luxury">
                    Ask the Panel
                </h1>
                <CharacterSelector
                    selectedCharacter={selectedCharacter}
                    onSelect={setSelectedCharacter}
                />
            </div>

            <PanelResponse
                answerCharacter={result?.selectedCharacter}
                answer={result?.answer}
                loading={loading}
                selectedCharatcer={selectedCharacter}
                error={error}
            />

            <ChatInput
                question={question}
                onChange={setQuestion}
                onSubmit={handleSubmit}
                responseLength={responseLength}
                onToggleResponseLength={() =>
                    setResponseLength(
                        responseLength === ResponseLength.Short
                            ? ResponseLength.Long
                            : ResponseLength.Short
                    )
                }
                disabled={loading || !selectedCharacter}
            />
        </main>
    );
};
export default Home;
