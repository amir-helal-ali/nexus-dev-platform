"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, Send, ArrowUpLeft, Plus, X, ChevronLeft,
  Circle, Loader2, CheckCheck, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/use-chat";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const { data: session, status } = useSession();
  const {
    isConnected,
    conversations,
    activeConversationId,
    messages,
    typingUsers,
    openConversation,
    closeConversation,
    sendMessage,
    startConversation,
    startTyping,
    stopTyping,
  } = useChat();

  const [input, setInput] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatSubject, setNewChatSubject] = useState("");
  const [newChatType, setNewChatType] = useState("consultation");
  const [newChatMessage, setNewChatMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll to bottom on new messages (must be before any early returns)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  // Auth gate
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-background pt-24 px-4">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative glass-strong rounded-3xl p-8 max-w-md text-center"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-5">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">سجّل دخولك للمحادثة</h1>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            لبدء محادثة مع فريقنا، يجب تسجيل الدخول أولاً. المحادثات تُحفظ في حسابك ويمكنك متابعتها في أي وقت.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2">
              <Link href="/login?callbackUrl=/chat">تسجيل الدخول</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl border-white/15 bg-white/5 hover:bg-white/10">
              <Link href="/register">إنشاء حساب</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

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

  const handleCreateConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatSubject || !newChatMessage) return;
    setCreating(true);
    const conv = await startConversation(newChatSubject, newChatType, newChatMessage);
    setCreating(false);
    if (conv) {
      toast.success("تم بدء المحادثة بنجاح!");
      setShowNewChat(false);
      setNewChatSubject("");
      setNewChatMessage("");
      openConversation(conv.id);
    } else {
      toast.error("تعذّر بدء المحادثة");
    }
  };

  const activeConv = conversations.find((c) => c.id === activeConversationId);
  const typingNames = Array.from(typingUsers.values());

  return (
    <div className="relative min-h-screen flex flex-col bg-background pt-24">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6 flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="text-foreground">المحادثات</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
          {/* Conversations list */}
          <div className="lg:col-span-1 glass rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-bold">محادثاتي</h2>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                  {conversations.length}
                </span>
                {isConnected && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <Circle className="h-2 w-2 fill-current" />
                    متصل
                  </span>
                )}
              </div>
              <Button
                size="sm"
                onClick={() => setShowNewChat(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg gap-1 h-8 px-3"
              >
                <Plus className="h-4 w-4" />
                جديد
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {conversations.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <MessageSquare className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-4">لا توجد محادثات بعد</p>
                  <Button
                    size="sm"
                    onClick={() => setShowNewChat(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    ابدأ محادثة جديدة
                  </Button>
                </div>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => openConversation(conv.id)}
                    className={cn(
                      "w-full text-right p-3 rounded-xl mb-1 transition-colors",
                      activeConversationId === conv.id ? "bg-primary/10 border border-primary/30" : "hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm line-clamp-1">{conv.subject}</h3>
                      {conv.unreadByUser > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shrink-0">
                          {conv.unreadByUser}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {conv.lastMessage || "ابدأ المحادثة"}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full",
                        conv.status === "open" ? "bg-emerald-500/10 text-emerald-400" :
                        conv.status === "pending" ? "bg-amber-500/10 text-amber-400" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {conv.status === "open" ? "مفتوحة" : conv.status === "pending" ? "قيد المعالجة" : "مغلقة"}
                      </span>
                      {conv.lastMessageAt && (
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(conv.lastMessageAt).toLocaleDateString("ar-EG", { day: "numeric", month: "short" })}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat area */}
          <div className="lg:col-span-2 glass rounded-2xl overflow-hidden flex flex-col">
            {activeConv ? (
              <>
                {/* Header */}
                <div className="p-4 border-b border-white/8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={closeConversation} className="lg:hidden text-muted-foreground hover:text-foreground">
                      <ChevronLeft className="h-5 w-5 rotate-180" />
                    </button>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20 font-bold text-primary">
                      {activeConv.user?.name?.charAt(0) || "N"}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{activeConv.subject}</h3>
                      <p className="text-[11px] text-muted-foreground">
                        {typingNames.length > 0 ? (
                          <span className="text-primary flex items-center gap-1">
                            <span className="flex gap-0.5">
                              <span className="h-1 w-1 rounded-full bg-primary animate-bounce" />
                              <span className="h-1 w-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
                              <span className="h-1 w-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }} />
                            </span>
                            {typingNames.join("، ")} يكتب...
                          </span>
                        ) : (
                          "فريق نكسوس ديف"
                        )}
                      </p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[10px] px-2.5 py-1 rounded-full",
                    activeConv.status === "open" ? "bg-emerald-500/10 text-emerald-400" :
                    activeConv.status === "pending" ? "bg-amber-500/10 text-amber-400" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {activeConv.status === "open" ? "مفتوحة" : activeConv.status === "pending" ? "قيد المعالجة" : "مغلقة"}
                  </span>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3" dir="ltr">
                  {messages.map((msg) => {
                    const isMine = msg.senderId === session.user.id;
                    return (
                      <div key={msg.id} className={cn("flex", isMine ? "justify-end" : "justify-start")}>
                        <div className={cn(
                          "max-w-[75%] rounded-2xl px-4 py-2.5",
                          isMine ? "bg-primary text-primary-foreground rounded-br-md" : "bg-white/5 border border-white/10 rounded-bl-md"
                        )}>
                          <p className="text-sm leading-relaxed" dir="rtl">{msg.content}</p>
                          <div className={cn(
                            "flex items-center gap-1 mt-1 text-[10px]",
                            isMine ? "text-primary-foreground/70 justify-end" : "text-muted-foreground"
                          )}>
                            <span>{new Date(msg.createdAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}</span>
                            {isMine && (msg.failed ? (
                              <AlertCircle className="h-3 w-3 text-red-400" />
                            ) : (
                              <CheckCheck className="h-3 w-3" />
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-3 border-t border-white/8 flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="اكتب رسالتك..."
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
                  <h3 className="text-lg font-bold mb-2">اختر محادثة أو ابدأ جديدة</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    تواصل مع فريقنا لحظياً لطلب مشروع، استشارة، أو دعم فني. ردّنا عادة خلال دقائق.
                  </p>
                  <Button
                    onClick={() => setShowNewChat(true)}
                    className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    ابدأ محادثة جديدة
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New chat modal */}
      <AnimatePresence>
        {showNewChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowNewChat(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="glass-strong rounded-3xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold">محادثة جديدة</h3>
                <button onClick={() => setShowNewChat(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateConversation} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block">نوع المحادثة</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "project", label: "طلب مشروع" },
                      { value: "consultation", label: "استشارة" },
                      { value: "support", label: "دعم فني" },
                    ].map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setNewChatType(t.value)}
                        className={cn(
                          "px-3 py-2 rounded-xl text-xs font-semibold transition-colors",
                          newChatType === t.value ? "bg-primary text-primary-foreground" : "bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold mb-1.5 block">الموضوع</label>
                  <Input
                    required
                    value={newChatSubject}
                    onChange={(e) => setNewChatSubject(e.target.value)}
                    placeholder="مثال: أرغب في بناء متجر إلكتروني"
                    className="bg-white/5 border-white/10 rounded-xl h-11"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold mb-1.5 block">رسالتك الأولى</label>
                  <textarea
                    required
                    rows={4}
                    value={newChatMessage}
                    onChange={(e) => setNewChatMessage(e.target.value)}
                    placeholder="اشرح طلبك بإيجاز..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={creating}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2 h-11"
                >
                  {creating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      جارٍ الإنشاء...
                    </>
                  ) : (
                    <>
                      بدء المحادثة
                      <ArrowUpLeft className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
