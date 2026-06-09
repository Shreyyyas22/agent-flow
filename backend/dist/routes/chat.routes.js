"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../controllers/chat.controller");
const router = (0, express_1.Router)();
router.post("/message", chat_controller_1.chatController.sendMessage);
router.get("/history/:sessionId", chat_controller_1.chatController.getHistory);
exports.default = router;
