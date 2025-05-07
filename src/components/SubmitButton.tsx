"use client";

import React from "react";

interface SubmitButtonProps {
    loading: boolean;
    disabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
    loading,
    disabled,
}) => {
    return (
        <button
            type="submit"
            disabled={loading || disabled}
            className="bg-coral hover:bg-darkCoral text-primary px-8 py-3 w-24 rounded-lg font-semibold transition disabled:opacity-50"
        >
            {loading ? "Asking..." : "Ask"}
        </button>
    );
};
