import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { env } from "../config/env";
import { SYSTEM_PROMPT } from "./knowledge";
import { MessageDTO } from "../types";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: SYSTEM_PROMPT,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  generationConfig: {
    maxOutputTokens: 500,
    temperature: 0.4,
  },
});

export async function generateReply(
  history: Pick<MessageDTO, "sender" | "text">[],
  userMessage: string
): Promise<string> {
  try {
    // Format history as Gemini chat turns
    const chatHistory = history.slice(-10).map((msg) => ({
      role: msg.sender === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(userMessage);
    const text = result.response.text();

    if (!text?.trim()) {
      return "I'm sorry, I wasn't able to generate a response. Please try again.";
    }

    return text.trim();
  } catch (error: unknown) {
    console.error("[LLM Error]", error);

    // Surface specific, friendly errors
    if (error instanceof Error) {
      if (error.message.includes("API_KEY")) {
        return "I'm temporarily unavailable due to a configuration issue. Please contact support.";
      }
      if (error.message.includes("RATE_LIMIT") || error.message.includes("429")) {
        return "I'm receiving too many requests right now. Please wait a moment and try again.";
      }
      if (error.message.includes("timeout") || error.message.includes("ECONNREFUSED")) {
        return "I'm having trouble connecting right now. Please try again in a few seconds.";
      }
    }

    return "I'm unable to respond right now. Please try again or contact support@spurstore.com.";
  }
}
