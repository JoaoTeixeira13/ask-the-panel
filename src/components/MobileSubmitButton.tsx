"use client";
import { ArrowUpCircle } from "lucide-react";

type MobileSubmitButtonProps = { disabled: boolean };

export const MobileSubmitButton = ({ disabled }: MobileSubmitButtonProps) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            className="text-coral !px-2 hover:text-darkCoral"
            aria-label="Send"
        >
            <ArrowUpCircle className="w-6 h-6" />
        </button>
    );
};
