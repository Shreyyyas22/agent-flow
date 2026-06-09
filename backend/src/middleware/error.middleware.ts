import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("[Error]", err);

  if (res.headersSent) return;

  res.status(500).json({
    error: "Something went wrong. Please try again.",
  });
}
