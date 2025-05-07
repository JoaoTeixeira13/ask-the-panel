"use client";
import { CharacterId } from "@/types/characters";
import { ResponseLength } from "@/types/responseLength";
import { CharacterSelector } from "./CharacterSelector";
import { ResponseLengthSelector } from "./ResponseLengthSelector";

interface QuestionFormProps {
    question: string;
    onQuestionChange: (value: string) => void;
    selectedCharacter: CharacterId;
    onSelectCharacter: (id: CharacterId) => void;
    responseLength: ResponseLength;
    onResponseLengthChange: (length: ResponseLength) => void;
    onSubmit: (e: React.FormEvent) => void;
    loading: boolean;
}

export function QuestionForm({
    question,
    onQuestionChange,
    selectedCharacter,
    onSelectCharacter,
    responseLength,
    onResponseLengthChange,
    onSubmit,
    loading,
}: QuestionFormProps) {
    return (
        <form
            onSubmit={onSubmit}
            className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md border border-secondary mb-8"
        >
            <textarea
                className="w-full border border-muted rounded-lg p-4 mb-6 bg-white text-lg focus:outline-none focus:ring-2 focus:ring-accent"
                rows={5}
                placeholder="Ask your question..."
                value={question}
                onChange={(e) => onQuestionChange(e.target.value)}
                required
            />

            <CharacterSelector
                selectedCharacter={selectedCharacter}
                onSelect={onSelectCharacter}
            />

            <ResponseLengthSelector
                value={responseLength}
                onChange={onResponseLengthChange}
            />

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
    );
}
