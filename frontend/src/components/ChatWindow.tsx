"use client";
import React, { useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { ConversationAnalytics } from "./ConversationAnalytics";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

export function ChatWindow() {
  const {
    messages,
    sendMsg,
    clearChat,
    isLoading,
    isLoadingHistory,
    sessionId,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <Card className="w-full max-w-2xl h-[700px] flex flex-col shadow-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-all duration-300">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 shadow-md">
            <span className="text-white text-base">🤖</span>
            <span className="absolute bottom-0 right-0 flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Spur Support
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider flex items-center gap-1">
              Online
            </span>
          </div>
        </div>

        <Button
          onClick={clearChat}
          variant="outline"
          size="sm"
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800 transition-all font-semibold rounded-lg"
        >
          Reset Session
        </Button>
      </CardHeader>

      {/* Analytics Bar */}
      <ConversationAnalytics messages={messages} />

      {/* Message Area */}
      <CardContent className="flex-1 overflow-hidden p-0 bg-slate-50/30 dark:bg-slate-900/10">
        <ScrollArea className="h-full px-6 py-4">
          {isLoadingHistory ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 py-20 text-slate-400 dark:text-slate-500">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
              <span className="text-xs font-semibold">Loading conversation...</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-20 text-center text-slate-400 dark:text-slate-500">
              <span className="text-3xl">👋</span>
              <div className="flex flex-col gap-1 px-4">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Welcome to Spur Store Support!
                </span>
                <span className="text-xs max-w-sm leading-relaxed">
                  How can I help you today? You can ask me about our shipping options, returns, support hours, or payment methods.
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg} />
              ))}
              {isLoading && (
                <div className="flex items-end gap-3 my-3 animate-fade-in-up">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md font-bold text-xs">
                    🤖
                  </div>
                  <div className="flex flex-col gap-1">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-6 py-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shrink-0">
        <ChatInput onSend={sendMsg} isLoading={isLoading} />
      </CardFooter>
    </Card>
  );
}
