"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/data/content";

export default function Process() {
  return (
    <section id="process" className="relative py-20 lg:py-28 border-y border-white/5">
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-xs font-semibold text-primary mb-4">
            منهجية العمل
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            خمس مراحل من الفكرة
            <span className="text-gradient-primary"> إلى النمو</span>
          </h2>
          <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
            عملية شفافة، متكررة، وقابلة للقياس. تعرف في كل لحظة أين مشروعك، وما الخطوة التالية،
            ومتى تتوقع النتائج — دون مفاجآت.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-1/2 right-0 left-0 h-px bg-gradient-to-l from-transparent via-white/15 to-transparent -translate-y-1/2" />

          <div className="grid lg:grid-cols-5 gap-6 lg:gap-3">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="glass rounded-2xl p-6 hover:border-primary/30 transition-all hover:-translate-y-1 h-full">
                  {/* Number badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-3xl font-extrabold text-white/5 group-hover:text-primary/30 transition-colors">
                      {step.n}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {step.desc}
                  </p>

                  <ul className="space-y-1.5 pt-4 border-t border-white/8">
                    {step.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
