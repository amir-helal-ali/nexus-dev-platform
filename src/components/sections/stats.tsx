"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, FolderGit2, Code2, Award } from "lucide-react";

const STATS = [
  { icon: Users, value: 87, suffix: "+", label: "عميل حول العالم", color: "text-emerald-400" },
  { icon: FolderGit2, value: 124, suffix: "", label: "مشروع منجز بنجاح", color: "text-sky-400" },
  { icon: Code2, value: 45, suffix: "+", label: "قالب جاهز للبيع", color: "text-violet-400" },
  { icon: Award, value: 99, suffix: "%", label: "نسبة رضا العملاء", color: "text-amber-400" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString() + suffix);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Stats() {
  return (
    <section className="relative py-16 lg:py-20 border-y border-white/5">
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              <div className="relative glass rounded-2xl p-6 lg:p-8 text-center hover:border-primary/30 transition-colors h-full">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/5 border border-white/10 mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm lg:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
