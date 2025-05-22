export enum MessageRole {
    System = "system",
    User = "user",
    Assistant = "assistant",
}

export enum ChatMessageRole {
    User = "user",
    Assistant = "assistant",
}

export type ChatMessage = {
    role: ChatMessageRole.User | ChatMessageRole.Assistant;
    content: string;
};
