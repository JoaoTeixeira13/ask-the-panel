"use client";

import React from "react";

interface TextInputAreaProps {
    value: string;
    onChange: (value: string) => void;
    maxLength?: number;
}

export const TextInputArea: React.FC<TextInputAreaProps> = ({
    value,
    onChange,
    maxLength = 160,
}) => {
    return (
        <div>
            <textarea
                className="w-full border border-secondary rounded-lg p-4 mb-6 bg-lightBackground text-lg focus:outline-none focus:ring-2 focus:ring-accent"
                rows={3}
                placeholder="Ask your question..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxLength={maxLength}
                required
            />
            <div className="text-right text-sm text-muted -mt-5 mb-4">
                {value.length}/{maxLength} characters
            </div>
        </div>
    );
};
