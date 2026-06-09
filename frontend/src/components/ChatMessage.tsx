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
        "flex w-full items-end gap-3 my-3 animate-fade-in-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* AI Bot Avatar */}
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-indigo-600 text-white shadow-md font-bold text-xs">
          🤖
        </div>
      )}

      <div className={cn("flex flex-col max-w-[80%] gap-1")}>
        <div
          className={cn(
            "px-4 py-3 text-sm shadow-sm transition-all duration-300",
            isUser
              ? "bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-2xl rounded-br-sm"
              : isError
              ? "bg-red-50 dark:bg-red-950/20 text-red-600 border border-red-200 dark:border-red-800 rounded-2xl rounded-bl-sm"
              : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl rounded-bl-sm"
          )}
        >
          {isUser ? (
            <div className="whitespace-pre-wrap break-words">{text}</div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none break-words leading-relaxed">
              <ReactMarkdown
                components={{
                  // style list elements, code blocks, paragraphs nicely
                  ul: ({ children }) => (
                    <ul className="list-disc pl-4 space-y-0.5 my-1">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-4 space-y-0.5 my-1">{children}</ol>
                  ),
                  li: ({ children }) => <li className="text-xs my-0.5">{children}</li>,
                  p: ({ children }) => <p className="m-0 leading-relaxed">{children}</p>,
                  strong: ({ children }) => (
                    <strong className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {children}
                    </strong>
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
              "text-[10px] text-slate-400 dark:text-slate-500 px-1 font-medium tracking-wide",
              isUser ? "text-right" : "text-left"
            )}
          >
            {formattedTime}
          </span>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 shadow-sm font-semibold text-xs border border-slate-300 dark:border-slate-600">
          U
        </div>
      )}
    </div>
  );
}
