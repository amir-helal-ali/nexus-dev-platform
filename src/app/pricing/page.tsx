import Link from "next/link";
import PageLayout from "@/components/site/page-layout";
import FAQ from "@/components/sections/faq";
import CTA from "@/components/sections/cta";
import { PLANS, PAYMENT_METHODS, formatEGP, COMPANY } from "@/lib/data/content";
import { Check, ArrowUpLeft, ShieldCheck, FileText, Headphones } from "lucide-react";

export const metadata = {
  title: "الباقات والأسعار | NEXUS DEV",
  description: "باقات شفافة بأسعار بالجنيه المصري — Starter, Growth, Enterprise. فاتورة ضريبية رسمية وطرق دفع مصرية.",
};

export default function PricingPage() {
  return (
    <PageLayout
      title="باقات وأسعار شفافة"
      subtitle="اختر الباقة التي تناسب مرحلة مشروعك. كل باقة قابلة للتخصيص حسب احتياجك — بالجنيه المصري، مع فاتورة ضريبية رسمية وطرق دفع مصرية متعددة."
      breadcrumb={[{ label: "الباقات" }]}
      background="subtle"
    >
      {/* Plans grid */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-5 lg:gap-6 items-start">
            {PLANS.map((plan, i) => (
              <div
                key={plan.id}
                className={`relative glass rounded-3xl p-7 transition-all hover:-translate-y-1 ${
                  plan.border
                } ${plan.popular ? "lg:scale-105 lg:-mt-2 shadow-2xl shadow-primary/10" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-1/2 translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold tracking-wide shadow-lg">
                    الأكثر طلباً
                  </div>
                )}

                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br mb-5 ${plan.color}`}>
                  <plan.icon className={`h-6 w-6 ${plan.accent}`} />
                </div>

                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-5">{plan.tagline}</p>

                <div className="flex items-baseline gap-1 mb-2 pb-6 border-b border-white/8">
                  {plan.price > 0 ? (
                    <>
                      <span className="text-4xl font-extrabold">{formatEGP(plan.price)}</span>
                      <span className="text-sm text-muted-foreground">ج.م {plan.period}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-extrabold">حسب الطلب</span>
                  )}
                </div>
                {plan.priceUSD > 0 && (
                  <div className="text-xs text-muted-foreground mb-4 -mt-3">
                    ≈ ${plan.priceUSD.toLocaleString()} USD
                  </div>
                )}

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

                <Link
                  href="/contact"
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-white/5 hover:bg-white/10 text-foreground border border-white/10"
                  }`}
                >
                  {plan.price > 0 ? "اختر هذه الباقة" : "تواصل معنا"}
                  <ArrowUpLeft className="inline-block h-4 w-4 mr-1.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { icon: FileText, title: "فاتورة ضريبية رسمية", desc: "مسجّل ضريبياً في مصر — رقم ضريبي: " + COMPANY.taxNumber },
              { icon: ShieldCheck, title: "ضمان رضا 100%", desc: "استرداد كامل خلال 14 يوم إذا لم تكن راضياً" },
              { icon: Headphones, title: "دعم فني متواصل", desc: "دعم مباشر عبر واتساب والبريد طوال فترة المشروع" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 glass rounded-2xl p-5">
                <div className="shrink-0 h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-sm mb-1">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment methods */}
      <section className="py-16 lg:py-20 border-y border-white/5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
              طرق دفع <span className="text-gradient-primary">مصرية متنوعة</span>
            </h2>
            <p className="text-muted-foreground">
              نوفّر كل طرق الدفع الشائعة في السوق المصري — اختر ما يناسبك
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PAYMENT_METHODS.map((method) => (
              <div key={method.name} className="glass rounded-2xl p-5 hover:border-primary/30 transition-colors flex items-center gap-4">
                <div className="text-3xl">{method.icon}</div>
                <div>
                  <div className="font-bold">{method.name}</div>
                  <div className="text-xs text-muted-foreground">{method.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-primary/5 border border-primary/20 text-center text-sm text-muted-foreground">
            💡 للمشاريع الكبيرة، نقسّم الدفع على 3 دفعات: <span className="text-foreground font-semibold">30% دفعة أولى</span> · <span className="text-foreground font-semibold">40% منتصف المشروع</span> · <span className="text-foreground font-semibold">30% عند التسليم</span>
          </div>
        </div>
      </section>

      <FAQ limit={5} />
      <CTA />
    </PageLayout>
  );
}
