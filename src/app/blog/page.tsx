"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpLeft, Search, ChevronLeft } from "lucide-react";
import { BLOG_POSTS, type BlogPost } from "@/lib/data/content";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { key: "all", label: "كل المقالات" },
  { key: "trends", label: "اتجاهات" },
  { key: "tutorials", label: "شروحات" },
  { key: "mobile", label: "تطبيقات" },
  { key: "business", label: "أعمال" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const featured = BLOG_POSTS.find((p) => p.featured);

  let posts = filter === "all" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === filter);
  if (search) {
    posts = posts.filter(
      (p) =>
        p.title.includes(search) ||
        p.excerpt.includes(search) ||
        p.tags.some((t) => t.includes(search))
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-background pt-24">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
        >
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="text-foreground">المدوّنة</span>
        </motion.nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-xs font-semibold text-primary mb-4">
            مدوّنة نكسوس ديف
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            رؤى تقنية للسوق
            <span className="text-gradient-primary"> المصري</span>
          </h1>
          <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            مقالات تقنية ودراسات حالة ودلائل عملية — كل ما تحتاج معرفته لبناء برمجيات ناجحة في مصر.
          </p>
        </motion.div>

        {/* Featured post */}
        {featured && filter === "all" && !search && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="relative glass rounded-3xl overflow-hidden hover:border-primary/40 transition-all hover:-translate-y-1">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className={`relative aspect-video lg:aspect-auto bg-gradient-to-br ${featured.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow-lg">
                      مقال مميّز
                    </div>
                    <div className="absolute inset-8 glass-strong rounded-2xl p-6 flex flex-col justify-end">
                      <div className="flex gap-1.5 mb-3">
                        <div className="h-2 w-2 rounded-full bg-red-400/70" />
                        <div className="h-2 w-2 rounded-full bg-yellow-400/70" />
                        <div className="h-2 w-2 rounded-full bg-green-400/70" />
                      </div>
                      <div className="h-3 bg-white/15 rounded w-1/3 mb-2" />
                      <div className="h-2 bg-white/10 rounded w-2/3" />
                    </div>
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-semibold">
                        {featured.categoryLabel}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(featured.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {featured.readingTime} دقائق
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-3 group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed mb-5">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                      اقرأ المقال
                      <ArrowUpLeft className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث في المقالات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/60"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors",
                  filter === cat.key
                    ? "bg-primary text-primary-foreground"
                    : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1 h-full flex flex-col">
                  <div className={`relative h-40 bg-gradient-to-br ${post.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full glass-strong text-[10px] font-semibold">
                      {post.categoryLabel}
                    </div>
                    <div className="absolute inset-4 glass-strong rounded-lg p-3 flex flex-col gap-1.5">
                      <div className="flex gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400/70" />
                      </div>
                      <div className="flex-1 grid grid-cols-3 gap-1">
                        <div className="bg-white/10 rounded" />
                        <div className="col-span-2 space-y-1">
                          <div className="h-1.5 bg-white/15 rounded w-full" />
                          <div className="h-1.5 bg-white/15 rounded w-2/3" />
                          <div className="h-1.5 bg-primary/30 rounded w-1/3 mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                      <span>·</span>
                      <Clock className="h-3 w-3" />
                      {post.readingTime} دقائق
                    </div>
                    <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/8">
                      <span className="text-xs text-muted-foreground">{post.author}</span>
                      <span className="text-xs font-semibold text-primary group-hover:gap-1.5 flex items-center gap-1 transition-all">
                        اقرأ
                        <ArrowUpLeft className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-muted-foreground">لا توجد مقالات تطابق بحثك</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="glass-strong rounded-3xl p-8 lg:p-10 text-center">
          <h3 className="text-2xl font-bold mb-2">اشترك في نشرتنا البريدية</h3>
          <p className="text-muted-foreground mb-5">احصل على أحدث المقالات والنصائح التقنية مباشرة في بريدك</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition-colors">
              اشترك
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-3">بدون spam · إلغاء الاشتراك في أي وقت</p>
        </div>
      </div>
    </div>
  );
}
