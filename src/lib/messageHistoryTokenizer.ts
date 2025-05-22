import { ChatMessage } from "@/types/messages";

const getTokenCount: TokenCounter = (text) => Math.ceil(text.length / 4);

export const getMessageHistoryWithinTokenBudget = (
    messageHistory: ChatMessage[],
    systemPrompt: string,
    userQuestion: string
): ChatMessage[] => {
    const systemTokens = getTokenCount(systemPrompt);
    const userQuestionTokens = getTokenCount(userQuestion);
    const MAX_MODEL_TOKENS = 8000;
    const MAX_RESPONSE_TOKENS = 1000;

    const availableTokens =
        MAX_MODEL_TOKENS -
        MAX_RESPONSE_TOKENS -
        systemTokens -
        userQuestionTokens;

    let totalTokens = 0;
    const trimmedMessageHistory: ChatMessage[] = [];

    for (let i = messageHistory.length - 1; i >= 0; i--) {
        const message = messageHistory[i];
        const messageTokens = getTokenCount(message.content);

        if (totalTokens + messageTokens > availableTokens) {
            break;
        }

        totalTokens += messageTokens;
        trimmedMessageHistory.unshift(message);
    }

    return trimmedMessageHistory;
};
