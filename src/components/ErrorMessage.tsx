import { X, AlertTriangle } from "lucide-react";
import { useEffect, useRef } from "react";

type ErrorMessageProps = {
    message: string | null;
    onSetError: (value: string | null) => void;
};

export const ErrorMessage = ({ message, onSetError }: ErrorMessageProps) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => onSetError(null), 6000);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className="relative flex items-center gap-3 text-coral bg-coral/10 border border-coral rounded-xl p-4 mt-4 mb-4 text-sm font-medium">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1">{message}</span>
            <button
                onClick={() => onSetError(null)}
                className="absolute right-3 top-3 text-coral hover:text-darkCoral"
                aria-label="Dismiss error"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};
