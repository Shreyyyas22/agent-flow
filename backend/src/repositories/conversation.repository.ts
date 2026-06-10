import { prisma } from "../config/db";

export const conversationRepository = {
  async findById(id: string) {
    return prisma.conversation.findUnique({ where: { id } });
  },

  async create(id?: string) {
    return prisma.conversation.create({ data: id ? { id } : {} });
  },

  async findOrCreate(id?: string) {
    if (id) {
      const existing = await this.findById(id);
      if (existing) return existing;
      return this.create(id);
    }
    return this.create();
  },

  async findAll() {
    return prisma.conversation.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });
  },
};
