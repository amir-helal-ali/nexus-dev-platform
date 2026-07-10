"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, LayoutDashboard, MessageSquare, Inbox, Users,
  LogOut, Menu, X, Bell, Search, Circle,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/hooks/use-notifications";

interface AdminShellProps {
  children: React.ReactNode;
  user: { id: string; name: string; email: string; role: string };
}

const NAV = [
  { label: "لوحة التحكم", href: "/admin", icon: LayoutDashboard },
  { label: "المحادثات", href: "/admin/chats", icon: MessageSquare, badge: true },
  { label: "طلبات التواصل", href: "/admin/requests", icon: Inbox },
  { label: "المستخدمون", href: "/admin/users", icon: Users },
];

export default function AdminShell({ children, user }: AdminShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { notifications, unreadCount, connected, markAllAsRead } = useNotifications();

  // Close notif dropdown on route change
  useEffect(() => {
    if (!notifOpen) return;
    const t = setTimeout(() => setNotifOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname, notifOpen]);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-l border-white/8 bg-card/50 backdrop-blur-xl">
        <div className="p-5 border-b border-white/8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/90 to-primary/60 border border-primary/40">
              <Terminal className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-extrabold tracking-tight">NEXUS<span className="text-primary">DEV</span></span>
              <span className="text-[9px] text-muted-foreground font-medium tracking-widest">ADMIN PANEL</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {item.badge && unreadCount.messages > 0 && (
                <span className="mr-auto px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  {unreadCount.messages > 9 ? "9+" : unreadCount.messages}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/8">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 border border-primary/20 font-bold text-primary text-sm">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{user.name}</div>
              <div className="text-[10px] text-muted-foreground truncate">{user.email}</div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-muted-foreground hover:text-red-400 transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-64 bg-card border-l border-white/8 lg:hidden"
            >
              <div className="p-5 border-b border-white/8 flex items-center justify-between">
                <span className="text-sm font-extrabold">NEXUS<span className="text-primary">DEV</span> Admin</span>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="p-3 space-y-1">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  تسجيل الخروج
                </button>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-white/8 bg-card/30 backdrop-blur-xl flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="بحث..."
                className="bg-transparent text-sm focus:outline-none w-32 lg:w-48"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* SSE Connection indicator */}
            <div className={cn(
              "hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-semibold",
              connected ? "bg-emerald-500/10 text-emerald-400" : "bg-muted text-muted-foreground"
            )}>
              <Circle className={cn("h-1.5 w-1.5 fill-current", connected && "animate-pulse")} />
              {connected ? "متصل لحظياً" : "غير متصل"}
            </div>

            {/* Notifications dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
                title="الإشعارات"
              >
                <Bell className="h-4 w-4" />
                {unreadCount.messages > 0 && (
                  <span className="absolute -top-0.5 -left-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {unreadCount.messages > 9 ? "9+" : unreadCount.messages}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-80 glass-strong rounded-xl overflow-hidden shadow-2xl z-50"
                  >
                    <div className="flex items-center justify-between p-3 border-b border-white/8">
                      <h4 className="font-bold text-sm">الإشعارات</h4>
                      {notifications.length > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-[10px] text-primary hover:underline"
                        >
                          تعليم الكل كمقروء
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-sm text-muted-foreground">
                          <Bell className="h-8 w-8 mx-auto mb-2 opacity-40" />
                          لا توجد إشعارات بعد
                        </div>
                      ) : (
                        notifications.slice(0, 10).map((n, i) => (
                          <Link
                            key={n.id || i}
                            href={n.link || "#"}
                            onClick={() => setNotifOpen(false)}
                            className={cn(
                              "block p-3 border-b border-white/4 hover:bg-white/5 transition-colors",
                              !n.isRead && "bg-primary/5"
                            )}
                          >
                            <div className="flex items-start gap-2">
                              <div className={cn(
                                "shrink-0 h-1.5 w-1.5 rounded-full mt-1.5",
                                n.isRead ? "bg-muted-foreground/40" : "bg-primary"
                              )} />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold">{n.title}</div>
                                <div className="text-xs text-muted-foreground line-clamp-2">{n.body}</div>
                                {n.createdAt && (
                                  <div className="text-[10px] text-muted-foreground/60 mt-1">
                                    {new Date(n.createdAt).toLocaleString("ar-EG", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      day: "numeric",
                                      month: "short",
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
              عرض الموقع
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
