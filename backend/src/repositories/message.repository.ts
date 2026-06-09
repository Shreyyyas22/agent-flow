import { prisma } from "../config/db";
import { SenderType } from "../types";

export const messageRepository = {
  async create(conversationId: string, sender: SenderType, text: string) {
    return prisma.message.create({
      data: {
        conversationId,
        sender: sender === "user" ? "user" : "ai",
        text,
      },
    });
  },

  async findByConversationId(conversationId: string, limit = 10) {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      take: limit === -1 ? undefined : limit,
    });
  },

  async findHistory(conversationId: string) {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      select: { sender: true, text: true, createdAt: true },
    });
  },

  async findRecent(conversationId: string, limit = 10) {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: { sender: true, text: true },
    });
    return messages.reverse();
  },
};
