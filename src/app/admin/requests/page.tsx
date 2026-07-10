"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Inbox, Search, Mail, Phone, Building2, Calendar,
  AlertCircle, Trash2, MessageSquare, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/use-chat";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ContactRequest {
  id: string;
  requestId: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  budget: string | null;
  service: string | null;
  message: string;
  status: string;
  priority: string;
  notes: string | null;
  assignedTo: string | null;
  createdAt: string;
  user: { id: string; name: string; email: string } | null;
  assignedAdmin: { id: string; name: string } | null;
}

const STATUS_OPTIONS = [
  { value: "new", label: "جديد", color: "bg-emerald-500/10 text-emerald-400" },
  { value: "contacted", label: "تم التواصل", color: "bg-sky-500/10 text-sky-400" },
  { value: "in-progress", label: "قيد التنفيذ", color: "bg-amber-500/10 text-amber-400" },
  { value: "closed", label: "مغلق", color: "bg-muted text-muted-foreground" },
  { value: "rejected", label: "مرفوض", color: "bg-red-500/10 text-red-400" },
];

const PRIORITY_OPTIONS = [
  { value: "low", label: "منخفضة", color: "bg-muted text-muted-foreground" },
  { value: "normal", label: "عادية", color: "bg-sky-500/10 text-sky-400" },
  { value: "high", label: "عالية", color: "bg-amber-500/10 text-amber-400" },
  { value: "urgent", label: "عاجلة", color: "bg-red-500/10 text-red-400" },
];

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

const BUDGET_LABELS: Record<string, string> = {
  lt60k: "أقل من 60,000 ج.م",
  "60-150k": "60,000 - 150,000 ج.م",
  "150-500k": "150,000 - 500,000 ج.م",
  gt500k: "أكثر من 500,000 ج.م",
};

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { startConversation, openConversation } = useChat();

  const loadRequests = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      const res = await fetch(`/api/admin/requests?${params}`);
      const data = await res.json();
      if (data.success) setRequests(data.requests);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const filtered = requests.filter((r) => {
    if (search) {
      const q = search.toLowerCase();
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.requestId.toLowerCase().includes(q) ||
        r.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("تم تحديث حالة الطلب");
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    }
  };

  const updatePriority = async (id: string, priority: string) => {
    const res = await fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority }),
    });
    if (res.ok) {
      toast.success("تم تحديث أولوية الطلب");
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, priority } : r)));
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;
    const res = await fetch(`/api/admin/requests/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("تم حذف الطلب");
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const startChatFromRequest = async (req: ContactRequest) => {
    const subject = `بخصوص طلبك: ${SERVICE_LABELS[req.service || ""] || "استشارة"}`;
    const initialMessage = `مرحباً ${req.name}،

شكراً لتواصلك مع نكسوس ديف. لقد استلمنا طلبك (${req.requestId}) بخصوص ${SERVICE_LABELS[req.service || ""] || "خدمة"}.

نحن هنا لمساعدتك. كيف يمكننا خدمتك اليوم؟

فريق نكسوس ديف 🇪🇬`;

    const conv = await startConversation(
      subject,
      req.service === "template" ? "support" : "consultation",
      initialMessage
    );
    if (conv) {
      toast.success("تم إنشاء محادثة مع العميل");
      // Mark request as contacted
      await updateStatus(req.id, "contacted");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">طلبات التواصل</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {requests.length} طلب · {requests.filter((r) => r.status === "new").length} جديد
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {["all", "new", "contacted", "in-progress", "closed", "rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                statusFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground"
              )}
            >
              {s === "all" ? "الكل" : STATUS_OPTIONS.find((o) => o.value === s)?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث بالاسم، البريد، رقم الطلب..."
          className="bg-white/5 border-white/10 rounded-xl h-10 pr-10"
        />
      </div>

      {/* List */}
      <div className="space-y-2">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass rounded-2xl py-16 text-center">
            <Inbox className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">لا توجد طلبات</p>
          </div>
        ) : (
          filtered.map((req, i) => {
            const expanded = expandedId === req.id;
            const statusInfo = STATUS_OPTIONS.find((s) => s.value === req.status);
            const priorityInfo = PRIORITY_OPTIONS.find((p) => p.value === req.priority);
            return (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expanded ? null : req.id)}
                  className="w-full p-4 flex items-center gap-4 text-right hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 border border-primary/20 font-bold text-primary shrink-0">
                    {req.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm">{req.name}</h3>
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full", statusInfo?.color)}>
                        {statusInfo?.label}
                      </span>
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full", priorityInfo?.color)}>
                        {priorityInfo?.label}
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-3 mt-1">
                      <span>{req.requestId}</span>
                      <span>·</span>
                      <span>{SERVICE_LABELS[req.service || ""] || "استشارة"}</span>
                      <span>·</span>
                      <span>{new Date(req.createdAt).toLocaleDateString("ar-EG", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", expanded && "rotate-180")} />
                </button>

                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="border-t border-white/8 p-4 space-y-4"
                  >
                    {/* Message */}
                    <div className="p-3 rounded-xl bg-white/5">
                      <div className="text-xs font-semibold text-muted-foreground mb-2">رسالة العميل:</div>
                      <p className="text-sm leading-relaxed">{req.message}</p>
                    </div>

                    {/* Details */}
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary shrink-0" />
                        <a href={`mailto:${req.email}`} className="text-muted-foreground hover:text-primary truncate" dir="ltr">
                          {req.email}
                        </a>
                      </div>
                      {req.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary shrink-0" />
                          <a href={`tel:${req.phone}`} className="text-muted-foreground hover:text-primary" dir="ltr">
                            {req.phone}
                          </a>
                        </div>
                      )}
                      {req.company && (
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">{req.company}</span>
                        </div>
                      )}
                      {req.budget && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">{BUDGET_LABELS[req.budget] || req.budget}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/8">
                      <select
                        value={req.status}
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s.value} value={s.value} className="bg-card">
                            {s.label}
                          </option>
                        ))}
                      </select>

                      <select
                        value={req.priority}
                        onChange={(e) => updatePriority(req.id, e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                      >
                        {PRIORITY_OPTIONS.map((p) => (
                          <option key={p.value} value={p.value} className="bg-card">
                            {p.label}
                          </option>
                        ))}
                      </select>

                      <Button
                        onClick={() => startChatFromRequest(req)}
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg gap-1.5 h-8"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        بدء محادثة
                      </Button>

                      <a href={`mailto:${req.email}?subject=ردّ على طلبك ${req.requestId}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-lg gap-1.5 h-8 bg-white/5 border-white/10"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          ردّ بالبريد
                        </Button>
                      </a>

                      <button
                        onClick={() => deleteRequest(req.id)}
                        className="mr-auto p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
