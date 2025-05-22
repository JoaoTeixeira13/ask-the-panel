import { ChatMessage } from "@/types/messages";
import { getTokenCount } from "@/types/token";

export const trimMessageHistoryContextMemory = (
    messageHistory: ChatMessage[],
    systemPrompt: string,
    userQuestion: string
): ChatMessage[] => {
    const systemTokens = getTokenCount(systemPrompt);
    const userQuestionTokens = getTokenCount(userQuestion);
    const MAX_MODEL_TOKENS = 8000;
    const MAX_RESPONSE_TOKENS = 1000;

    const availableTokensForHistory =
        MAX_MODEL_TOKENS -
        MAX_RESPONSE_TOKENS -
        systemTokens -
        userQuestionTokens;

    let totalTokens = 0;
    const trimmedHistory: ChatMessage[] = [];

    for (let i = messageHistory.length - 1; i >= 0; i--) {
        const message = messageHistory[i];
        const tokens = getTokenCount(message.content);

        if (totalTokens + tokens > availableTokensForHistory) {
            break;
        }

        totalTokens += tokens;
        trimmedHistory.unshift(message);
    }

    return trimmedHistory;
};
