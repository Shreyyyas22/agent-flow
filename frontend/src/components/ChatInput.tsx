import React, { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea logic
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = `${Math.min(scrollHeight, 120)}px`; // Max height around 4 rows (120px)
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (trimmed && !isLoading) {
      onSend(trimmed);
      setValue("");
      // Reset height
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
    <div className="flex flex-col gap-1.5 w-full bg-slate-50 dark:bg-slate-900/50 p-2 rounded-xl border border-slate-200 dark:border-slate-800 transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/50">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, 2000))} // Enforce hard cap at 2000 chars
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          disabled={isLoading}
          className="flex-1 max-h-[120px] min-h-[40px] resize-none bg-transparent py-2.5 px-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none disabled:opacity-50"
        />

        <Button
          onClick={handleSend}
          disabled={isLoading || !value.trim()}
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 rounded-lg shadow-md hover:shadow-indigo-500/10 active:scale-95 disabled:scale-100 h-9 px-4 shrink-0"
        >
          {isLoading ? "..." : "Send"}
        </Button>
      </div>

      {/* Character count warning */}
      {charCount > 0 && (
        <div className="flex justify-end px-2">
          <span
            className={`text-[10px] font-medium transition-colors duration-200 ${
              isNearLimit
                ? "text-red-500 dark:text-red-400 font-semibold"
                : "text-slate-400 dark:text-slate-500"
            }`}
          >
            {charCount}/2000
          </span>
        </div>
      )}
    </div>
  );
}
