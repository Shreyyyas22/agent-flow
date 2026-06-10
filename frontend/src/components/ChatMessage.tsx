import React from "react";
import ReactMarkdown from "react-markdown";
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { sender, text, createdAt, isError } = message;
  const isUser = sender === "user";

  const formattedTime = createdAt
    ? new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className={cn(
        "group flex w-full items-end gap-2.5 my-2.5 animate-fade-in-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* AI Bot Avatar */}
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md shadow-violet-500/20 text-sm ring-1 ring-white/10">
          ✦
        </div>
      )}

      <div className={cn("flex flex-col max-w-[78%] gap-0.5")}>
        <div
          className={cn(
            "px-4 py-3 text-sm transition-all duration-300 hover:translate-y-[-1px]",
            isUser
              ? "bg-gradient-to-br from-violet-600 to-purple-500 text-white rounded-2xl rounded-br-sm shadow-lg shadow-violet-500/10"
              : isError
                ? "bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-300 rounded-2xl rounded-bl-sm"
                : "bg-white/5 backdrop-blur-sm border border-white/10 text-slate-200 rounded-2xl rounded-bl-sm"
          )}
        >
          {isError && (
            <div className="flex items-center gap-1.5 mb-1.5 text-red-400">
              <span className="text-xs">⚠️</span>
              <span className="text-[11px] font-medium tracking-wide uppercase">
                Error
              </span>
            </div>
          )}

          {isUser ? (
            <div className="whitespace-pre-wrap break-words leading-relaxed">
              {text}
            </div>
          ) : (
            <div className="max-w-none break-words leading-relaxed">
              <ReactMarkdown
                components={{
                  strong: ({ children }) => (
                    <strong className="text-violet-400 font-semibold">
                      {children}
                    </strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-4 space-y-1 my-1.5">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-4 space-y-1 my-1.5">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-sm leading-relaxed">{children}</li>
                  ),
                  p: ({ children }) => (
                    <p className="m-0 leading-relaxed">{children}</p>
                  ),
                  code: ({ children, className }) => {
                    const isBlock = className?.includes("language-");
                    if (isBlock) {
                      return (
                        <code className={cn("text-violet-300 font-mono text-xs", className)}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className="bg-white/10 px-1.5 py-0.5 rounded text-violet-300 font-mono text-xs">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-black/30 rounded-lg p-3 overflow-x-auto my-2">
                      {children}
                    </pre>
                  ),
                }}
              >
                {text}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Timestamp */}
        {formattedTime && (
          <span
            className={cn(
              "text-[10px] text-slate-500/70 px-1 font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              isUser ? "text-right" : "text-left"
            )}
          >
            {formattedTime}
          </span>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-700 text-white shadow-sm font-semibold text-xs ring-1 ring-white/10">
          U
        </div>
      )}
    </div>
  );
}
