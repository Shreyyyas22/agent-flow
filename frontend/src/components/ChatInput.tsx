import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = `${Math.min(scrollHeight, 120)}px`;
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (trimmed && !isLoading) {
      onSend(trimmed);
      setValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const charCount = value.length;
  const isNearLimit = charCount >= 1800;

  return (
    <div className="glass-input rounded-2xl border border-white/[0.08] transition-all duration-300 focus-within:border-violet-500/50 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.15)]">
      <div className="flex items-end gap-2 p-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, 2000))}
          onKeyDown={handleKeyDown}
          placeholder="Ask about shipping, returns, orders..."
          rows={1}
          disabled={isLoading}
          className="flex-1 max-h-[120px] min-h-[40px] resize-none bg-transparent py-2.5 px-3 text-sm text-slate-200 placeholder-white/30 focus:outline-none disabled:opacity-50"
        />

        <button
          onClick={handleSend}
          disabled={isLoading || !value.trim()}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
            "bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20",
            "hover:from-violet-500 hover:to-purple-500 hover:shadow-violet-500/30",
            "active:scale-90 disabled:scale-100 disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex items-center justify-between px-3 pb-1.5">
        <span className="text-[10px] text-white/20 font-medium tracking-wide">
          Press Enter to send · Shift+Enter for new line
        </span>
        {charCount > 0 && (
          <span
            className={cn(
              "text-[10px] font-medium transition-colors duration-200",
              isNearLimit
                ? "text-red-400 font-semibold"
                : "text-white/30"
            )}
          >
            {charCount}/2000
          </span>
        )}
      </div>
    </div>
  );
}
