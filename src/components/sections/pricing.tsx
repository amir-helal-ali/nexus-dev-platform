"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, Rocket, Building2, ArrowUpLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PLANS, formatEGP } from "@/lib/data/content";

interface PricingProps {
  compact?: boolean;
}

export default function Pricing({ compact = false }: PricingProps) {
  return (
    <section id="pricing" className="relative py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-xs font-semibold text-primary mb-4">
            باقات الأسعار
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            أسعار شفافة
            <span className="text-gradient-primary"> بلا مفاجآت</span>
          </h2>
          <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
            اختر الباقة التي تناسب مرحلة مشروعك. كل باقة قابلة للتخصيص حسب احتياجك،
            مع ضمان الجودة والدعم بعد التسليم. الأسعار بالجنيه المصري وتشمل فاتورة ضريبية رسمية.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5 lg:gap-6 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "relative glass rounded-3xl p-7 transition-all hover:-translate-y-1",
                plan.border,
                plan.popular && "lg:scale-105 lg:-mt-2 shadow-2xl shadow-primary/10"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-1/2 translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold tracking-wide shadow-lg">
                  الأكثر طلباً
                </div>
              )}

              <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br mb-5", plan.color)}>
                <plan.icon className={cn("h-6 w-6", plan.accent)} />
              </div>

              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-5">{plan.tagline}</p>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/8">
                {plan.price > 0 ? (
                  <>
                    <span className="text-4xl font-extrabold">{formatEGP(plan.price)}</span>
                    <span className="text-sm text-muted-foreground">ج.م {plan.period}</span>
                  </>
                ) : (
                  <span className="text-3xl font-extrabold">حسب الطلب</span>
                )}
              </div>

              <ul className="space-y-3 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
                {plan.excluded.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground/60 line-through">
                    <span className="h-4 w-4 shrink-0 mt-0.5">—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={cn(
                  "w-full font-semibold rounded-xl gap-1.5",
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-white/5 hover:bg-white/10 text-foreground border border-white/10"
                )}
              >
                <Link href="/contact">
                  ابدأ الآن
                  <ArrowUpLeft className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {!compact && (
          <div className="mt-10 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              جميع الباقات تشمل: كود مصدري نظيف · توثيق فني · حقوق ملكية كاملة · ضمان رضا 100% · فاتورة ضريبية رسمية
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">💳 فودافون كاش</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">⚡ إنستاباي</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">🏪 فوري</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">🏦 تحويل بنكي</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">💎 فيزا/ماستركارد</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
