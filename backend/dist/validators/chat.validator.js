"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageSchema = void 0;
const zod_1 = require("zod");
exports.sendMessageSchema = zod_1.z.object({
    message: zod_1.z
        .string()
        .trim()
        .min(1, "Message cannot be empty")
        .max(2000, "Message cannot exceed 2000 characters"),
    sessionId: zod_1.z.string().uuid().optional(),
});
