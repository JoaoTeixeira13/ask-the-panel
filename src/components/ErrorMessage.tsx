import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

type ErrorMessageProps = {
    message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    const [visible, setVisible] = useState(true);

    if (!message || !visible) return null;

    return (
        <div className="relative flex items-center gap-3 text-coral bg-coral/10 border border-coral rounded-xl p-4 mt-4 mb-4 text-sm font-medium">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1">{message}</span>
            <button
                onClick={() => setVisible(false)}
                className="absolute right-3 top-3 text-coral hover:text-darkCoral"
                aria-label="Dismiss error"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};
