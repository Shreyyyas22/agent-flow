"use client";
import React, { useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { ConversationAnalytics } from "./ConversationAnalytics";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const QUICK_ACTIONS = [
  { label: "🚚 Shipping Info", message: "What are your shipping options and delivery times?" },
  { label: "↩️ Return Policy", message: "What is your return and refund policy?" },
  { label: "💳 Payment Options", message: "What payment methods do you accept?" },
  { label: "🕐 Support Hours", message: "What are your customer support hours?" },
];

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const truncatedSession = sessionId ? sessionId.slice(0, 8) : "—";

  return (
    <div className="glass rounded-2xl border border-white/10 w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden shadow-2xl shadow-violet-950/30">
      {/* ─── Premium Header ─── */}
      <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0 bg-gradient-to-r from-violet-700/30 via-purple-700/20 to-transparent">
        {/* Left: Avatar + Info */}
        <div className="flex items-center gap-3.5">
          {/* Bot Avatar */}
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25 animate-pulse-glow">
            <span className="text-white text-lg leading-none select-none">✦</span>
            {/* Online indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center">
              <span className="absolute h-3 w-3 rounded-full bg-emerald-400 animate-ping opacity-40" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-black/40" />
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-bold gradient-text tracking-tight">
              Spur AI Assistant
            </span>
            <span className="text-[11px] text-white/40 font-medium tracking-wide">
              Always here to help
            </span>
          </div>
        </div>

        {/* Right: Session Badge + Reset */}
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-white/[0.04] border-white/[0.08] text-white/30 text-[10px] font-mono px-2 py-0.5 rounded-lg hidden sm:inline-flex"
          >
            {truncatedSession}
          </Badge>

          <Button
            onClick={clearChat}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
            title="Reset conversation"
          >
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </Button>
        </div>
      </div>

      {/* ─── Analytics Bar ─── */}
      <ConversationAnalytics messages={messages} />

      {/* ─── Message Area ─── */}
      <div className="flex-1 overflow-hidden relative">
        {/* Subtle dotted pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.8) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <ScrollArea className="h-full custom-scrollbar">
          <div className="px-5 py-4">
            {isLoadingHistory ? (
              /* ─── Loading History Shimmer ─── */
              <div className="flex flex-col gap-4 py-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-end gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="h-8 w-8 rounded-full shimmer shrink-0" />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className={`h-4 shimmer rounded-lg ${i === 2 ? "w-3/4" : "w-1/2"}`} />
                      <div className={`h-4 shimmer rounded-lg ${i === 1 ? "w-2/3" : "w-1/3"}`} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center gap-2 pt-4">
                  <div className="h-5 w-5 rounded-full border-2 border-violet-500 border-t-transparent animate-spin-slow" />
                  <span className="text-xs text-white/30 font-medium">Loading conversation…</span>
                </div>
              </div>
            ) : messages.length === 0 ? (
              /* ─── Empty State ─── */
              <div className="flex flex-col items-center justify-center py-16 gap-6 animate-fade-in-up">
                {/* Large sparkle icon */}
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 border border-violet-500/20">
                    <span className="text-4xl select-none">✨</span>
                  </div>
                  <div className="absolute -inset-1 rounded-2xl bg-violet-500/10 blur-xl -z-10" />
                </div>

                <div className="flex flex-col items-center gap-2 text-center max-w-md">
                  <h2 className="text-xl font-bold gradient-text">
                    Welcome to Spur Store Support
                  </h2>
                  <p className="text-sm text-white/40 leading-relaxed">
                    I&apos;m your AI-powered assistant. Ask me anything about orders,
                    shipping, returns, or payments — I&apos;m always here to help.
                  </p>
                </div>

                {/* Quick action chips */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => sendMsg(action.message)}
                      className="glass-subtle px-4 py-2 rounded-xl border border-white/[0.08] text-[13px] text-white/60 font-medium hover:text-white/90 hover:border-violet-500/30 hover:bg-violet-500/10 transition-all duration-200 cursor-pointer active:scale-[0.97]"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* ─── Messages ─── */
              <div className="flex flex-col">
                {messages.map((msg, idx) => (
                  <ChatMessage key={idx} message={msg} />
                ))}
                {isLoading && (
                  <div className="flex items-end gap-3 my-3 animate-fade-in-up">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md text-xs">
                      ✦
                    </div>
                    <div className="flex flex-col gap-1">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* ─── Footer / Input ─── */}
      <div className="px-5 py-4 border-t border-white/[0.06] shrink-0 bg-gradient-to-t from-black/20 to-transparent">
        <ChatInput onSend={sendMsg} isLoading={isLoading} />
      </div>
    </div>
  );
}
