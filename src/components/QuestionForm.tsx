"use client";
import { CharacterId } from "@/types/characters";
import { ResponseLength } from "@/types/responseLength";
import { CharacterSelector } from "./CharacterSelector";
import { ResponseLengthSelector } from "./ResponseLengthSelector";
import { TextInputArea } from "./TextInputArea";
import { SubmitButton } from "./SubmitButton";

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
            className="bg-background backdrop-blur-md p-6 rounded-xl shadow-md border border-secondary mb-8"
        >
            <TextInputArea value={question} onChange={onQuestionChange} />

            <CharacterSelector
                selectedCharacter={selectedCharacter}
                onSelect={onSelectCharacter}
            />

            <ResponseLengthSelector
                value={responseLength}
                onChange={onResponseLengthChange}
            />

            <div className="flex justify-center">
                <SubmitButton loading={loading} disabled={!selectedCharacter} />
            </div>
        </form>
    );
}
