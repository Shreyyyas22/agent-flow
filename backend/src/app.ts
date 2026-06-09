import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import chatRoutes from "./routes/chat.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json({ limit: "50kb" }));

// Rate limiter for message endpoint
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // max 20 requests per minute
  message: { error: "Too many requests. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/chat/message", limiter);
app.use("/chat/message", limiter);

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/chat", chatRoutes);
app.use("/chat", chatRoutes);
app.use(errorMiddleware);

export default app;
