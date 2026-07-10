"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, ShoppingCart, Cloud, Palette, ShieldCheck, ArrowUpLeft } from "lucide-react";

const SERVICES = [
  {
    icon: Code2,
    title: "تطوير تطبيقات الويب",
    desc: "نبني تطبيقات ويب فائقة الأداء باستخدام Next.js وReact وTypeScript، مع SSR/ISR وتحسين كامل لمحركات البحث وتجربة مستخدم استثنائية.",
    points: ["Next.js + App Router", "تحسين SEO كامل", "PWA جاهزة للنشر"],
    color: "from-emerald-500/20 to-emerald-500/5",
    accent: "text-emerald-400",
  },
  {
    icon: Smartphone,
    title: "تطوير تطبيقات الجوال",
    desc: "تطبيقات أصلية وهجينة لـ iOS وAndroid بـ React Native وExpo، بأداء قريب من الأصلي وتجربة مستخدم سلسة عبر جميع المنصات.",
    points: ["React Native + Expo", "iOS و Android", "نشر على المتاجر"],
    color: "from-sky-500/20 to-sky-500/5",
    accent: "text-sky-400",
  },
  {
    icon: ShoppingCart,
    title: "منصات التجارة الإلكترونية",
    desc: "متاجر إلكترونية متكاملة ببوابات دفع آمنة، إدارة مخزون، تحليلات متقدمة، وتجربة شراء سلسة مهّيأة للتحويل العالي.",
    points: ["دمج Stripe/PayPal", "لوحة تحكم متقدمة", "تحليلات حية"],
    color: "from-violet-500/20 to-violet-500/5",
    accent: "text-violet-400",
  },
  {
    icon: Cloud,
    title: "بنية تحتية و DevOps",
    desc: "تصميم ونشر بنية تحتية سحابية قابلة للتوسّع باستخدام Docker وKubernetes، مع أنابيب CI/CD آلية ومراقبة على مدار الساعة.",
    points: ["Docker + K8s", "CI/CD آلي", "مراقبة و logs"],
    color: "from-amber-500/20 to-amber-500/5",
    accent: "text-amber-400",
  },
  {
    icon: Palette,
    title: "تصميم تجربة المستخدم",
    desc: "تصميم UI/UX احترافي مبني على الأبحاث، يسبر المستخدم بسهولة ويعكس هوية علامتك التجارية بدقة وذوق رفيع.",
    points: ["Design System كامل", "Figma + Prototyping", "اختبارات قابلية"],
    color: "from-pink-500/20 to-pink-500/5",
    accent: "text-pink-400",
  },
  {
    icon: ShieldCheck,
    title: "تدقيق وأمان التطبيقات",
    desc: "تدقيق أمني شامل لتطبيقاتك، اختبارات اختراق، إصلاح الثغرات، وضمان امتثال OWASP ومعايير الأمان العالمية.",
    points: ["OWASP Top 10", "Penetration Testing", "تقارير تفصيلية"],
    color: "from-teal-500/20 to-teal-500/5",
    accent: "text-teal-400",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-xs font-semibold text-primary mb-4">
            خدماتنا الهندسية
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            حلول برمجية متكاملة من
            <span className="text-gradient-primary"> الفكرة إلى الإنتاج</span>
          </h2>
          <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
            نقدّم منظومة خدمات هندسية تغطّي دورة حياة المنتج بالكامل، من التصميم والتطوير
            إلى النشر والصيانة، بمعايير عالمية وفريق متخصص في كل مجال.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative"
            >
              <div className="relative h-full glass rounded-2xl p-6 lg:p-7 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                {/* Hover glow */}
                <div className={`absolute -top-px -right-px w-32 h-32 bg-gradient-to-bl ${service.color} rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500`} />

                <div className="relative">
                  <div className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br ${service.color} border border-white/10 mb-5`}>
                    <service.icon className={`h-7 w-7 ${service.accent}`} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  <ul className="space-y-2.5">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-sm">
                        <span className={`h-1.5 w-1.5 rounded-full ${service.accent.replace("text-", "bg-")}`} />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                  >
                    اطلب الخدمة
                    <ArrowUpLeft className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
