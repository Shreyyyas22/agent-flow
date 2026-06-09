import { prisma } from "../config/db";

export const conversationRepository = {
  async findById(id: string) {
    return prisma.conversation.findUnique({ where: { id } });
  },

  async create() {
    return prisma.conversation.create({ data: {} });
  },

  async findOrCreate(id?: string) {
    if (id) {
      const existing = await this.findById(id);
      if (existing) return existing;
    }
    return this.create();
  },
};
