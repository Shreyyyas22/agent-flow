import { Message, SendMessageRequest, SendMessageResponse } from "@/types/chat";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function sendMessage(
  payload: SendMessageRequest
): Promise<SendMessageResponse> {
  const res = await fetch(`${BASE_URL}/api/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error ?? "Failed to send message");
  }
  return res.json();
}

export async function fetchHistory(sessionId: string): Promise<Message[]> {
  const res = await fetch(`${BASE_URL}/api/chat/history/${sessionId}`);
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}
