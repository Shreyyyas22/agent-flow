export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 my-2.5 animate-fade-in-up">
      {/* Bot Avatar — matches AI message avatar */}
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md shadow-violet-500/20 text-sm ring-1 ring-white/10">
        ✦
      </div>

      {/* Typing dots container */}
      <div className="relative">
        {/* Pulsing glow */}
        <div className="absolute inset-0 rounded-2xl rounded-bl-sm bg-violet-500/10 blur-md animate-pulse" />

        {/* Glass container */}
        <div className="relative flex items-center gap-1 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl rounded-bl-sm">
          <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce [animation-delay:0ms] [animation-duration:1s]" />
          <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce [animation-delay:200ms] [animation-duration:1s]" />
          <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce [animation-delay:400ms] [animation-duration:1s]" />
        </div>
      </div>
    </div>
  );
}
