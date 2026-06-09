import { QueryProvider } from "@/components/QueryProvider";
import { ChatWindow } from "@/components/ChatWindow";

export default function Home() {
  return (
    <QueryProvider>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 flex items-center justify-center p-4">
        <ChatWindow />
      </main>
    </QueryProvider>
  );
}
