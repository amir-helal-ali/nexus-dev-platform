"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Mail, Lock, ArrowUpLeft, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        toast.error("تعذّر تسجيل الدخول", { description: res.error });
      } else if (res?.ok) {
        toast.success("أهلاً بعودتك! 🎉");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("حدث خطأ غير متوقع");
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden py-12 px-4">
      {/* Background */}
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
          {/* Logo */}
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
            <h1 className="text-2xl font-extrabold mb-1">تسجيل الدخول</h1>
            <p className="text-sm text-muted-foreground">أهلاً بعودتك إلى حسابك</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
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
                  type={showPwd ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                <input type="checkbox" className="rounded border-white/20 bg-white/5" />
                تذكّرني
              </label>
              <a href="#" className="text-primary hover:underline">نسيت كلمة المرور؟</a>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2 shadow-lg shadow-primary/25"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  جارٍ الدخول...
                </>
              ) : (
                <>
                  تسجيل الدخول
                  <ArrowUpLeft className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            ليس لديك حساب؟{" "}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              أنشئ حساباً جديداً
            </Link>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
            <div className="font-semibold text-primary mb-1">🔑 حساب تجريبي للأدمن:</div>
            <div dir="ltr" className="text-right">admin@nexusdev.eg / Admin@2026</div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← العودة للرئيسية
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
