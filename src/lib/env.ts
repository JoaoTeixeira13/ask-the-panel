import { z } from "zod";

const envSchema = z.object({
    OPENROUTER_API_KEY: z.string().min(1, "OPENROUTER_API_KEY is required"),
    NEXT_PUBLIC_SITE_URL: z
        .string()
        .url("NEXT_PUBLIC_SITE_URL must be a valid URL"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    throw new Error("Missing or invalid environment variables.");
}

export const envVars = _env.data;
