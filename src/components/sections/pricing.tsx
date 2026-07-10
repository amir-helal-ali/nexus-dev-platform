"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Rocket, Building2, ArrowUpLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    icon: Rocket,
    name: "Starter",
    tagline: "للمشاريع الناشئة وMVP",
    price: 1900,
    period: "/ مشروع",
    color: "from-sky-500/15 to-sky-500/5",
    accent: "text-sky-400",
    border: "border-white/10",
    features: [
      "تطبيق ويب حتى 8 صفحات",
      "تصميم UI/UX احترافي",
      "Backend + قاعدة بيانات",
      "مصادقة + لوحة تحكم",
      "نشر على Vercel/Render",
      "30 يوم دعم فني",
      "كود مصدري كامل",
    ],
    excluded: ["تطبيق موبايل", "DevOps مخصص", "صيانة شهرية"],
  },
  {
    icon: Building2,
    name: "Growth",
    tagline: "الأكثر اختياراً للشركات",
    price: 4900,
    period: "/ مشروع",
    color: "from-primary/20 to-primary/5",
    accent: "text-primary",
    border: "border-primary/40",
    popular: true,
    features: [
      "تطبيق ويب كامل + API",
      "تطبيق موبايل (iOS/Android)",
      "تصميم UX متقدم + Design System",
      "Backend متعدد الخدمات",
      "دمج بوابات دفع + Stripe",
      "نشر سحابي + CI/CD",
      "اختبارات E2E شاملة",
      "90 يوم دعم فني",
      "文档 كامل + تدريب",
    ],
    excluded: ["بنية K8s مخصصة"],
  },
  {
    icon: Sparkles,
    name: "Enterprise",
    tagline: "للحلول الكبيرة والمعقدة",
    price: "حسب الطلب",
    period: "",
    color: "from-violet-500/15 to-violet-500/5",
    accent: "text-violet-400",
    border: "border-white/10",
    features: [
      "حلول مخصصة بالكامل",
      "بنية Microservices + K8s",
      "تكامل أنظمة Legacy",
      "أمان + OWASP Audit",
      "SLA 99.99% uptime",
      "فريق مخصص مخصص",
      "صيانة شهرية مستمرة",
      "استشارات استراتيجية",
      "دعم 24/7 أولوية",
    ],
    excluded: [],
  },
];

export default function Pricing() {
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
            مع ضمان الجودة والدعم بعد التسليم.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5 lg:gap-6 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
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
                {typeof plan.price === "number" ? (
                  <>
                    <span className="text-4xl font-extrabold">${plan.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </>
                ) : (
                  <span className="text-3xl font-extrabold">{plan.price}</span>
                )}
              </div>

              <ul className="space-y-3 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
                {plan.excluded.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground/60 line-through">
                    <span className="h-4.5 w-4.5 shrink-0 mt-0.5">—</span>
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
                <a href="#contact">
                  ابدأ الآن
                  <ArrowUpLeft className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          جميع الباقات تشمل: كود مصدري نظيف · توثيق فني · حقوق ملكية كاملة · ضمان رضا 100%
        </p>
      </div>
    </section>
  );
}
