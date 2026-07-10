"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

// ============================================================
// Hook: useChat
// إدارة الاتصال بـ WebSocket + SSE للمحادثات اللحظية
// ❌ لا polling — فقط WebSocket (bidirectional) + SSE (server push)
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
  updatedAt?: string;
}

let socketInstance: Socket | null = null;

// ============================================================
// WebSocket Singleton — bidirectional (typing indicators, presence)
// ============================================================
function getSocket(): Socket | null {
  if (typeof window === "undefined") return null;
  if (socketInstance && socketInstance.connected) return socketInstance;
  if (socketInstance) return socketInstance;

  socketInstance = io("/?XTransformPort=3003", {
    transports: ["websocket"], // WebSocket only — no polling fallback
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 15,
    timeout: 10000,
  });

  socketInstance.on("connect", () => {
    console.log("[Chat WS] Connected:", socketInstance?.id);
  });

  socketInstance.on("disconnect", (reason) => {
    console.log("[Chat WS] Disconnected:", reason);
  });

  socketInstance.on("connect_error", (err) => {
    console.warn("[Chat WS] Connection error:", err.message);
  });

  return socketInstance;
}

// ============================================================
// SSE Connection Manager — server push (messages, notifications)
// ============================================================
class SSEManager {
  private eventSource: EventSource | null = null;
  private listeners: Set<(data: unknown) => void> = new Set();
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    if (this.eventSource) return;
    try {
      this.eventSource = new EventSource(this.url);
      this.eventSource.onopen = () => {
        console.log("[SSE] Connected:", this.url);
      };
      this.eventSource.onerror = (e) => {
        console.warn("[SSE] Error, reconnecting in 3s...");
        // Browser will auto-reconnect, but ensure clean state
        if (this.eventSource?.readyState === EventSource.CLOSED) {
          this.eventSource = null;
          setTimeout(() => this.connect(), 3000);
        }
      };
      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.listeners.forEach((cb) => cb(data));
        } catch (e) {
          // ignore parse errors (heartbeats)
        }
      };
    } catch (e) {
      console.error("[SSE] Failed to connect:", e);
    }
  }

  onMessage(cb: (data: unknown) => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.listeners.clear();
  }
}

let convSSEManager: SSEManager | null = null;
let notifySSEManager: SSEManager | null = null;

function getConvSSE(): SSEManager {
  if (!convSSEManager) {
    convSSEManager = new SSEManager("/api/conversations/stream");
  }
  return convSSEManager;
}

function getNotifySSE(): SSEManager {
  if (!notifySSEManager) {
    notifySSEManager = new SSEManager("/api/notifications/stream");
  }
  return notifySSEManager;
}

// ============================================================
// Main Hook
// ============================================================
export function useChat() {
  const { data: session } = useSession();
  const [isConnected, setIsConnected] = useState(false);
  const [sseConnected, setSseConnected] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [typingUsers, setTypingUsers] = useState<Map<string, string>>(new Map());
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [unreadCount, setUnreadCount] = useState({ conversations: 0, messages: 0 });
  const typingTimeoutRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // ============================================================
  // 1) WebSocket connection (for typing indicators + presence)
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

    if (socket.connected) onConnect();

    // Typing indicators (via WebSocket)
    const onTypingStart = (data: { conversationId: string; userId: string; name: string }) => {
      if (data.conversationId === activeConversationId && data.userId !== session.user.id) {
        setTypingUsers((prev) => new Map(prev).set(data.userId, data.name));
        const existing = typingTimeoutRef.current.get(data.userId);
        if (existing) clearTimeout(existing);
        const t = setTimeout(() => {
          setTypingUsers((prev) => {
            const next = new Map(prev);
            next.delete(data.userId);
            return next;
          });
        }, 3000);
        typingTimeoutRef.current.set(data.userId, t);
      }
    };

    const onTypingStop = (data: { conversationId: string; userId: string }) => {
      setTypingUsers((prev) => {
        const next = new Map(prev);
        next.delete(data.userId);
        return next;
      });
    };

    // Presence (online/offline) via WebSocket
    const onUserOnline = (data: { userId: string }) => {
      setOnlineUsers((prev) => new Set(prev).add(data.userId));
    };
    const onUserOffline = (data: { userId: string }) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.delete(data.userId);
        return next;
      });
    };

    socket.on("typing:start", onTypingStart);
    socket.on("typing:stop", onTypingStop);
    socket.on("user:online", onUserOnline);
    socket.on("user:offline", onUserOffline);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("typing:start", onTypingStart);
      socket.off("typing:stop", onTypingStop);
      socket.off("user:online", onUserOnline);
      socket.off("user:offline", onUserOffline);
    };
  }, [session, activeConversationId]);

  // ============================================================
  // 2) SSE connection for messages + conversation updates
  // ============================================================
  useEffect(() => {
    if (!session?.user) return;

    const sse = getConvSSE();
    sse.connect();

    const unsubscribe = sse.onMessage((raw) => {
      const data = raw as { type: string; message?: ChatMessage; conversation?: Conversation; conversationId?: string };
      if (data.type === "connected") {
        setSseConnected(true);
        return;
      }
      if (data.type === "message" && data.message) {
        const msg = data.message;
        // Add to active conversation messages
        if (msg.conversationId === activeConversationId) {
          setMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
        }
        // Update conversation list (move to top, update lastMessage)
        setConversations((prev) => {
          const exists = prev.find((c) => c.id === msg.conversationId);
          if (!exists) return prev;
          return prev
            .map((c) =>
              c.id === msg.conversationId
                ? {
                    ...c,
                    lastMessage: msg.content,
                    lastMessageAt: msg.createdAt,
                    unreadByUser: msg.conversationId === activeConversationId ? 0 : (msg.senderRole === "admin" ? c.unreadByUser + 1 : c.unreadByUser),
                    unreadByAdmin: msg.conversationId === activeConversationId ? 0 : (msg.senderRole === "user" ? c.unreadByAdmin + 1 : c.unreadByAdmin),
                  }
                : c
            )
            .sort((a, b) => new Date(b.lastMessageAt || 0).getTime() - new Date(a.lastMessageAt || 0).getTime());
        });
      }
      if (data.type === "conversation_update" && data.conversation) {
        setConversations((prev) => {
          const exists = prev.find((c) => c.id === data.conversation!.id);
          if (exists) {
            return prev.map((c) => (c.id === data.conversation!.id ? { ...c, ...data.conversation! } : c));
          }
          // New conversation — add it
          return [data.conversation!, ...prev];
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [session, activeConversationId]);

  // ============================================================
  // 3) SSE connection for notifications (navbar badges, toasts)
  // ============================================================
  useEffect(() => {
    if (!session?.user) return;

    const sse = getNotifySSE();
    sse.connect();

    const unsubscribe = sse.onMessage((raw) => {
      const data = raw as { type: string; conversations?: number; messages?: number; title?: string; body?: string; link?: string; notificationType?: string };
      if (data.type === "connected") return;
      if (data.type === "unread_count") {
        setUnreadCount({
          conversations: data.conversations || 0,
          messages: data.messages || 0,
        });
      }
      if (data.type === "notification" && data.title) {
        // Emit custom event for global listeners (Navbar)
        window.dispatchEvent(
          new CustomEvent("nexus:notification", {
            detail: {
              title: data.title,
              body: data.body,
              link: data.link,
              type: data.notificationType,
            },
          })
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, [session]);

  // ============================================================
  // 4) Load conversations list (initial load only)
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
  // 5) Open a conversation (load history + join WebSocket room)
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
            data.conversation.messages.map(
              (m: ChatMessage & { createdAt: string | Date }) => ({
                ...m,
                createdAt: new Date(m.createdAt).toISOString(),
              })
            )
          );
        }
      } catch (err) {
        console.error("[Chat] Failed to load conversation:", err);
      }
    },
    []
  );

  const closeConversation = useCallback(() => {
    if (activeConversationId) {
      const socket = getSocket();
      socket?.emit("conversation:leave", { conversationId: activeConversationId });
    }
    setActiveConversationId(null);
    setMessages([]);
  }, [activeConversationId]);

  // ============================================================
  // 6) Send a message (HTTP POST + WebSocket broadcast + SSE)
  // ============================================================
  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeConversationId || !session?.user || !content.trim()) return;

      const tempId = `temp-${Date.now()}`;
      const message: ChatMessage = {
        id: tempId,
        conversationId: activeConversationId,
        senderId: session.user.id,
        senderName: session.user.name,
        senderRole: session.user.role,
        content: content.trim(),
        type: "text",
        createdAt: new Date().toISOString(),
      };

      // Optimistic UI
      setMessages((prev) => [...prev, message]);

      // Stop typing
      const socket = getSocket();
      socket?.emit("typing:stop", {
        conversationId: activeConversationId,
        userId: session.user.id,
      });

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
            prev.map((m) =>
              m.id === tempId
                ? { ...data.message, createdAt: new Date(data.message.createdAt).toISOString() }
                : m
            )
          );
          // Broadcast via WebSocket (typing/presence channel)
          socket?.emit("message:send", {
            conversationId: activeConversationId,
            message: { ...data.message, createdAt: new Date(data.message.createdAt).toISOString() },
          });
          // Note: SSE will deliver to other party automatically via DB trigger
        }
      } catch (err) {
        console.error("[Chat] Failed to send message:", err);
        setMessages((prev) =>
          prev.map((m) => (m.id === tempId ? { ...m, failed: true } : m))
        );
      }
    },
    [activeConversationId, session]
  );

  // ============================================================
  // 7) Start a new conversation
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
          // SSE will deliver to admins automatically (notification created in API)
          // Also refresh local list
          setConversations((prev) => [newConv, ...prev]);
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
  // 8) Typing indicators (via WebSocket)
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

  return {
    // Connection states
    isConnected, // WebSocket (typing/presence)
    sseConnected, // SSE (messages/notifications)
    // Data
    conversations,
    activeConversationId,
    messages,
    typingUsers,
    onlineUsers,
    unreadCount,
    // Actions
    openConversation,
    closeConversation,
    sendMessage,
    startConversation,
    startTyping,
    stopTyping,
    loadConversations,
  };
}
