"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// ============================================================
// Hook: useNotifications
// إدارة الإشعارات اللحظية عبر SSE
// ============================================================

export interface Notification {
  id?: string;
  type: string; // "message" | "request" | "system"
  title: string;
  body: string;
  link?: string | null;
  isRead?: boolean;
  createdAt?: string;
}

interface UnreadCount {
  conversations: number;
  messages: number;
}

export function useNotifications() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<UnreadCount>({ conversations: 0, messages: 0 });
  const [connected, setConnected] = useState(false);

  // Listen for global notification events (from useChat SSE)
  useEffect(() => {
    if (!session?.user) return;

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as Notification;
      setNotifications((prev) => [
        { ...detail, id: `n-${Date.now()}`, createdAt: new Date().toISOString(), isRead: false },
        ...prev,
      ].slice(0, 50));
      // Show toast
      toast.info(detail.title, { description: detail.body });
    };

    window.addEventListener("nexus:notification", handler);
    return () => window.removeEventListener("nexus:notification", handler);
  }, [session]);

  // Listen for unread count updates
  useEffect(() => {
    if (!session?.user) return;

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as UnreadCount;
      setUnreadCount(detail);
    };

    window.addEventListener("nexus:unread", handler);
    return () => window.removeEventListener("nexus:unread", handler);
  }, [session]);

  // Connect directly to SSE for notifications (independent of useChat)
  useEffect(() => {
    if (!session?.user) return;

    let eventSource: EventSource | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

    const connect = () => {
      try {
        eventSource = new EventSource("/api/notifications/stream");

        eventSource.onopen = () => setConnected(true);

        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "connected") {
              setConnected(true);
            } else if (data.type === "notification" && data.title) {
              setNotifications((prev) =>
                [
                  {
                    id: data.id,
                    type: data.notificationType || "system",
                    title: data.title,
                    body: data.body,
                    link: data.link,
                    isRead: false,
                    createdAt: data.createdAt || new Date().toISOString(),
                  },
                  ...prev,
                ].slice(0, 50)
              );
              // Show toast for new notifications
              const toastFn = data.notificationType === "message" ? toast.info : toast.success;
              toastFn(data.title, { description: data.body });
            } else if (data.type === "unread_count") {
              setUnreadCount({
                conversations: data.conversations || 0,
                messages: data.messages || 0,
              });
            }
          } catch (e) {
            // ignore parse errors
          }
        };

        eventSource.onerror = () => {
          setConnected(false);
          if (eventSource) {
            eventSource.close();
            eventSource = null;
          }
          // Browser would auto-reconnect, but we manage it explicitly
          reconnectTimer = setTimeout(connect, 3000);
        };
      } catch (e) {
        console.error("[SSE Notify] Connection failed:", e);
        reconnectTimer = setTimeout(connect, 3000);
      }
    };

    connect();

    return () => {
      if (eventSource) eventSource.close();
      if (reconnectTimer) clearTimeout(reconnectTimer);
      setConnected(false);
    };
  }, [session]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    connected,
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
  };
}
