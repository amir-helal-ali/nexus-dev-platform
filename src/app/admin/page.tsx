"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users, MessageSquare, Inbox, Mail, TrendingUp, ArrowUpLeft,
  Circle, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Stats {
  totalUsers: number;
  totalConversations: number;
  openConversations: number;
  totalRequests: number;
  newRequests: number;
  totalMessages: number;
  adminUsers: number;
  recentUsers: Array<{ id: string; name: string; email: string; role: string; createdAt: string; lastLoginAt: string | null }>;
  recentRequests: Array<{ id: string; name: string; email: string; service: string | null; status: string; priority: string; createdAt: string; requestId: string }>;
  requestsByStatus: Array<{ status: string; _count: number }>;
  conversationsByStatus: Array<{ status: string; _count: number }>;
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

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setStats(data.stats);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center text-muted-foreground">تعذّر تحميل البيانات</div>;
  }

  const cards = [
    { label: "إجمالي المستخدمين", value: stats.totalUsers, icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10", href: "/admin/users" },
    { label: "محادثات مفتوحة", value: stats.openConversations, icon: MessageSquare, color: "text-sky-400", bg: "bg-sky-500/10", href: "/admin/chats" },
    { label: "طلبات جديدة", value: stats.newRequests, icon: Inbox, color: "text-amber-400", bg: "bg-amber-500/10", href: "/admin/requests" },
    { label: "إجمالي الطلبات", value: stats.totalRequests, icon: Mail, color: "text-violet-400", bg: "bg-violet-500/10", href: "/admin/requests" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">لوحة التحكم</h1>
        <p className="text-sm text-muted-foreground mt-1">نظرة عامة على نشاط المنصة</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
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
              <div className="flex items-center justify-between mb-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", card.bg)}>
                  <card.icon className={cn("h-5 w-5", card.color)} />
                </div>
                <ArrowUpLeft className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-3xl font-extrabold tracking-tight">{card.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{card.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent requests */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">أحدث طلبات التواصل</h2>
            <Link href="/admin/requests" className="text-xs text-primary hover:underline">عرض الكل</Link>
          </div>
          <div className="space-y-2">
            {stats.recentRequests.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">لا توجد طلبات بعد</p>
            ) : (
              stats.recentRequests.map((req) => (
                <Link
                  key={req.id}
                  href={`/admin/requests`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 border border-primary/20 font-bold text-primary text-sm">
                    {req.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{req.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate">
                      {req.service || "استشارة"} · {req.requestId}
                    </div>
                  </div>
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full", STATUS_LABELS[req.status]?.color)}>
                    {STATUS_LABELS[req.status]?.label}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent users */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">أحدث المستخدمين</h2>
            <Link href="/admin/users" className="text-xs text-primary hover:underline">عرض الكل</Link>
          </div>
          <div className="space-y-2">
            {stats.recentUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">لا يوجد مستخدمون بعد</p>
            ) : (
              stats.recentUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 font-bold text-sm">
                    {u.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{u.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate" dir="ltr">{u.email}</div>
                  </div>
                  {u.role === "admin" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">أدمن</span>
                  )}
                  {u.lastLoginAt ? (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(u.lastLoginAt).toLocaleDateString("ar-EG", { day: "numeric", month: "short" })}
                    </span>
                  ) : (
                    <Circle className="h-2 w-2 fill-amber-400 text-amber-400" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Distribution */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5">
          <h2 className="font-bold mb-4">توزيع الطلبات حسب الحالة</h2>
          <div className="space-y-2">
            {stats.requestsByStatus.map((s) => {
              const total = stats.totalRequests || 1;
              const percent = (s._count / total) * 100;
              const info = STATUS_LABELS[s.status] || { label: s.status, color: "bg-muted text-muted-foreground" };
              return (
                <div key={s.status} className="flex items-center gap-3">
                  <div className="w-24 text-xs text-muted-foreground">{info.label}</div>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="w-8 text-xs font-bold text-left">{s._count}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <h2 className="font-bold mb-4">توزيع المحادثات حسب الحالة</h2>
          <div className="space-y-2">
            {stats.conversationsByStatus.map((s) => {
              const total = stats.totalConversations || 1;
              const percent = (s._count / total) * 100;
              const info = STATUS_LABELS[s.status] || { label: s.status, color: "bg-muted text-muted-foreground" };
              return (
                <div key={s.status} className="flex items-center gap-3">
                  <div className="w-24 text-xs text-muted-foreground">{info.label}</div>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-sky-500 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="w-8 text-xs font-bold text-left">{s._count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
