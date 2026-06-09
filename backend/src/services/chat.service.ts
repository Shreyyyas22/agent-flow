import { conversationRepository } from "../repositories/conversation.repository";
import { messageRepository } from "../repositories/message.repository";
import { generateReply } from "./llm.service";
import { MessageDTO } from "../types";

export const chatService = {
  async sendMessage(message: string, sessionId?: string) {
    // 1. Find or create conversation
    const conversation = await conversationRepository.findOrCreate(sessionId);

    // 2. Persist user message
    await messageRepository.create(conversation.id, "user", message);

    // 3. Get recent history for LLM context
    const history = await messageRepository.findRecent(conversation.id, 10);

    // 4. Generate AI reply
    const reply = await generateReply(history, message);

    // 5. Persist AI reply
    await messageRepository.create(conversation.id, "ai", reply);

    return { reply, sessionId: conversation.id };
  },

  async getHistory(sessionId: string): Promise<MessageDTO[]> {
    const conversation = await conversationRepository.findById(sessionId);
    if (!conversation) return [];
    return messageRepository.findHistory(sessionId);
  },
};
