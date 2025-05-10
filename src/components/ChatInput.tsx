"use client";
import { ResponseLength } from "@/types/responseLength";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { TextInput } from "./TextInput";
import { MobileSubmitButton } from "./MobileSubmitButton";
import { LengthToggleButton } from "./LengthToggleButton";

type ChatInputProps = {
    question: string;
    onChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    responseLength: ResponseLength;
    onToggleResponseLength: () => void;
    disabled: boolean;
};

export function ChatInput({
    question,
    onChange,
    onSubmit,
    responseLength,
    onToggleResponseLength,
    disabled,
}: ChatInputProps) {
    const isMobile = useMediaQuery();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!isMobile && e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    return (
        <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border border-secondary p-3 rounded-xl bg-lightBackground shadow-md"
        >
            <LengthToggleButton
                currentResponseLength={responseLength}
                onToggleResponseLength={onToggleResponseLength}
            />

            <TextInput
                value={question}
                onChange={onChange}
                onKeyDown={handleKeyDown}
            />

            {isMobile && <MobileSubmitButton disabled={disabled} />}
        </form>
    );
}
