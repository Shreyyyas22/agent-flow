"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = void 0;
const chat_service_1 = require("../services/chat.service");
const chat_validator_1 = require("../validators/chat.validator");
exports.chatController = {
    async sendMessage(req, res, next) {
        try {
            const parsed = chat_validator_1.sendMessageSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: parsed.error.flatten().fieldErrors,
                });
            }
            const { message, sessionId } = parsed.data;
            const result = await chat_service_1.chatService.sendMessage(message, sessionId);
            return res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    },
    async getHistory(req, res, next) {
        try {
            const { sessionId } = req.params;
            if (!sessionId) {
                return res.status(400).json({ error: "sessionId is required" });
            }
            const history = await chat_service_1.chatService.getHistory(sessionId);
            return res.status(200).json(history);
        }
        catch (error) {
            next(error);
        }
    },
};
