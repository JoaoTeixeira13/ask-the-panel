"use client";
import { ArrowUpCircle } from "lucide-react";

export function MobileSubmitButton({ disabled }: { disabled: boolean }) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className="text-coral hover:text-darkCoral"
            aria-label="Send"
        >
            <ArrowUpCircle className="w-6 h-6" />
        </button>
    );
}
