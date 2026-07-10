"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Terminal, Mail, Lock, User, Phone, ArrowUpLeft, Eye, EyeOff,
  AlertCircle, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordChecks = [
    { test: (p: string) => p.length >= 8, label: "8 أحرف على الأقل" },
    { test: (p: string) => /[A-Z]/.test(p), label: "حرف كبير واحد" },
    { test: (p: string) => /[a-z]/.test(p), label: "حرف صغير واحد" },
    { test: (p: string) => /[0-9]/.test(p), label: "رقم واحد" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        const errMsg = data.errors?.[0] || data.message || "تعذّر التسجيل";
        setError(errMsg);
        toast.error("تعذّر التسجيل", { description: errMsg });
        return;
      }

      toast.success("تم إنشاء حسابك بنجاح! 🎉");
      // Auto login
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      router.push("/");
      router.refresh();
    } catch (err) {
      setError("حدث خطأ غير متوقع");
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden py-12 px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] aurora-anim" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[oklch(0.70_0.16_200/0.15)] rounded-full blur-[100px] aurora-anim" style={{ animationDelay: "-7s" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-8 shadow-2xl shadow-black/40">
          <Link href="/" className="flex items-center justify-center gap-2.5 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/90 to-primary/60 border border-primary/40">
              <Terminal className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-extrabold tracking-tight">NEXUS<span className="text-primary">DEV</span></span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-widest">SOFTWARE ENGINEERING</span>
            </div>
          </Link>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold mb-1">إنشاء حساب جديد</h1>
            <p className="text-sm text-muted-foreground">انضم لمجتمع نكسوس ديف</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-semibold">الاسم الكامل</Label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="محمد عبدالله"
                  className="bg-white/5 border-white/10 rounded-xl h-11 pr-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="bg-white/5 border-white/10 rounded-xl h-11 pr-10"
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
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0100 123 4567"
                  className="bg-white/5 border-white/10 rounded-xl h-11 pr-10"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 rounded-xl h-11 pr-10 pl-10"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {/* Password strength */}
              {form.password && (
                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  {passwordChecks.map((check, i) => {
                    const passed = check.test(form.password);
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-1.5 text-[10px] ${passed ? "text-emerald-400" : "text-muted-foreground/60"}`}
                      >
                        {passed ? <Check className="h-3 w-3" /> : <span className="h-3 w-3">○</span>}
                        {check.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-xs font-semibold">تأكيد كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPwd ? "text" : "password"}
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 rounded-xl h-11 pr-10"
                  dir="ltr"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2 shadow-lg shadow-primary/25"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  جارٍ الإنشاء...
                </>
              ) : (
                <>
                  إنشاء الحساب
                  <ArrowUpLeft className="h-4 w-4" />
                </>
              )}
            </Button>

            <p className="text-[11px] text-center text-muted-foreground">
              بإنشائك حساباً، توافق على{" "}
              <Link href="/terms" className="text-primary hover:underline">شروط الخدمة</Link>
              {" "}و{" "}
              <Link href="/privacy" className="text-primary hover:underline">سياسة الخصوصية</Link>
            </p>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              سجّل دخولك
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
