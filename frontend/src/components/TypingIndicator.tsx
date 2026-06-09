export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-sm w-fit shadow-sm border border-slate-200/50 dark:border-slate-700/50">
      <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}
