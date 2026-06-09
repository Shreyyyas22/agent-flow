"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
function errorMiddleware(err, _req, res, _next) {
    console.error("[Error]", err);
    if (res.headersSent)
        return;
    res.status(500).json({
        error: "Something went wrong. Please try again.",
    });
}
