import { envVars } from "./env";

export const config = {
    openRouterApiKey: envVars.OPENROUTER_API_KEY,
    siteUrl: envVars.NEXT_PUBLIC_SITE_URL,
    model: "openai/gpt-oss-120b:free",
    panelTitle: "Ask the Panel",
    openRouterUrl: "https://openrouter.ai/api/v1/chat/completions",
};
