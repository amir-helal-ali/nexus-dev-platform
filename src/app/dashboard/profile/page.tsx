"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  ChevronLeft, User, Mail, Phone, Lock, Save, Loader2,
  CheckCircle2, Eye, EyeOff, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [form, setForm] = useState({
    name: session?.user?.name || "",
    phone: session?.user?.phone || "",
  });
  const [pwd, setPwd] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);
  const [error, setError] = useState("");

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-background pt-24 px-4">
        <div className="glass-strong rounded-3xl p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">سجّل دخولك</h1>
          <p className="text-sm text-muted-foreground mb-5">لتعديل إعدادات حسابك</p>
          <Link href="/login?callbackUrl=/dashboard/profile" className="inline-block px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setError("");
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        const errMsg = data.errors?.[0] || data.message || "تعذّر الحفظ";
        setError(errMsg);
        toast.error("تعذّر الحفظ", { description: errMsg });
        return;
      }
      toast.success("تم حفظ التغييرات بنجاح");
      // Update session
      await update({ name: form.name });
    } catch (err) {
      setError("حدث خطأ غير متوقع");
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (pwd.newPassword !== pwd.confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }

    setSavingPwd(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: pwd.currentPassword,
          newPassword: pwd.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        const errMsg = data.errors?.[0] || data.message || "تعذّر تغيير كلمة المرور";
        setError(errMsg);
        toast.error("تعذّر تغيير كلمة المرور", { description: errMsg });
        return;
      }
      toast.success("تم تغيير كلمة المرور بنجاح");
      setPwd({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError("حدث خطأ غير متوقع");
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setSavingPwd(false);
    }
  };

  const passwordChecks = [
    { test: (p: string) => p.length >= 8, label: "8 أحرف على الأقل" },
    { test: (p: string) => /[A-Z]/.test(p), label: "حرف كبير واحد" },
    { test: (p: string) => /[a-z]/.test(p), label: "حرف صغير واحد" },
    { test: (p: string) => /[0-9]/.test(p), label: "رقم واحد" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-background pt-24">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-3xl px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <ChevronLeft className="h-3.5 w-3.5" />
          <Link href="/dashboard" className="hover:text-primary transition-colors">لوحة التحكم</Link>
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="text-foreground">الملف الشخصي</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-extrabold tracking-tight">إعدادات الحساب</h1>
          <p className="text-sm text-muted-foreground mt-1">عدّل بياناتك الشخصية وكلمة المرور</p>
        </motion.div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Profile info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold">البيانات الشخصية</h2>
                <p className="text-xs text-muted-foreground">اسمك ورقم هاتفك</p>
              </div>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-semibold">الاسم الكامل</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-white/5 border-white/10 rounded-xl h-11 pr-10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold">البريد الإلكتروني (غير قابل للتعديل)</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    value={session.user.email}
                    disabled
                    className="bg-white/[0.02] border-white/10 rounded-xl h-11 pr-10 opacity-60"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-semibold">رقم الهاتف (مصري)</Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0100 123 4567"
                    className="bg-white/5 border-white/10 rounded-xl h-11 pr-10"
                    dir="ltr"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={savingProfile}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2 h-11"
              >
                {savingProfile ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    جارٍ الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    حفظ التغييرات
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Change password */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Lock className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h2 className="font-bold">تغيير كلمة المرور</h2>
                <p className="text-xs text-muted-foreground">اختر كلمة مرور قوية</p>
              </div>
            </div>

            <form onSubmit={handlePasswordSave} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="currentPassword" className="text-xs font-semibold">كلمة المرور الحالية</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="currentPassword"
                    type={showPwd ? "text" : "password"}
                    required
                    value={pwd.currentPassword}
                    onChange={(e) => setPwd({ ...pwd, currentPassword: e.target.value })}
                    className="bg-white/5 border-white/10 rounded-xl h-11 pr-10 pl-10"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="newPassword" className="text-xs font-semibold">كلمة المرور الجديدة</Label>
                  <Input
                    id="newPassword"
                    type={showPwd ? "text" : "password"}
                    required
                    value={pwd.newPassword}
                    onChange={(e) => setPwd({ ...pwd, newPassword: e.target.value })}
                    className="bg-white/5 border-white/10 rounded-xl h-11"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-xs font-semibold">تأكيد كلمة المرور</Label>
                  <Input
                    id="confirmPassword"
                    type={showPwd ? "text" : "password"}
                    required
                    value={pwd.confirmPassword}
                    onChange={(e) => setPwd({ ...pwd, confirmPassword: e.target.value })}
                    className="bg-white/5 border-white/10 rounded-xl h-11"
                    dir="ltr"
                  />
                </div>
              </div>

              {pwd.newPassword && (
                <div className="grid grid-cols-2 gap-1.5 p-3 rounded-xl bg-white/5">
                  {passwordChecks.map((check, i) => {
                    const passed = check.test(pwd.newPassword);
                    return (
                      <div
                        key={i}
                        className={cn(
                          "flex items-center gap-1.5 text-[11px]",
                          passed ? "text-emerald-400" : "text-muted-foreground/60"
                        )}
                      >
                        {passed ? <CheckCircle2 className="h-3 w-3" /> : <span className="h-3 w-3">○</span>}
                        {check.label}
                      </div>
                    );
                  })}
                </div>
              )}

              <Button
                type="submit"
                disabled={savingPwd || !pwd.currentPassword || !pwd.newPassword}
                className="bg-amber-500/90 hover:bg-amber-500 text-amber-950 font-semibold rounded-xl gap-2 h-11"
              >
                {savingPwd ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    جارٍ التغيير...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    تغيير كلمة المرور
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Back to dashboard */}
        <div className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4 rotate-180" />
            العودة للوحة التحكم
          </Link>
        </div>
      </div>
    </div>
  );
}
