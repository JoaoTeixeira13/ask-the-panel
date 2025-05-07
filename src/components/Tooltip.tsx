"use client";
import { ReactNode, useState } from "react";

interface TooltipProps {
    content: string;
    children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onTouchStart={() => setVisible((prev) => !prev)}
            onTouchEnd={(e) => e.stopPropagation()}
        >
            {children}
            <div
                className={`absolute z-50 w-52 text-xs bg-luxury border border-muted rounded-md shadow-lg px-2 py-3 text-primary text-center bottom-full left-1/2 -translate-x-1/2 mb-3 transition-opacity duration-200 ${
                    visible
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                {content}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-luxury border-l border-t border-muted rotate-45" />
            </div>
        </div>
    );
}
