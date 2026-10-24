import { z } from "zod";

/**
 * Public env vars, validated once at startup.
 * NEXT_PUBLIC_* values are inlined at build time, so they must be referenced literally.
 */
const EnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:8000"),
  NEXT_PUBLIC_USE_MOCKS: z
    .enum(["true", "false"])
    .default("true")
    .transform((v) => v === "true"),
});

export const env = EnvSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_USE_MOCKS: process.env.NEXT_PUBLIC_USE_MOCKS,
});
