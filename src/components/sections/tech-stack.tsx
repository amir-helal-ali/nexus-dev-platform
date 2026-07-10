"use client";

import { motion } from "framer-motion";
import { TECH_GROUPS, TECH_EXTRAS } from "@/lib/data/content";

export default function TechStack() {
  return (
    <section id="tech" className="relative py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-xs font-semibold text-primary mb-4">
            حزمة التقنيات
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            نعمل بأحدث التقنيات
            <span className="text-gradient-primary"> وأكثرها موثوقية</span>
          </h2>
          <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
            نختار تقنياتنا بعناية — توازن بين النضج، الأداء، المجتمع، والمستقبل.
            كل ما نبنيه قابل للصيانة والتوسّع لأعلى أحمال الإنتاج.
          </p>
        </motion.div>

        {/* Tech grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECH_GROUPS.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group glass rounded-2xl p-6 hover:border-primary/30 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                  <group.icon className={`h-5 w-5 ${group.color}`} />
                </div>
                <h3 className="text-lg font-bold">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/8 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extras */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {TECH_EXTRAS.map((extra) => (
            <div
              key={extra.label}
              className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <extra.icon className="h-4 w-4 text-primary" />
              {extra.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
