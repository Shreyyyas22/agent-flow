"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRepository = void 0;
const db_1 = require("../config/db");
exports.messageRepository = {
    async create(conversationId, sender, text) {
        return db_1.prisma.message.create({
            data: {
                conversationId,
                sender: sender === "user" ? "user" : "ai",
                text,
            },
        });
    },
    async findByConversationId(conversationId, limit = 10) {
        return db_1.prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: "asc" },
            take: limit === -1 ? undefined : limit,
        });
    },
    async findHistory(conversationId) {
        return db_1.prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: "asc" },
            select: { sender: true, text: true, createdAt: true },
        });
    },
    async findRecent(conversationId, limit = 10) {
        const messages = await db_1.prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: "desc" },
            take: limit,
            select: { sender: true, text: true },
        });
        return messages.reverse();
    },
};
