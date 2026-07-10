"use client";

import { motion } from "framer-motion";
import { ArrowUpLeft, TrendingUp, Users, Clock } from "lucide-react";

const PROJECTS = [
  {
    name: "FinFlow Banking",
    category: "Fintech / ويب",
    desc: "منصة مصرفية رقمية متكاملة، محفظة، تحويلات فورية، بطاقات افتراضية، ولوحة تحكم تحليلية.",
    metrics: [
      { icon: Users, value: "+250K", label: "مستخدم نشط" },
      { icon: TrendingUp, value: "+340%", label: "نمو الإيرادات" },
      { icon: Clock, value: "1.2s", label: "زمن الاستجابة" },
    ],
    gradient: "from-emerald-500/40 via-teal-500/30 to-cyan-500/40",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
  },
  {
    name: "MedBook Care",
    category: "Healthcare / موبايل",
    desc: "تطبيق حجز مواعيد عيادات، استشارات فيديو، ملفات طبية إلكترونية، وتذكيرات ذكية للمريض.",
    metrics: [
      { icon: Users, value: "+80K", label: "تنزيل" },
      { icon: TrendingUp, value: "4.9★", label: "تقييم المتجر" },
      { icon: Clock, value: "2 أسابيع", label: "للنسخة الأولى" },
    ],
    gradient: "from-sky-500/40 via-blue-500/30 to-indigo-500/40",
    tags: ["React Native", "Expo", "tRPC", "WebRTC"],
  },
  {
    name: "ShopSphere",
    category: "E-commerce / ويب",
    desc: "سوق متعدد البائعين بأكثر من 12 ألف منتج، نظام ولاء، فيد لا نهائي، وتجربة شراء سلسة.",
    metrics: [
      { icon: Users, value: "+500K", label: "زائر شهرياً" },
      { icon: TrendingUp, value: "+187%", label: "معدل التحويل" },
      { icon: Clock, value: "0.8s", label: "LCP" },
    ],
    gradient: "from-violet-500/40 via-purple-500/30 to-fuchsia-500/40",
    tags: ["Next.js", "Redis", "Elasticsearch", "Stripe"],
  },
  {
    name: "LearnHub LMS",
    category: "EdTech / Full Stack",
    desc: "منصة تعلّم إلكتروني بمئات الكورسات، اختبارات تفاعلية، شهادات مكتملة، وتتبع تقدّم حي.",
    metrics: [
      { icon: Users, value: "+120K", label: "طالب" },
      { icon: TrendingUp, value: "+95%", label: "إكمال الكورسات" },
      { icon: Clock, value: "5 أيام", label: "MVP" },
    ],
    gradient: "from-amber-500/40 via-orange-500/30 to-red-500/40",
    tags: ["Next.js", "Bun", "PostgreSQL", "Mux"],
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-xs font-semibold text-primary mb-4">
            أعمالنا المختارة
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            منتجات أطلقناها
            <span className="text-gradient-primary"> وحقّقت نمواً</span>
          </h2>
          <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
            نفتخر بكل مشروع أنجزناه. هذه نماذج مختارة من منتجات نفذناها لعملاء حول العالم،
            بأرقام تتحدث عن نفسها.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative"
            >
              <div className="relative h-full glass rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                {/* Cover mock */}
                <div className={`relative h-44 sm:h-52 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                  {/* Mock UI */}
                  <div className="absolute inset-5 glass-strong rounded-2xl p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-red-400/70" />
                        <div className="h-2 w-2 rounded-full bg-yellow-400/70" />
                        <div className="h-2 w-2 rounded-full bg-green-400/70" />
                      </div>
                      <div className="h-1.5 w-16 bg-white/15 rounded" />
                    </div>
                    <div className="flex-1 grid grid-cols-4 gap-1.5 mt-1">
                      <div className="col-span-1 space-y-1">
                        <div className="h-1.5 bg-white/15 rounded" />
                        <div className="h-1.5 bg-white/15 rounded w-3/4" />
                        <div className="h-1.5 bg-white/15 rounded w-2/3" />
                        <div className="h-1.5 bg-white/15 rounded w-1/2" />
                      </div>
                      <div className="col-span-3 space-y-1">
                        <div className="h-4 bg-primary/30 rounded" />
                        <div className="grid grid-cols-3 gap-1">
                          <div className="h-6 bg-white/10 rounded" />
                          <div className="h-6 bg-white/10 rounded" />
                          <div className="h-6 bg-white/10 rounded" />
                        </div>
                        <div className="h-1.5 bg-white/10 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[11px] uppercase tracking-widest text-primary font-bold">
                        {p.category}
                      </span>
                      <h3 className="text-xl font-bold mt-0.5">{p.name}</h3>
                    </div>
                    <ArrowUpLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {p.desc}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="text-center p-2.5 rounded-xl bg-white/5 border border-white/8">
                        <m.icon className="h-3.5 w-3.5 text-primary mx-auto mb-1" />
                        <div className="text-base font-extrabold">{m.value}</div>
                        <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/8 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
