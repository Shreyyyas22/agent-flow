"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationRepository = void 0;
const db_1 = require("../config/db");
exports.conversationRepository = {
    async findById(id) {
        return db_1.prisma.conversation.findUnique({ where: { id } });
    },
    async create() {
        return db_1.prisma.conversation.create({ data: {} });
    },
    async findOrCreate(id) {
        if (id) {
            const existing = await this.findById(id);
            if (existing)
                return existing;
        }
        return this.create();
    },
};
