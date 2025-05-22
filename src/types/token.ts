type TokenCounter = (text: string) => number;
export const getTokenCount: TokenCounter = (text) => Math.ceil(text.length / 4);
