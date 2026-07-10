"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  MessageSquare, Inbox, Clock, ChevronLeft, ArrowUpLeft,
  TrendingUp, CheckCircle2, AlertCircle, Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardData {
  conversations: Array<{
    id: string;
    subject: string;
    type: string;
    status: string;
    lastMessage: string | null;
    lastMessageAt: string | null;
    unreadByUser: number;
  }>;
  contactRequests: Array<{
    id: string;
    requestId: string;
    service: string | null;
    status: string;
    priority: string;
    createdAt: string;
    message: string;
  }>;
  stats: {
    totalConversations: number;
    openConversations: number;
    totalRequests: number;
    unreadMessages: number;
  };
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: "جديد", color: "bg-emerald-500/10 text-emerald-400" },
  contacted: { label: "تم التواصل", color: "bg-sky-500/10 text-sky-400" },
  "in-progress": { label: "قيد التنفيذ", color: "bg-amber-500/10 text-amber-400" },
  closed: { label: "مغلق", color: "bg-muted text-muted-foreground" },
  rejected: { label: "مرفوض", color: "bg-red-500/10 text-red-400" },
  open: { label: "مفتوحة", color: "bg-emerald-500/10 text-emerald-400" },
  pending: { label: "قيد المعالجة", color: "bg-amber-500/10 text-amber-400" },
};

const SERVICE_LABELS: Record<string, string> = {
  web: "تطوير ويب",
  mobile: "تطبيق موبايل",
  ecommerce: "متجر إلكتروني",
  devops: "DevOps",
  design: "تصميم UI/UX",
  security: "تدقيق أمني",
  template: "شراء قالب",
  other: "أخرى",
};

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") return;
    Promise.all([
      fetch("/api/conversations").then((r) => r.json()),
      fetch("/api/user/requests").then((r) => r.json()).catch(() => ({ success: false })),
    ])
      .then(([convData, reqData]) => {
        const conversations = convData.success ? convData.conversations : [];
        const contactRequests = reqData.success ? reqData.requests : [];
        const openConversations = conversations.filter((c: { status: string }) => c.status === "open").length;
        const unreadMessages = conversations.reduce(
          (sum: number, c: { unreadByUser: number }) => sum + (c.unreadByUser || 0),
          0
        );
        setData({
          conversations,
          contactRequests,
          stats: {
            totalConversations: conversations.length,
            openConversations,
            totalRequests: contactRequests.length,
            unreadMessages,
          },
        });
      })
      .finally(() => setLoading(false));
  }, [status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-24">
        <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-background pt-24 px-4">
        <div className="glass-strong rounded-3xl p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">سجّل دخولك</h1>
          <p className="text-sm text-muted-foreground mb-5">للوصول للوحة التحكم الشخصية</p>
          <Link href="/login?callbackUrl=/dashboard" className="inline-block px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-24">
        <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="relative min-h-screen flex flex-col bg-background pt-24">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="text-foreground">لوحة التحكم</span>
        </div>

        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 mb-6 flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 font-bold text-primary text-xl">
              {session.user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">أهلاً، {session.user.name.split(" ")[0]}! 👋</h1>
              <p className="text-sm text-muted-foreground">نظرة شاملة على نشاطك في نكسوس ديف</p>
            </div>
          </div>
          <Link
            href="/dashboard/profile"
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 text-sm font-semibold transition-colors"
          >
            إعدادات الحساب
          </Link>
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "محادثات نشطة", value: data.stats.openConversations, icon: MessageSquare, color: "text-emerald-400", bg: "bg-emerald-500/10", href: "/chat" },
            { label: "رسائل غير مقروءة", value: data.stats.unreadMessages, icon: Inbox, color: "text-amber-400", bg: "bg-amber-500/10", href: "/chat" },
            { label: "إجمالي المحادثات", value: data.stats.totalConversations, icon: TrendingUp, color: "text-sky-400", bg: "bg-sky-500/10", href: "/chat" },
            { label: "طلبات التواصل", value: data.stats.totalRequests, icon: Clock, color: "text-violet-400", bg: "bg-violet-500/10", href: "/contact" },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={card.href}
                className="block glass rounded-2xl p-5 hover:border-primary/30 transition-all hover:-translate-y-0.5"
              >
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl mb-3", card.bg)}>
                  <card.icon className={cn("h-5 w-5", card.color)} />
                </div>
                <div className="text-3xl font-extrabold tracking-tight">{card.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{card.label}</div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Conversations */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">أحدث المحادثات</h2>
              <Link href="/chat" className="text-xs text-primary hover:underline flex items-center gap-1">
                عرض الكل
                <ArrowUpLeft className="h-3 w-3" />
              </Link>
            </div>
            {data.conversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-3">لا توجد محادثات بعد</p>
                <Link
                  href="/chat"
                  className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
                >
                  ابدأ محادثة جديدة
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {data.conversations.slice(0, 5).map((conv) => (
                  <Link
                    key={conv.id}
                    href={`/chat#${conv.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm line-clamp-1">{conv.subject}</h3>
                        {conv.unreadByUser > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shrink-0">
                            {conv.unreadByUser}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {conv.lastMessage || "ابدأ المحادثة"}
                      </p>
                    </div>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full shrink-0", STATUS_LABELS[conv.status]?.color)}>
                      {STATUS_LABELS[conv.status]?.label}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact requests */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">طلبات التواصل</h2>
              <Link href="/contact" className="text-xs text-primary hover:underline flex items-center gap-1">
                طلب جديد
                <ArrowUpLeft className="h-3 w-3" />
              </Link>
            </div>
            {data.contactRequests.length === 0 ? (
              <div className="text-center py-8">
                <Inbox className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-3">لا توجد طلبات بعد</p>
                <Link
                  href="/contact"
                  className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
                >
                  أرسل طلباً
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {data.contactRequests.slice(0, 5).map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground">{req.requestId}</span>
                        <span className="text-xs font-semibold">{SERVICE_LABELS[req.service || ""] || "استشارة"}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{req.message}</p>
                    </div>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full shrink-0", STATUS_LABELS[req.status]?.color)}>
                      {STATUS_LABELS[req.status]?.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-6 glass rounded-2xl p-5">
          <h2 className="font-bold mb-4">إجراءات سريعة</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "ابدأ محادثة", href: "/chat", icon: MessageSquare, color: "text-emerald-400" },
              { label: "تصفّح القوالب", href: "/templates", icon: TrendingUp, color: "text-sky-400" },
              { label: "اطلب خدمة", href: "/services", icon: CheckCircle2, color: "text-violet-400" },
              { label: "تواصل معنا", href: "/contact", icon: Inbox, color: "text-amber-400" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/8 border border-white/8 hover:border-primary/30 transition-all"
              >
                <action.icon className={cn("h-5 w-5", action.color)} />
                <span className="text-sm font-semibold">{action.label}</span>
                <ArrowUpLeft className="h-4 w-4 text-muted-foreground mr-auto" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
