"use client";

import { motion } from "framer-motion";
import { ArrowUpLeft, Play, Sparkles, Code2, Smartphone, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section id="home" className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        {/* Aurora blobs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] aurora-anim" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[oklch(0.70_0.16_200/0.15)] rounded-full blur-[100px] aurora-anim" style={{ animationDelay: "-7s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[oklch(0.65_0.22_305/0.08)] rounded-full blur-[120px] aurora-anim" style={{ animationDelay: "-14s" }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Right column — content (RTL) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-right"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-xs sm:text-sm mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-muted-foreground">متاحون لمشاريع جديدة · ربع 2026</span>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1]">
              نبني البرمجيات
              <br />
              <span className="text-gradient-primary">التي تُحرّك أعمالك</span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-muted-foreground font-bold">بمعايير هندسية عالمية</span>
            </h1>

            {/* Sub */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mr-0 leading-relaxed">
              نكسوس ديف شركة هندسة برمجيات متخصصة في تطوير تطبيقات الويب والجوال،
              وتوفير قوالب أكواد جاهزة باك إند وفرونت إند بمستوى إنتاجي قابل للتوسّع فوراً.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2 shadow-xl shadow-primary/25 h-12 px-7 text-base"
              >
                <a href="#contact">
                  ابدأ مشروعك الآن
                  <ArrowUpLeft className="h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-semibold rounded-xl gap-2 h-12 px-7 text-base border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur"
              >
                <a href="#templates">
                  <Play className="h-4 w-4" />
                  شاهد القوالب الجاهزة
                </a>
              </Button>
            </div>

            {/* Trust line */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                <span>+8 سنوات خبرة</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-primary" />
                <span>+120 مشروع منجز</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-primary" />
                <span>+45 قالب جاهز</span>
              </div>
            </div>
          </motion.div>

          {/* Left column — code window (RTL: appears on left visually) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 z-20 glass-strong rounded-xl px-3 py-2 text-xs font-semibold flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Build Passed
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-3 -left-3 z-20 glass-strong rounded-xl px-3 py-2 text-xs font-semibold flex items-center gap-2"
            >
              <Server className="h-3.5 w-3.5 text-primary" />
              Deployed to Edge
            </motion.div>

            {/* Code window */}
            <div className="relative glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              {/* Window header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-black/30">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted-foreground font-mono">nexus.config.ts</span>
                </div>
              </div>

              {/* Code body */}
              <div dir="ltr" className="p-5 font-mono text-[13px] leading-relaxed bg-[oklch(0.06_0.01_250)] text-left overflow-x-auto">
                <pre className="text-muted-foreground">
<span className="text-pink-400">import</span> {"{ nexus }"} <span className="text-pink-400">from</span> <span className="text-emerald-300">"@nexus/core"</span>;{"\n"}
{"\n"}
<span className="text-pink-400">const</span> <span className="text-sky-300">config</span> = <span className="text-yellow-300">nexus</span>.{"\n"}
  <span className="text-violet-300">defineApp</span>({"{"}{"\n"}
    <span className="text-sky-300">stack</span>: [<span className="text-emerald-300">"Next.js"</span>, <span className="text-emerald-300">"React Native"</span>],{"\n"}
    <span className="text-sky-300">backend</span>: [<span className="text-emerald-300">"Node"</span>, <span className="text-emerald-300">"Prisma"</span>, <span className="text-emerald-300">"Redis"</span>],{"\n"}
    <span className="text-sky-300">scale</span>: <span className="text-emerald-300">"enterprise"</span>,{"\n"}
    <span className="text-sky-300">delivery</span>: <span className="text-emerald-300">"continuous"</span>,{"\n"}
    <span className="text-sky-300">quality</span>: <span className="text-emerald-300">"100/100"</span>,{"\n"}
  {"}"});{"\n"}
{"\n"}
<span className="text-pink-400">export default</span> <span className="text-sky-300">config</span>;<span className="cursor-blink text-primary">▋</span>
                </pre>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-t border-white/8 text-[11px] font-mono text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    main
                  </span>
                  <span>TypeScript</span>
                  <span>UTF-8</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>Ln 9, Col 22</span>
                  <span className="text-primary">● Live</span>
                </div>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute inset-0 -z-10 bg-primary/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Bottom marquee — tech logos */}
      <div className="mt-20 lg:mt-28 relative">
        <div className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-6 font-semibold">
          تقنيات نتقنها وننشر بها الإنتاج
        </div>
        <div className="overflow-hidden relative">
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="flex marquee-anim gap-12 w-max">
            {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
                <span className="text-lg font-bold font-mono">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TECH_MARQUEE = [
  "Next.js", "React", "TypeScript", "Node.js", "Prisma", "PostgreSQL",
  "React Native", "Expo", "TailwindCSS", "Docker", "Kubernetes", "AWS",
  "Vercel", "GraphQL", "Redis", "MongoDB", "tRPC", "Stripe",
];
