"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/content";

interface TestimonialsProps {
  compact?: boolean;
  limit?: number;
}

export default function Testimonials({ compact = false, limit }: TestimonialsProps) {
  const items = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS;

  return (
    <section id="testimonials" className="relative py-20 lg:py-28 border-y border-white/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-xs font-semibold text-primary mb-4">
            آراء عملائنا
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            ثقة عملاء نبنيها
            <span className="text-gradient-primary"> مشروعاً بعد مشروع</span>
          </h2>
          <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
            لا نطلب منك أن تأخذ كلامنا. استمع لما يقوله عملاؤنا عن تجربة العمل مع فريقنا
            والنتائج التي حققوها معاً.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass rounded-2xl p-6 hover:border-primary/30 transition-all hover:-translate-y-1 h-full flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-7 w-7 text-primary/30" />
              </div>

              <p className="text-sm text-foreground/90 leading-relaxed flex-1 mb-5">
                «{t.text}»
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full ${t.color} font-bold text-lg`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                  {t.city && (
                    <div className="text-[10px] text-muted-foreground/70 mt-0.5">📍 {t.city}</div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
