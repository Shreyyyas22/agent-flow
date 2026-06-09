"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    PORT: parseInt(process.env.PORT ?? "3001"),
    DATABASE_URL: process.env.DATABASE_URL,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    NODE_ENV: process.env.NODE_ENV ?? "development",
    CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:3000",
};
// Fail fast on missing required vars
const required = ["DATABASE_URL", "GEMINI_API_KEY"];
for (const key of required) {
    if (!exports.env[key])
        throw new Error(`Missing required environment variable: ${key}`);
}
