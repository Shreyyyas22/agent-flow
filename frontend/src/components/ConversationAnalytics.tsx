import React from "react";
import { Message } from "@/types/chat";
import { Badge } from "./ui/badge";

interface ConversationAnalyticsProps {
  messages: Message[];
}

export function ConversationAnalytics({
  messages,
}: ConversationAnalyticsProps) {
  const total = messages.length;
  const userCount = messages.filter((m) => m.sender === "user").length;
  const aiCount = messages.filter((m) => m.sender === "ai").length;

  if (total === 0) return null;

  return (
    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white/[0.02] border-b border-white/5">
      <Badge
        variant="secondary"
        className="bg-white/5 hover:bg-white/10 text-slate-400 border-white/5 font-medium px-2.5 py-0.5 rounded-full text-[11px] transition-transform duration-200 hover:scale-105 cursor-default"
      >
        💬 {total}
      </Badge>
      <Badge
        variant="secondary"
        className="bg-violet-500/10 hover:bg-violet-500/15 text-violet-400 border-violet-500/10 font-medium px-2.5 py-0.5 rounded-full text-[11px] transition-transform duration-200 hover:scale-105 cursor-default"
      >
        You · {userCount}
      </Badge>
      <Badge
        variant="secondary"
        className="bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-400 border-emerald-500/10 font-medium px-2.5 py-0.5 rounded-full text-[11px] transition-transform duration-200 hover:scale-105 cursor-default"
      >
        AI · {aiCount}
      </Badge>
    </div>
  );
}
