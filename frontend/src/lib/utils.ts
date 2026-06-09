import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  const stored = localStorage.getItem("spur_session_id");
  if (stored) return stored;
  const newId = crypto.randomUUID();
  localStorage.setItem("spur_session_id", newId);
  return newId;
}
