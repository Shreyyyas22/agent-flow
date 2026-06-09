"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("./config/env");
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: env_1.env.CORS_ORIGIN }));
app.use(express_1.default.json({ limit: "50kb" }));
// Rate limiter for message endpoint
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // max 20 requests per minute
    message: { error: "Too many requests. Please slow down." },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/api/chat/message", limiter);
app.use("/chat/message", limiter);
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/chat", chat_routes_1.default);
app.use("/chat", chat_routes_1.default);
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
