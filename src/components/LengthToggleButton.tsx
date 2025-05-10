"use client";

import { MessageCircle, MessageSquare } from "lucide-react";
import { Tooltip } from "./Tooltip";
import { ResponseLength } from "@/types/responseLength";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

type LengthToggleButtonProps = {
    currentResponseLength: ResponseLength;
    onToggleResponseLength: () => void;
};

const getTooltipLabel = (current: ResponseLength) => {
    return current === ResponseLength.Long
        ? "Switch to Short answer"
        : "Switch to Long answer";
};

export const LengthToggleButton = ({
    currentResponseLength,
    onToggleResponseLength,
}: LengthToggleButtonProps) => {
    const isMobile = useMediaQuery();

    return (
        <Tooltip
            content={getTooltipLabel(currentResponseLength)}
            delayValue={300}
        >
            <div className="flex flex-col items-center">
                <button
                    type="button"
                    onClick={onToggleResponseLength}
                    className={`text-muted hover:text-coral ${
                        isMobile && "!px-2.5"
                    }`}
                    aria-label="Toggle answer length"
                >
                    {currentResponseLength === ResponseLength.Short ? (
                        <MessageSquare size={20} />
                    ) : (
                        <MessageCircle size={20} />
                    )}
                </button>
                <span className="text-xs text-muted sm:hidden mt-1">
                    {currentResponseLength === ResponseLength.Short
                        ? "Short"
                        : "Long"}
                </span>
            </div>
        </Tooltip>
    );
};
