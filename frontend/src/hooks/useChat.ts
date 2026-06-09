"use client";
import { useState, useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage, fetchHistory } from "@/services/api";
import { Message } from "@/types/chat";
import { getOrCreateSessionId } from "@/lib/utils";

export function useChat() {
  const [sessionId, setSessionId] = useState<string>("");
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<Message[]>([]);

  // Initialize session ID on client mount
  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  // Load history on mount
  const { data: history, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["history", sessionId],
    queryFn: () => fetchHistory(sessionId),
    enabled: !!sessionId,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (history) {
      setMessages(history);
    }
  }, [history]);

  // Send message mutation
  const mutation = useMutation({
    mutationFn: (text: string) => sendMessage({ message: text, sessionId }),
    onMutate: (text) => {
      const userMsg: Message = {
        sender: "user",
        text,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);
    },
    onSuccess: (data) => {
      const aiMsg: Message = {
        sender: "ai",
        text: data.reply,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      // Refetch history in background to ensure sync
      queryClient.invalidateQueries({ queryKey: ["history", sessionId] });
    },
    onError: (error) => {
      const errMsg: Message = {
        sender: "ai",
        text: error instanceof Error ? error.message : "Something went wrong.",
        isError: true,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errMsg]);
    },
  });

  const sendMsg = useCallback(
    (text: string) => {
      if (!text.trim() || mutation.isPending || !sessionId) return;
      mutation.mutate(text);
    },
    [mutation, sessionId]
  );

  const clearChat = useCallback(() => {
    if (typeof window !== "undefined") {
      const newId = crypto.randomUUID();
      localStorage.setItem("spur_session_id", newId);
      setMessages([]);
      window.location.reload();
    }
  }, []);

  return {
    messages,
    sendMsg,
    clearChat,
    isLoading: mutation.isPending,
    isLoadingHistory,
    sessionId,
  };
}
