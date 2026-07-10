"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpLeft, TrendingUp, Users, Clock } from "lucide-react";
import { PROJECTS } from "@/lib/data/content";

interface PortfolioProps {
  compact?: boolean;
  limit?: number;
}

export default function Portfolio({ compact = false, limit }: PortfolioProps) {
  const projects = limit ? PROJECTS.slice(0, limit) : PROJECTS;

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
            نفتخر بكل مشروع أنجزناه. هذه نماذج مختارة من منتجات نفذناها لعملاء في مصر والخليج،
            بأرقام تتحدث عن نفسها.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
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

                  {p.featured && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow-lg">
                      مميّز
                    </div>
                  )}
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
                    <Link href={`/portfolio#${p.id}`} className="text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all">
                      <ArrowUpLeft className="h-5 w-5" />
                    </Link>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {p.desc}
                  </p>

                  {/* Client info */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {p.client}
                    </span>
                    <span>·</span>
                    <span>{p.year}</span>
                    <span>·</span>
                    <span>{p.duration}</span>
                  </div>

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

        {compact && (
          <div className="mt-12 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 hover:text-primary font-semibold text-sm transition-colors"
            >
              عرض كل الأعمال
              <ArrowUpLeft className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
