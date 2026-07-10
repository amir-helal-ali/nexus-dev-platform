"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";

interface PageLayoutProps {
  children: React.ReactNode;
  /** عنوان الصفحة */
  title?: string;
  /** وصف الصفحة تحت العنوان */
  subtitle?: string;
  /** مسار التصفّح (Breadcrumb) */
  breadcrumb?: { label: string; href?: string }[];
  /** خلفية مخصّصة */
  background?: "default" | "subtle";
}

export default function PageLayout({
  children,
  title,
  subtitle,
  breadcrumb,
  background = "default",
}: PageLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      {/* Page-level decorative background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[oklch(0.70_0.16_200/0.05)] rounded-full blur-[120px]" />
        {background === "subtle" && (
          <div className="absolute inset-0 bg-dot-pattern opacity-20" />
        )}
      </div>

      <Navbar />

      <main className="flex-1">
        {/* Page header */}
        {(title || breadcrumb) && (
          <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
              {/* Breadcrumb */}
              {breadcrumb && (
                <motion.nav
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
                >
                  <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Home className="h-3.5 w-3.5" />
                    الرئيسية
                  </Link>
                  {breadcrumb.map((item, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <ChevronLeft className="h-3.5 w-3.5" />
                      {item.href ? (
                        <Link href={item.href} className="hover:text-primary transition-colors">
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-foreground">{item.label}</span>
                      )}
                    </span>
                  ))}
                </motion.nav>
              )}

              {/* Title */}
              {title && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="max-w-3xl"
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
                      {subtitle}
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* Page content */}
        {children}
      </main>

      <Footer />
    </div>
  );
}
