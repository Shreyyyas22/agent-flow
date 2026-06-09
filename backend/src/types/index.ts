export type SenderType = "user" | "ai";

export interface MessageDTO {
  sender: SenderType;
  text: string;
  createdAt?: Date;
}

export interface SendMessageRequest {
  message: string;
  sessionId?: string;
}

export interface SendMessageResponse {
  reply: string;
  sessionId: string;
}
