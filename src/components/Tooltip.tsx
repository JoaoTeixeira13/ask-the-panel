"use client";
import { ReactNode, useEffect, useId, useRef, useState } from "react";

interface TooltipProps {
    content: string;
    children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const tooltipId = useId();

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => setVisible(true), 1500);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setVisible(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-describedby={tooltipId}
        >
            {children}
            <div
                className={`absolute z-50 w-52 text-xs bg-luxury border border-muted rounded-md shadow-lg px-2 py-3 text-primary text-center bottom-full left-1/2 -translate-x-1/2 mb-3 transition-opacity duration-200 hidden pointer-fine:block ${
                    visible
                        ? "opacity-95 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                {content}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-luxury border-l border-t border-muted rotate-45" />
            </div>
        </div>
    );
}
