"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare, Send, Search, Circle, Loader2,
  CheckCheck, ChevronLeft, User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat, type Conversation } from "@/hooks/use-chat";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  open: { label: "مفتوحة", color: "bg-emerald-500/10 text-emerald-400" },
  pending: { label: "قيد المعالجة", color: "bg-amber-500/10 text-amber-400" },
  closed: { label: "مغلقة", color: "bg-muted text-muted-foreground" },
};

export default function AdminChatsPage() {
  const {
    isConnected,
    conversations,
    activeConversationId,
    messages,
    typingUsers,
    onlineUsers,
    openConversation,
    closeConversation,
    sendMessage,
    startTyping,
    stopTyping,
  } = useChat();

  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "pending" | "closed">("all");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  const filteredConversations = conversations.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.subject.toLowerCase().includes(q) ||
        c.user?.name?.toLowerCase().includes(q) ||
        c.user?.email?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeConv = conversations.find((c) => c.id === activeConversationId) as Conversation | undefined;
  const typingNames = Array.from(typingUsers.values());

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeConversationId) return;
    sendMessage(input);
    setInput("");
    stopTyping();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (activeConversationId) {
      startTyping();
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => stopTyping(), 1500);
    }
  };

  return (
    <div className="space-y-4 h-[calc(100vh-7rem)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
            المحادثات
            {isConnected && (
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-normal">
                <Circle className="h-2 w-2 fill-current" />
                متصل لحظياً
              </span>
            )}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            إدارة المحادثات مع العملاء في الوقت الفعلي
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(["all", "open", "pending", "closed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground"
              )}
            >
              {f === "all" ? "الكل" : STATUS_LABELS[f]?.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-3 gap-4 min-h-0">
        {/* Conversations list */}
        <div className="lg:col-span-1 glass rounded-2xl overflow-hidden flex flex-col">
          <div className="p-3 border-b border-white/8">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="بحث..."
                className="bg-white/5 border-white/10 rounded-lg h-9 pr-9 text-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">لا توجد محادثات</p>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isOnline = onlineUsers.has(conv.userId);
                return (
                  <button
                    key={conv.id}
                    onClick={() => openConversation(conv.id)}
                    className={cn(
                      "w-full text-right p-3 rounded-xl mb-1 transition-colors",
                      activeConversationId === conv.id ? "bg-primary/10 border border-primary/30" : "hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="relative shrink-0">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 font-bold text-sm">
                            {conv.user?.name?.charAt(0) || "U"}
                          </div>
                          {isOnline && (
                            <Circle className="absolute -bottom-0.5 -left-0.5 h-3 w-3 fill-emerald-400 text-emerald-400 border-2 border-background" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm line-clamp-1">{conv.user?.name || "مستخدم"}</h3>
                          <p className="text-[10px] text-muted-foreground line-clamp-1">{conv.subject}</p>
                        </div>
                      </div>
                      {conv.unreadByAdmin > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shrink-0">
                          {conv.unreadByAdmin}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground line-clamp-1 flex-1 mr-2">
                        {conv.lastMessage || "—"}
                      </span>
                      <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full shrink-0", STATUS_LABELS[conv.status]?.color)}>
                        {STATUS_LABELS[conv.status]?.label}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className="lg:col-span-2 glass rounded-2xl overflow-hidden flex flex-col">
          {activeConv ? (
            <>
              <div className="p-3 border-b border-white/8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={closeConversation} className="lg:hidden text-muted-foreground">
                    <ChevronLeft className="h-5 w-5 rotate-180" />
                  </button>
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20 font-bold text-primary">
                      {activeConv.user?.name?.charAt(0) || "U"}
                    </div>
                    {onlineUsers.has(activeConv.userId) && (
                      <Circle className="absolute -bottom-0.5 -left-0.5 h-3 w-3 fill-emerald-400 text-emerald-400 border-2 border-background" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{activeConv.user?.name}</h3>
                    <p className="text-[11px] text-muted-foreground">
                      {typingNames.length > 0 ? (
                        <span className="text-primary flex items-center gap-1">
                          <span className="flex gap-0.5">
                            <span className="h-1 w-1 rounded-full bg-primary animate-bounce" />
                            <span className="h-1 w-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
                            <span className="h-1 w-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }} />
                          </span>
                          يكتب...
                        </span>
                      ) : onlineUsers.has(activeConv.userId) ? (
                        <span className="text-emerald-400">متصل الآن</span>
                      ) : (
                        activeConv.user?.email
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("text-[10px] px-2.5 py-1 rounded-full", STATUS_LABELS[activeConv.status]?.color)}>
                    {STATUS_LABELS[activeConv.status]?.label}
                  </span>
                </div>
              </div>

              {/* User info bar */}
              <div className="px-4 py-2 border-b border-white/8 bg-white/[0.02] flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {activeConv.user?.email}
                </span>
                {activeConv.user?.phone && (
                  <span dir="ltr">{activeConv.user.phone}</span>
                )}
                <span>·</span>
                <span>{activeConv.subject}</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3" dir="ltr">
                {messages.map((msg) => {
                  const isMine = msg.senderRole === "admin";
                  return (
                    <div key={msg.id} className={cn("flex", isMine ? "justify-end" : "justify-start")}>
                      <div className={cn(
                        "max-w-[70%] rounded-2xl px-4 py-2.5",
                        isMine ? "bg-primary text-primary-foreground rounded-br-md" : "bg-white/5 border border-white/10 rounded-bl-md"
                      )}>
                        <p className="text-sm leading-relaxed" dir="rtl">{msg.content}</p>
                        <div className={cn(
                          "flex items-center gap-1 mt-1 text-[10px]",
                          isMine ? "text-primary-foreground/70 justify-end" : "text-muted-foreground"
                        )}>
                          <span>{new Date(msg.createdAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}</span>
                          {isMine && !msg.failed && <CheckCheck className="h-3 w-3" />}
                          {msg.failed && <span className="text-red-400">فشل الإرسال</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="p-3 border-t border-white/8 flex gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="اكتب ردّك..."
                  disabled={activeConv.status === "closed"}
                  className="bg-white/5 border-white/10 rounded-xl h-11"
                  dir="rtl"
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || activeConv.status === "closed"}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div>
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">اختر محادثة للردّ عليها</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  تظهر هنا كل المحادثات النشطة مع العملاء. اضغط على أي محادثة لفتحها والردّ عليها لحظياً.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
