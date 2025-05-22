export enum SystemRole {
    System = "system",
}

export enum ChatMessageRole {
    User = "user",
    Assistant = "assistant",
}

export type ChatMessage = {
    role: ChatMessageRole.User | ChatMessageRole.Assistant;
    content: string;
};

export type UploadModelMessage = {
    role: ChatMessageRole.User | ChatMessageRole.Assistant | SystemRole.System;
    content: string;
};
