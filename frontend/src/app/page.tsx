import { QueryProvider } from "@/components/QueryProvider";
import { ChatWindow } from "@/components/ChatWindow";

export default function Home() {
  return (
    <QueryProvider>
      <main className="relative min-h-screen overflow-hidden gradient-mesh animate-gradient-shift flex flex-col items-center justify-center p-4">
        {/* Decorative gradient orbs for depth */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Top-left purple orb */}
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-violet-500/25 blur-[120px] animate-float" />
          {/* Bottom-right teal orb */}
          <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-cyan-400/20 blur-[140px] animate-float-delayed" />
          {/* Center violet accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-purple-600/15 blur-[100px]" />
        </div>

        {/* Chat Window */}
        <div className="relative z-10 w-full max-w-3xl">
          <ChatWindow />
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-4 flex items-center gap-2 text-xs text-white/25 select-none">
          <svg
            className="h-3.5 w-3.5 opacity-50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span className="tracking-wider font-medium">
            Powered by Gemini AI
          </span>
        </div>
      </main>
    </QueryProvider>
  );
}
