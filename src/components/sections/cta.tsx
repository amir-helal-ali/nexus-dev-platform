"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-strong rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px]" />
            <div className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] bg-[oklch(0.70_0.16_200/0.15)] rounded-full blur-[100px]" />
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          </div>

          <div className="relative text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              متاحون لمشاريع جديدة هذا الربع
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.15]">
              جاهز لبناء
              <span className="text-gradient-primary"> الشيء التالي؟</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              احجز جلسة استشارية مجانية مدتها 30 دقيقة. نناقش فكرتك، نقيم جدواها التقنية،
              ونرسم لك خارطة طريق واضحة — دون أي التزام.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2 shadow-xl shadow-primary/25 h-12 px-8 text-base"
              >
                <Link href="/contact">
                  <Calendar className="h-5 w-5" />
                  احجز جلسة مجانية
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-semibold rounded-xl gap-2 h-12 px-8 text-base border-white/15 bg-white/5 hover:bg-white/10"
              >
                <Link href="/templates">
                  تصفح القوالب أولاً
                  <ArrowUpLeft className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                ردّ خلال 24 ساعة
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                بدون التزامات
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                سرية تامة (NDA)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                🇪🇬 مكتب في القاهرة
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
