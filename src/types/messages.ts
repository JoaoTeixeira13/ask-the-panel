export enum MessageRole {
    System = "system",
    User = "user",
    Assistant = "assistant",
}

export type ChatMessage = {
    role: MessageRole.User | MessageRole.Assistant;
    content: string;
};
