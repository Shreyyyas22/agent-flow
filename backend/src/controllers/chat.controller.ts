import { Request, Response, NextFunction } from "express";
import { chatService } from "../services/chat.service";
import { sendMessageSchema } from "../validators/chat.validator";

export const chatController = {
  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = sendMessageSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        });
      }
      const { message, sessionId } = parsed.data;
      const result = await chatService.sendMessage(message, sessionId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { sessionId } = req.params;
      if (!sessionId) {
        return res.status(400).json({ error: "sessionId is required" });
      }
      const history = await chatService.getHistory(sessionId as string);
      return res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  },
};
