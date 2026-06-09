import React from "react";
import { Message } from "@/types/chat";
import { Badge } from "./ui/badge";

interface ConversationAnalyticsProps {
  messages: Message[];
}

export function ConversationAnalytics({ messages }: ConversationAnalyticsProps) {
  const total = messages.length;
  const userCount = messages.filter((m) => m.sender === "user").length;
  const aiCount = messages.filter((m) => m.sender === "ai").length;

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50/80 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-medium">
      <span>Analytics:</span>
      <div className="flex gap-2">
        <Badge
          variant="secondary"
          className="bg-slate-200/50 hover:bg-slate-200/50 text-slate-600 dark:bg-slate-800 dark:text-slate-300 font-semibold px-2 py-0.5 rounded-full"
        >
          Total: {total}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-indigo-50 hover:bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 font-semibold px-2 py-0.5 rounded-full"
        >
          User: {userCount}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-emerald-50 hover:bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-full"
        >
          AI: {aiCount}
        </Badge>
      </div>
    </div>
  );
}
