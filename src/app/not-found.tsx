"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowUpLeft, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] aurora-anim" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[oklch(0.70_0.16_200/0.15)] rounded-full blur-[100px] aurora-anim" style={{ animationDelay: "-7s" }} />
      </div>

      <div className="relative container mx-auto max-w-2xl px-4 sm:px-6 text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block mb-8"
        >
          <div className="text-[10rem] sm:text-[14rem] font-extrabold leading-none text-gradient-primary">
            404
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 glass-strong rounded-xl px-3 py-2 text-xs font-semibold flex items-center gap-2"
          >
            <Code2 className="h-4 w-4 text-primary" />
            خطأ في المسار
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            عذراً، الصفحة غير موجودة
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
            يبدو أنك وصلت لصفحة محذوفة أو رابط خاطئ. لا تقلق — دعنا نعيدك للمسار الصحيح.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2 shadow-lg shadow-primary/25 h-12 px-6"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                العودة للرئيسية
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-semibold rounded-xl gap-2 h-12 px-6 border-white/15 bg-white/5 hover:bg-white/10"
            >
              <Link href="/templates">
                <Search className="h-4 w-4" />
                تصفّح القوالب
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-semibold rounded-xl gap-2 h-12 px-6 border-white/15 bg-white/5 hover:bg-white/10"
            >
              <Link href="/contact">
                <ArrowUpLeft className="h-4 w-4" />
                تواصل معنا
              </Link>
            </Button>
          </div>

          {/* Quick links */}
          <div className="mt-12 pt-8 border-t border-white/8">
            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest font-semibold">روابط سريعة</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: "الخدمات", href: "/services" },
                { label: "القوالب", href: "/templates" },
                { label: "أعمالنا", href: "/portfolio" },
                { label: "الباقات", href: "/pricing" },
                { label: "من نحن", href: "/about" },
                { label: "المدوّنة", href: "/blog" },
                { label: "تواصل معنا", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg glass hover:border-primary/30 hover:text-primary text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
