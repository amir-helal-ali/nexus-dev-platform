"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, ArrowUpLeft, Phone, MessageSquare, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_LINKS, COMPANY } from "@/lib/data/content";
import { useNotifications } from "@/hooks/use-notifications";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { unreadCount, connected: notifConnected } = useNotifications();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (!open) return;
    // Close when pathname changes (navigation occurred)
    const timeout = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(timeout);
  }, [pathname, open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-5"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300",
            scrolled ? "glass-strong shadow-2xl shadow-black/40" : "bg-transparent"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-md group-hover:bg-primary/50 transition-colors" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/90 to-primary/60 border border-primary/40">
                <Terminal className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-extrabold tracking-tight">NEXUS<span className="text-primary">DEV</span></span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-widest">{COMPANY.taglineEn}</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium transition-colors rounded-lg",
                  isActive(link.href)
                    ? "text-foreground bg-white/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute bottom-0 right-1/2 translate-x-1/2 h-0.5 w-6 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${COMPANY.phoneEG.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              dir="ltr"
            >
              <Phone className="h-3.5 w-3.5" />
              {COMPANY.phoneEG}
            </a>

            {/* Chat icon with unread badge (if logged in) */}
            {session?.user && (
              <Link
                href={session.user.role === "admin" ? "/admin/chats" : "/chat"}
                className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
                title="المحادثات"
              >
                <MessageSquare className="h-4 w-4" />
                {unreadCount.messages > 0 && (
                  <span className="absolute -top-0.5 -left-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {unreadCount.messages > 9 ? "9+" : unreadCount.messages}
                  </span>
                )}
                {notifConnected && (
                  <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                )}
              </Link>
            )}

            {/* Auth area */}
            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 border border-primary/20 font-bold text-primary text-xs">
                    {session.user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold">{session.user.name.split(" ")[0]}</span>
                </button>
                <AnimatePresence>
                  {userMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 w-48 glass-strong rounded-xl overflow-hidden shadow-2xl z-50"
                    >
                      <div className="p-3 border-b border-white/8">
                        <div className="text-sm font-bold">{session.user.name}</div>
                        <div className="text-xs text-muted-foreground truncate" dir="ltr">{session.user.email}</div>
                      </div>
                      <div className="p-1.5">
                        <Link
                          href="/chat"
                          onClick={() => setUserMenu(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <MessageSquare className="h-4 w-4" />
                          محادثاتي
                          {unreadCount.messages > 0 && (
                            <span className="mr-auto px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                              {unreadCount.messages}
                            </span>
                          )}
                        </Link>
                        {session.user.role === "admin" && (
                          <Link
                            href="/admin"
                            onClick={() => setUserMenu(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <UserIcon className="h-4 w-4" />
                            لوحة الإدارة
                          </Link>
                        )}
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors text-red-400"
                        >
                          <LogOut className="h-4 w-4" />
                          تسجيل الخروج
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button
                asChild
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-1.5 shadow-lg shadow-primary/20"
              >
                <Link href="/login">
                  تسجيل الدخول
                  <ArrowUpLeft className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
            aria-label="القائمة"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden mt-2 glass-strong rounded-2xl overflow-hidden"
            >
              <div className="flex flex-col p-3 gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                      isActive(link.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 px-4 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-xl text-center"
                >
                  ابدأ مشروعك الآن
                </Link>
                <a
                  href={`tel:${COMPANY.phoneEG.replace(/\s/g, "")}`}
                  className="mt-1 px-4 py-3 text-sm text-muted-foreground text-center flex items-center justify-center gap-2"
                  dir="ltr"
                >
                  <Phone className="h-4 w-4" />
                  {COMPANY.phoneEG}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
