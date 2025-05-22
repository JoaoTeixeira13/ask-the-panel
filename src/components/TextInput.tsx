import { useState, useEffect, useRef } from "react";
import { QUESTION_MAX_LENGTH } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type TextInputProps = {
    value: string;
    onChange: (value: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

export const TextInput = ({ value, onChange, onKeyDown }: TextInputProps) => {
    const [shake, setShake] = useState(false);
    const isMobile = useMediaQuery();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (value.length === QUESTION_MAX_LENGTH) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), 100);
            return () => clearTimeout(timer);
        }
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(
                textareaRef.current.scrollHeight,
                104
            )}px`;
        }
    }, [value]);

    const getCharacterCountClass = (
        shake: boolean,
        length: number,
        max: number
    ) => {
        if (shake) return "text-coral shake";
        if (length >= max * 0.9) return "text-coral animate-pulse";
        if (length >= max * 0.8) return "text-darkCoral";
        return "text-muted";
    };

    return (
        <div className="relative flex-1">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Select your counsel above and ask..."
                className={`w-full rounded-lg bg-white text-gray-900 text-base focus:outline-none pr-16 leading-relaxed resize-none overflow-y-auto border border-secondary shadow-inner ${
                    isMobile ? "h-18 p-2" : "p-4"
                }`}
                required
                maxLength={QUESTION_MAX_LENGTH}
                style={{
                    maxHeight: "6.5rem",
                    lineHeight: "1.25rem",
                }}
            />
            <div
                className={`absolute bottom-2 right-2 text-xs transition-colors duration-300 ${getCharacterCountClass(
                    shake,
                    value.length,
                    QUESTION_MAX_LENGTH
                )}`}
            >
                {value.length}/{QUESTION_MAX_LENGTH}
            </div>
        </div>
    );
};
