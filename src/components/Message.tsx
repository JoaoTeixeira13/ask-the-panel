"use client";
import React from "react";
import { ChatMessage, MessageRole } from "@/types/messages";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type MessageProps = {
    message: ChatMessage;
};

const getMessageClass = (role: MessageRole, isMobile: boolean) => {
    const base = "text-luxury py-4 px-6 mt-1 mb-1 rounded-xl";

    if (role === MessageRole.User) {
        return `${base} text-right bg-accent/20 w-fit ${
            isMobile ? "ml-5" : "ml-12"
        }`;
    }
    if (role === MessageRole.Assistant) {
        return `${base} text-left bg-coral/20 ${isMobile ? "mr-5" : "mr-12"}`;
    }
};

export const Message = ({ message }: MessageProps) => {
    const isMobile = useMediaQuery();

    return (
        <div
            className={`flex ${
                message.role === MessageRole.User
                    ? "justify-end"
                    : "justify-start"
            }`}
        >
            <div className={getMessageClass(message.role, isMobile)}>
                <span className="whitespace-pre-wrap w-fit">
                    {message.content}
                </span>
            </div>
        </div>
    );
};
