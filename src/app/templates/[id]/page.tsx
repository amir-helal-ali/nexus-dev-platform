"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star, Download, Check, ArrowUpLeft, Shield, FileCode, RefreshCw,
  Headphones, Eye, ShoppingCart, ChevronLeft, Code2, Layers, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TEMPLATES, formatEGP, PAYMENT_METHODS } from "@/lib/data/content";
import { toast } from "sonner";

export default function TemplateDetailPage() {
  const params = useParams<{ id: string }>();
  const template = TEMPLATES.find((t) => t.id === params.id);

  const [purchasing, setPurchasing] = useState(false);
  const [purchased, setPurchased] = useState(false);

  if (!template) {
    notFound();
  }

  const handlePurchase = async () => {
    setPurchasing(true);
    await new Promise((r) => setTimeout(r, 1600));
    setPurchasing(false);
    setPurchased(true);
    toast.success("تم تسجيل طلبك بنجاح!", {
      description: `قالب ${template.name} — سنتواصل معك خلال ساعة لإتمام الدفع والتسليم.`,
    });
  };

  const relatedTemplates = TEMPLATES
    .filter((t) => t.id !== template.id && t.category === template.category)
    .slice(0, 3);

  return (
    <div className="relative min-h-screen flex flex-col bg-background pt-24">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
        >
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <ChevronLeft className="h-3.5 w-3.5" />
          <Link href="/templates" className="hover:text-primary transition-colors">القوالب</Link>
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="text-foreground">{template.name}</span>
        </motion.nav>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative aspect-video rounded-3xl bg-gradient-to-br ${template.gradient} overflow-hidden`}
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />
              <div className="absolute inset-8 glass-strong rounded-2xl p-6 flex flex-col gap-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>
                <div className="flex-1 grid grid-cols-4 gap-2">
                  <div className="col-span-1 space-y-1.5">
                    <div className="h-2 bg-white/15 rounded" />
                    <div className="h-2 bg-white/15 rounded w-3/4" />
                    <div className="h-2 bg-white/15 rounded w-2/3" />
                    <div className="h-2 bg-white/15 rounded w-1/2" />
                    <div className="h-2 bg-white/15 rounded" />
                  </div>
                  <div className="col-span-3 space-y-1.5">
                    <div className="h-8 bg-primary/30 rounded" />
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="h-12 bg-white/10 rounded" />
                      <div className="h-12 bg-white/10 rounded" />
                      <div className="h-12 bg-white/10 rounded" />
                    </div>
                    <div className="h-2 bg-white/10 rounded w-2/3" />
                    <div className="h-2 bg-white/10 rounded w-1/2" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Title + meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-white/5 border-white/10">{template.categoryLabel}</Badge>
                {template.popular && (
                  <Badge className="bg-primary text-primary-foreground">الأكثر مبيعاً</Badge>
                )}
                <Badge variant="outline" className="border-white/10">ترخيص {template.license}</Badge>
              </div>

              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">
                {template.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                {template.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-foreground">{template.rating}</span>
                  تقييم
                </span>
                <span className="flex items-center gap-1.5">
                  <Download className="h-4 w-4 text-primary" />
                  {template.downloads} تحميل
                </span>
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="h-4 w-4 text-primary" />
                  آخر تحديث: {template.lastUpdate}
                </span>
                {template.pages && (
                  <span className="flex items-center gap-1.5">
                    <FileCode className="h-4 w-4 text-primary" />
                    {template.pages} صفحة
                  </span>
                )}
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/8">
                  <TabsTrigger value="features">المميزات</TabsTrigger>
                  <TabsTrigger value="stack">التقنيات</TabsTrigger>
                  <TabsTrigger value="license">الترخيص</TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="mt-6">
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">ماذا ستحصل عليه؟</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {template.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="stack" className="mt-6">
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">التقنيات المستخدمة</h3>
                    <div className="flex flex-wrap gap-2">
                      {template.stack.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-sm font-mono"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <p className="text-sm text-muted-foreground">
                        💡 <span className="text-foreground font-semibold">ملاحظة:</span> القالب مبني بأحدث إصدارات هذه التقنيات، مع توثيق كامل لكل ميزة وأمثلة استخدام.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="license" className="mt-6">
                  <div className="glass rounded-2xl p-6 space-y-4">
                    <h3 className="text-xl font-bold">ترخيص {template.license}</h3>
                    <div className="space-y-3 text-sm">
                      {[
                        { allowed: true, text: "استخدام في مشروع واحد (تجاري أو شخصي)" },
                        { allowed: true, text: "تعديل وتخصيص الكود" },
                        { allowed: true, text: "استخدام في مشاريع العملاء" },
                        { allowed: true, text: "تحديثات مدى الحياة" },
                        { allowed: false, text: "إعادة بيع القالب نفسه" },
                        { allowed: false, text: "توزيع القالب مجاناً" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          {item.allowed ? (
                            <Check className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <span className="h-4 w-4 text-red-400">✕</span>
                          )}
                          <span className={item.allowed ? "text-foreground" : "text-muted-foreground line-through"}>
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Why buy from us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4">لماذا تشتري من نكسوس ديف؟</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Code2, title: "كود نظيف 100%", desc: "TypeScript كامل، تعليقات، أنماط معتمدة" },
                  { icon: Shield, title: "آمن ومُختبر", desc: "اختبارات شاملة، لا ثغرات أمنية معروفة" },
                  { icon: Zap, title: "أداء عالٍ", desc: "Lighthouse 90+, Core Web Vitals ممتازة" },
                  { icon: Headphones, title: "دعم فني", desc: "دعم عبر واتساب لمدة 30 يوم" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar — purchase box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 glass-strong rounded-3xl p-6 shadow-2xl shadow-black/40">
              {/* Price */}
              <div className="text-center pb-6 border-b border-white/8">
                {template.oldPrice && (
                  <div className="text-sm text-muted-foreground line-through mb-1">
                    {formatEGP(template.oldPrice)} ج.م
                  </div>
                )}
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-extrabold">{formatEGP(template.price)}</span>
                  <span className="text-sm text-muted-foreground">ج.م</span>
                </div>
                {template.oldPrice && (
                  <div className="mt-2 inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
                    وفّر {formatEGP(template.oldPrice - template.price)} ج.م
                  </div>
                )}
              </div>

              {/* Purchase button */}
              <Button
                onClick={handlePurchase}
                disabled={purchasing || purchased}
                className="w-full mt-6 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2 shadow-lg shadow-primary/25"
              >
                {purchased ? (
                  <>
                    <Check className="h-5 w-5" />
                    تم تسجيل طلبك
                  </>
                ) : purchasing ? (
                  <>
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    جارٍ المعالجة...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    اشترِ الآن
                  </>
                )}
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full mt-3 h-11 rounded-xl gap-2 border-white/15 bg-white/5 hover:bg-white/10"
              >
                <Link href="/contact">
                  <Eye className="h-4 w-4" />
                  اطلب معاينة حية
                </Link>
              </Button>

              {/* Trust badges */}
              <div className="mt-6 space-y-2.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  دفع آمن · ضمان استرجاع 14 يوم
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-3.5 w-3.5 text-primary" />
                  تحميل فوري بعد إتمام الدفع
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-3.5 w-3.5 text-primary" />
                  تحديثات مدى الحياة مجاناً
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="h-3.5 w-3.5 text-primary" />
                  دعم فني 30 يوم
                </div>
              </div>

              {/* Payment methods */}
              <div className="mt-6 pt-6 border-t border-white/8">
                <div className="text-xs font-semibold text-muted-foreground mb-3">طرق الدفع المصرية:</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {PAYMENT_METHODS.slice(0, 6).map((m) => (
                    <div key={m.name} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 text-center" title={m.name}>
                      <span className="text-base">{m.icon}</span>
                      <span className="text-[9px] text-muted-foreground leading-tight">{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related templates */}
        {relatedTemplates.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">قوالب مشابهة</h2>
              <Link href="/templates" className="text-sm text-primary hover:underline flex items-center gap-1">
                عرض الكل
                <ArrowUpLeft className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedTemplates.map((t) => (
                <Link
                  key={t.id}
                  href={`/templates/${t.id}`}
                  className="group glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1"
                >
                  <div className={`relative h-32 bg-gradient-to-br ${t.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                    <div className="absolute inset-3 glass-strong rounded-lg p-2 flex flex-col gap-1">
                      <div className="flex gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400/70" />
                      </div>
                      <div className="flex-1 grid grid-cols-3 gap-1">
                        <div className="bg-white/10 rounded" />
                        <div className="col-span-2 space-y-1">
                          <div className="h-1 bg-white/15 rounded w-full" />
                          <div className="h-1 bg-white/15 rounded w-2/3" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">{t.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{t.tag}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{formatEGP(t.price)} ج.م</span>
                      <div className="flex items-center gap-1 text-xs text-amber-400">
                        <Star className="h-3 w-3 fill-current" />
                        {t.rating}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
