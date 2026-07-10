"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { SERVICES } from "@/lib/data/content";

interface ServicesProps {
  /** إذا true، يعرض الخدمات بشكل مختصر للصفحة الرئيسية */
  compact?: boolean;
  /** عدد العناصر في الوضع المختصر */
  limit?: number;
}

export default function Services({ compact = false, limit }: ServicesProps) {
  const services = limit ? SERVICES.slice(0, limit) : SERVICES;

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
            إلى النشر والصيانة، بمعايير عالمية وفريق متخصص في كل مجال — ومُكيّفة للسوق المصري.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative"
            >
              <Link href={`/services#${service.slug}`} className="block h-full">
                <div className="relative h-full glass rounded-2xl p-6 lg:p-7 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                  {/* Hover glow */}
                  <div className={`absolute -top-px -right-px w-32 h-32 bg-gradient-to-bl ${service.color} rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500`} />

                  <div className="relative">
                    <div className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br ${service.color} border border-white/10 mb-5`}>
                      <service.icon className={`h-7 w-7 ${service.accent}`} strokeWidth={1.8} />
                    </div>

                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {compact ? service.short : service.desc}
                    </p>

                    {!compact && (
                      <ul className="space-y-2.5">
                        {service.points.map((point) => (
                          <li key={point} className="flex items-center gap-2.5 text-sm">
                            <span className={`h-1.5 w-1.5 rounded-full ${service.accent.replace("text-", "bg-")}`} />
                            <span className="text-muted-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">يبدأ من</span>
                      <span className="text-lg font-bold text-foreground">
                        {new Intl.NumberFormat("ar-EG").format(service.priceFrom)} ج.م
                      </span>
                    </div>

                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                      التفاصيل
                      <ArrowUpLeft className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {compact && (
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 hover:text-primary font-semibold text-sm transition-colors"
            >
              عرض كل الخدمات
              <ArrowUpLeft className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
