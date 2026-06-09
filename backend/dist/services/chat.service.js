"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = void 0;
const conversation_repository_1 = require("../repositories/conversation.repository");
const message_repository_1 = require("../repositories/message.repository");
const llm_service_1 = require("./llm.service");
exports.chatService = {
    async sendMessage(message, sessionId) {
        // 1. Find or create conversation
        const conversation = await conversation_repository_1.conversationRepository.findOrCreate(sessionId);
        // 2. Persist user message
        await message_repository_1.messageRepository.create(conversation.id, "user", message);
        // 3. Get recent history for LLM context
        const history = await message_repository_1.messageRepository.findRecent(conversation.id, 10);
        // 4. Generate AI reply
        const reply = await (0, llm_service_1.generateReply)(history, message);
        // 5. Persist AI reply
        await message_repository_1.messageRepository.create(conversation.id, "ai", reply);
        return { reply, sessionId: conversation.id };
    },
    async getHistory(sessionId) {
        const conversation = await conversation_repository_1.conversationRepository.findById(sessionId);
        if (!conversation)
            return [];
        return message_repository_1.messageRepository.findHistory(sessionId);
    },
};
