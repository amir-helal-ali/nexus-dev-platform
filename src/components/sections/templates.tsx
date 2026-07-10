"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Download, Eye, ArrowUpLeft, Tag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TEMPLATES, formatEGP } from "@/lib/data/content";

type Category = "all" | "frontend" | "backend" | "fullstack";

interface TemplatesProps {
  /** وضع مختصر للصفحة الرئيسية */
  compact?: boolean;
  limit?: number;
}

const FILTERS: { key: Category; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "frontend", label: "فرونت إند" },
  { key: "backend", label: "باك إند" },
  { key: "fullstack", label: "Full Stack" },
];

export default function Templates({ compact = false, limit }: TemplatesProps) {
  const [filter, setFilter] = useState<Category>("all");

  let templates = filter === "all" ? TEMPLATES : TEMPLATES.filter((t) => t.category === filter);
  if (limit) templates = templates.slice(0, limit);

  return (
    <section id="templates" className="relative py-20 lg:py-28 border-y border-white/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-xs font-semibold text-primary mb-4">
            <Tag className="h-3.5 w-3.5" />
            سوق القوالب الجاهزة
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            قوالب أكواد جاهزة
            <span className="text-gradient-primary"> للإنتاج الفوري</span>
          </h2>
          <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
            مكتبة من القوالب الهندسية المختبرة، كُتبت بمعايير الإنتاج — نظيفة، موثّقة، قابلة للتوسّع.
            حمّل، ادمج، انشر في دقائق. تدعم طرق الدفع المصرية وفودافون كاش وإنستاباي.
          </p>
        </motion.div>

        {/* Filters */}
        {!compact && (
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-1 p-1 glass rounded-xl">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "relative px-4 sm:px-5 py-2 text-sm font-semibold rounded-lg transition-colors",
                    filter === f.key ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {filter === f.key && (
                    <motion.div
                      layoutId="filter-pill"
                      className="absolute inset-0 bg-primary rounded-lg shadow-lg shadow-primary/25"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {templates.map((tpl) => (
              <motion.div
                key={tpl.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                <div className="relative h-full glass rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                  {/* Cover */}
                  <div className={cn("relative h-40 bg-gradient-to-br overflow-hidden", tpl.gradient)}>
                    <div className="absolute inset-0 bg-grid-pattern opacity-40" />
                    {/* Mock UI window */}
                    <div className="absolute inset-4 glass-strong rounded-lg p-3 flex flex-col gap-1.5">
                      <div className="flex gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-red-400/70" />
                        <div className="h-2 w-2 rounded-full bg-yellow-400/70" />
                        <div className="h-2 w-2 rounded-full bg-green-400/70" />
                      </div>
                      <div className="flex-1 grid grid-cols-3 gap-1.5 mt-1">
                        <div className="col-span-1 bg-white/10 rounded" />
                        <div className="col-span-2 space-y-1">
                          <div className="h-1.5 bg-white/15 rounded w-full" />
                          <div className="h-1.5 bg-white/15 rounded w-2/3" />
                          <div className="h-1.5 bg-white/15 rounded w-3/4" />
                          <div className="h-4 bg-primary/30 rounded w-1/3 mt-1.5" />
                        </div>
                      </div>
                    </div>

                    {/* Popular badge */}
                    {tpl.popular && (
                      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold tracking-wide shadow-lg">
                        الأكثر مبيعاً
                      </div>
                    )}
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded glass-strong text-[10px] font-semibold">
                      {tpl.categoryLabel}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold leading-tight">{tpl.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-amber-400 shrink-0">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span className="font-semibold text-foreground">{tpl.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{tpl.tag}</p>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tpl.stack.slice(0, 4).map((s) => (
                        <Badge key={s} variant="secondary" className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border-white/10">
                          {s}
                        </Badge>
                      ))}
                    </div>

                    {/* Features */}
                    <ul className="space-y-1.5 mb-5">
                      {tpl.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-foreground">{formatEGP(tpl.price)}</span>
                        <span className="text-xs text-muted-foreground">ج.م</span>
                        {tpl.oldPrice && (
                          <span className="text-sm text-muted-foreground line-through">{formatEGP(tpl.oldPrice)}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Download className="h-3.5 w-3.5" />
                          {tpl.downloads}
                        </span>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="mt-4 w-full bg-primary/90 hover:bg-primary text-primary-foreground font-semibold rounded-xl gap-1.5"
                    >
                      <Link href={`/templates#${tpl.id}`}>
                        <Eye className="h-4 w-4" />
                        معاينة + شراء
                        <ArrowUpLeft className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            تحتاج قالباً مخصصاً لمشروعك؟ نصممه لك من الصفر.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl gap-2 border-white/15 bg-white/5 hover:bg-white/10"
          >
            <Link href="/contact">
              اطلب قالباً مخصصاً
              <ArrowUpLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
