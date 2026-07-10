"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Users, Search, Mail, Phone, ShieldCheck, Circle, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  _count: {
    conversations: number;
    contactRequests: number;
    messages: number;
  };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (roleFilter !== "all") params.set("role", roleFilter);
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/users?${params}`);
    const data = await res.json();
    if (data.success) setUsers(data.users);
    setLoading(false);
  }, [roleFilter, search]);

  useEffect(() => {
    const t = setTimeout(loadUsers, 300);
    return () => clearTimeout(t);
  }, [loadUsers]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">المستخدمون</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {users.length} مستخدم · {users.filter((u) => u.role === "admin").length} أدمن
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم أو البريد..."
            className="bg-white/5 border-white/10 rounded-xl h-10 pr-10"
          />
        </div>
        {["all", "user", "admin"].map((r) => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
              roleFilter === r
                ? "bg-primary text-primary-foreground"
                : "bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground"
            )}
          >
            {r === "all" ? "الكل" : r === "admin" ? "أدمن" : "مستخدمون"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="glass rounded-2xl py-16 text-center">
          <Users className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">لا يوجد مستخدمون</p>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8 text-xs text-muted-foreground">
                  <th className="text-right p-3 font-semibold">المستخدم</th>
                  <th className="text-right p-3 font-semibold hidden sm:table-cell">التواصل</th>
                  <th className="text-right p-3 font-semibold">الدور</th>
                  <th className="text-right p-3 font-semibold hidden md:table-cell">النشاط</th>
                  <th className="text-right p-3 font-semibold hidden lg:table-cell">آخر دخول</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-white/4 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 font-bold text-sm">
                            {u.name.charAt(0)}
                          </div>
                          {u.isActive && (
                            <Circle className="absolute -bottom-0.5 -left-0.5 h-2.5 w-2.5 fill-emerald-400 text-emerald-400 border-2 border-background" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm truncate">{u.name}</div>
                          <div className="text-[11px] text-muted-foreground truncate" dir="ltr">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 hidden sm:table-cell">
                      {u.phone ? (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground" dir="ltr">
                          <Phone className="h-3 w-3" />
                          {u.phone}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground/50">—</span>
                      )}
                    </td>
                    <td className="p-3">
                      {u.role === "admin" ? (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold flex items-center gap-1 w-fit">
                          <ShieldCheck className="h-3 w-3" />
                          أدمن
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                          مستخدم
                        </span>
                      )}
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span title="محادثات">💬 {u._count.conversations}</span>
                        <span title="طلبات">📥 {u._count.contactRequests}</span>
                        <span title="رسائل">✉️ {u._count.messages}</span>
                      </div>
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      {u.lastLoginAt ? (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(u.lastLoginAt).toLocaleDateString("ar-EG", { day: "numeric", month: "short" })}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground/50">لم يسجّل دخول</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
