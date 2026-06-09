import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT ?? "3001"),
  DATABASE_URL: process.env.DATABASE_URL!,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:3000",
} as const;

// Fail fast on missing required vars
const required = ["DATABASE_URL", "GEMINI_API_KEY"] as const;
for (const key of required) {
  if (!env[key]) throw new Error(`Missing required environment variable: ${key}`);
}
