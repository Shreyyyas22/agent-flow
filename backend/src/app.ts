import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import chatRoutes from "./routes/chat.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(helmet());
const allowedOrigins = env.CORS_ORIGIN.split(",").map((o) =>
  o.trim().replace(/\/$/, "")
);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.some((a) => origin === a || origin.endsWith(".vercel.app")))
        return callback(null, true);
      callback(null, false);
    },
  })
);
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
