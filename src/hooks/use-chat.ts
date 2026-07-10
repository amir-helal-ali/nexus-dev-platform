"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

// ============================================================
// Hook: useChat
// إدارة الاتصال بالـ WebSocket والمحادثات اللحظية
// ============================================================

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  type: string;
  createdAt: string;
  isRead?: boolean;
  failed?: boolean;
}

export interface Conversation {
  id: string;
  subject: string;
  type: string;
  status: string;
  priority: string;
  lastMessage: string | null;
  lastMessageAt: string | null;
  unreadByUser: number;
  unreadByAdmin: number;
  user?: { id: string; name: string; email: string; phone?: string | null; avatar?: string | null };
  admin?: { id: string; name: string; email: string; avatar?: string | null } | null;
  messages?: ChatMessage[];
}

let socketInstance: Socket | null = null;

function getSocket(): Socket | null {
  if (typeof window === "undefined") return null;
  if (socketInstance && socketInstance.connected) return socketInstance;

  socketInstance = io("/?XTransformPort=3003", {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10,
  });

  socketInstance.on("connect", () => {
    console.log("[Chat] Connected:", socketInstance?.id);
  });

  socketInstance.on("disconnect", () => {
    console.log("[Chat] Disconnected");
  });

  socketInstance.on("connect_error", (err) => {
    console.error("[Chat] Connection error:", err.message);
  });

  return socketInstance;
}

export function useChat() {
  const { data: session } = useSession();
  const [isConnected, setIsConnected] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [typingUsers, setTypingUsers] = useState<Map<string, string>>(new Map());
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const typingTimeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // ============================================================
  // Connect when session is available
  // ============================================================
  useEffect(() => {
    if (!session?.user) return;

    const socket = getSocket();
    if (!socket) return;

    const onConnect = () => {
      setIsConnected(true);
      socket.emit("user:join", {
        userId: session.user.id,
        role: session.user.role,
      });
    };

    const onDisconnect = () => setIsConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // If already connected, emit user:join
    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [session]);

  // ============================================================
  // Listen for incoming messages (WebSocket + polling fallback)
  // ============================================================
  useEffect(() => {
    const socket = getSocket();

    const onMessageReceive = (data: { conversationId: string; message: ChatMessage }) => {
      if (data.conversationId === activeConversationId) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === data.message.id)) return prev;
          return [...prev, data.message];
        });
      }
      setConversations((prev) =>
        prev.map((c) =>
          c.id === data.conversationId
            ? {
                ...c,
                lastMessage: data.message.content,
                lastMessageAt: data.message.createdAt,
                unreadByUser: data.conversationId === activeConversationId ? 0 : c.unreadByUser + (data.message.senderRole === "admin" ? 1 : 0),
                unreadByAdmin: c.unreadByAdmin + (data.message.senderRole === "user" && data.conversationId !== activeConversationId ? 1 : 0),
              }
            : c
        )
      );
    };

    const onConversationCreated = (data: { conversation: Conversation }) => {
      setConversations((prev) => {
        if (prev.some((c) => c.id === data.conversation.id)) return prev;
        return [data.conversation, ...prev];
      });
    };

    if (socket) {
      socket.on("message:receive", onMessageReceive);
      socket.on("conversation:created", onConversationCreated);
    }

    // Polling fallback — refresh active conversation every 3s when WebSocket not connected
    let pollInterval: ReturnType<typeof setInterval> | null = null;
    if (activeConversationId && (!socket || !socket.connected)) {
      pollInterval = setInterval(async () => {
        try {
          const res = await fetch(`/api/conversations/${activeConversationId}`);
          const data = await res.json();
          if (data.success && data.conversation?.messages) {
            const newMessages = data.conversation.messages.map((m: ChatMessage & { createdAt: string | Date }) => ({
              ...m,
              createdAt: new Date(m.createdAt).toISOString(),
            }));
            setMessages((prev) => {
              if (prev.length === newMessages.length && prev.every((m, i) => m.id === newMessages[i].id)) {
                return prev;
              }
              return newMessages;
            });
          }
        } catch (err) {
          // silent
        }
      }, 3000);
    }

    return () => {
      if (socket) {
        socket.off("message:receive", onMessageReceive);
        socket.off("conversation:created", onConversationCreated);
      }
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [activeConversationId, session]);

  // ============================================================
  // Load conversations list
  // ============================================================
  const loadConversations = useCallback(async () => {
    try {
      const res = await fetch("/api/conversations");
      const data = await res.json();
      if (data.success) setConversations(data.conversations);
    } catch (err) {
      console.error("[Chat] Failed to load conversations:", err);
    }
  }, []);

  useEffect(() => {
    if (!session?.user) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      if (!cancelled) loadConversations();
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [session, loadConversations]);

  // ============================================================
  // Open a conversation
  // ============================================================
  const openConversation = useCallback(
    async (conversationId: string) => {
      setActiveConversationId(conversationId);

      const socket = getSocket();
      socket?.emit("conversation:join", { conversationId });

      try {
        const res = await fetch(`/api/conversations/${conversationId}`);
        const data = await res.json();
        if (data.success && data.conversation?.messages) {
          setMessages(
            data.conversation.messages.map((m: ChatMessage & { createdAt: string | Date }) => ({
              ...m,
              createdAt: new Date(m.createdAt).toISOString(),
            }))
          );
        }
      } catch (err) {
        console.error("[Chat] Failed to load conversation:", err);
      }
    },
    []
  );

  // ============================================================
  // Send a message
  // ============================================================
  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeConversationId || !session?.user || !content.trim()) return;

      const message: ChatMessage = {
        id: `temp-${Date.now()}`,
        conversationId: activeConversationId,
        senderId: session.user.id,
        senderName: session.user.name,
        senderRole: session.user.role,
        content: content.trim(),
        type: "text",
        createdAt: new Date().toISOString(),
      };

      // Optimistic: add to UI immediately
      setMessages((prev) => [...prev, message]);

      // Stop typing
      const socket = getSocket();
      socket?.emit("typing:stop", {
        conversationId: activeConversationId,
        userId: session.user.id,
      });

      // Save to DB via API
      try {
        const res = await fetch(`/api/conversations/${activeConversationId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: content.trim() }),
        });
        const data = await res.json();
        if (data.success && data.message) {
          // Replace temp message with real one
          setMessages((prev) =>
            prev.map((m) => (m.id === message.id ? { ...data.message, createdAt: new Date(data.message.createdAt).toISOString() } : m))
          );

          // Broadcast via WebSocket
          socket?.emit("message:send", {
            conversationId: activeConversationId,
            message: { ...data.message, createdAt: new Date(data.message.createdAt).toISOString() },
          });
        }
      } catch (err) {
        console.error("[Chat] Failed to send message:", err);
        // Mark message as failed
        setMessages((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, failed: true } as ChatMessage : m))
        );
      }
    },
    [activeConversationId, session]
  );

  // ============================================================
  // Start a new conversation
  // ============================================================
  const startConversation = useCallback(
    async (subject: string, type: string, initialMessage: string, contactRequestId?: string) => {
      if (!session?.user) return null;

      try {
        const res = await fetch("/api/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subject, type, initialMessage, contactRequestId }),
        });
        const data = await res.json();
        if (data.success && data.conversation) {
          const newConv = data.conversation as Conversation;
          setConversations((prev) => [newConv, ...prev]);

          // Notify admins via WebSocket
          const socket = getSocket();
          socket?.emit("conversation:created", {
            conversation: newConv,
            userId: session.user.id,
          });

          return newConv;
        }
      } catch (err) {
        console.error("[Chat] Failed to start conversation:", err);
      }
      return null;
    },
    [session]
  );

  // ============================================================
  // Typing indicators
  // ============================================================
  const startTyping = useCallback(() => {
    if (!activeConversationId || !session?.user) return;
    const socket = getSocket();
    socket?.emit("typing:start", {
      conversationId: activeConversationId,
      userId: session.user.id,
      name: session.user.name,
    });
  }, [activeConversationId, session]);

  const stopTyping = useCallback(() => {
    if (!activeConversationId || !session?.user) return;
    const socket = getSocket();
    socket?.emit("typing:stop", {
      conversationId: activeConversationId,
      userId: session.user.id,
    });
  }, [activeConversationId, session]);

  // ============================================================
  // Close conversation
  // ============================================================
  const closeConversation = useCallback(() => {
    if (activeConversationId) {
      const socket = getSocket();
      socket?.emit("conversation:leave", { conversationId: activeConversationId });
    }
    setActiveConversationId(null);
    setMessages([]);
  }, [activeConversationId]);

  return {
    isConnected,
    conversations,
    activeConversationId,
    messages,
    typingUsers,
    onlineUsers,
    openConversation,
    closeConversation,
    sendMessage,
    startConversation,
    startTyping,
    stopTyping,
    loadConversations,
  };
}
