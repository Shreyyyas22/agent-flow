export type SenderType = "user" | "ai";

export interface Message {
  sender: SenderType;
  text: string;
  createdAt?: string;
  isError?: boolean;
}

export interface SendMessageRequest {
  message: string;
  sessionId: string;
}

export interface SendMessageResponse {
  reply: string;
  sessionId: string;
}
