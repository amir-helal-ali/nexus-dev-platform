"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar, Clock, ArrowUpLeft, ChevronLeft, Twitter, Facebook,
  Linkedin, MessageSquare, BookOpen,
} from "lucide-react";
import { BLOG_POSTS } from "@/lib/data/content";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Simple markdown-to-JSX renderer (basic)
function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let codeBlock: string[] | null = null;
  let codeLang = "";

  lines.forEach((line, i) => {
    // Code block start/end
    if (line.startsWith("```")) {
      if (codeBlock === null) {
        codeBlock = [];
        codeLang = line.slice(3).trim();
      } else {
        // Render code block
        elements.push(
          <div key={`code-${i}`} className="my-5 rounded-xl overflow-hidden border border-white/10" dir="ltr">
            <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/8">
              <span className="text-xs text-muted-foreground font-mono">{codeLang || "code"}</span>
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-400/70" />
                <div className="h-2 w-2 rounded-full bg-yellow-400/70" />
                <div className="h-2 w-2 rounded-full bg-green-400/70" />
              </div>
            </div>
            <pre className="p-4 bg-[oklch(0.06_0.01_250)] text-sm font-mono text-muted-foreground overflow-x-auto">
              <code>{codeBlock.join("\n")}</code>
            </pre>
          </div>
        );
        codeBlock = null;
      }
      return;
    }
    if (codeBlock !== null) {
      codeBlock.push(line);
      return;
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-bold mt-7 mb-3">{line.slice(4)}</h3>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold mt-9 mb-4 text-foreground">{line.slice(3)}</h2>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-3xl font-extrabold mt-9 mb-4">{line.slice(2)}</h1>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      // List item — render bold inside
      const text = line.slice(2);
      elements.push(
        <li key={i} className="flex items-start gap-2.5 text-muted-foreground leading-relaxed mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-2.5" />
          <span dangerouslySetInnerHTML={{ __html: parseInline(text) }} />
        </li>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, "");
      elements.push(
        <li key={i} className="text-muted-foreground leading-relaxed mb-2 mr-5 list-decimal" dangerouslySetInnerHTML={{ __html: parseInline(text) }} />
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-4" />);
    } else if (line.startsWith("|") && line.endsWith("|")) {
      // Table
      elements.push(
        <div key={i} className="my-4 overflow-x-auto">
          <table className="w-full text-sm border border-white/8 rounded-lg overflow-hidden">
            <tbody dangerouslySetInnerHTML={{ __html: parseTable(line) }} />
          </table>
        </div>
      );
    } else {
      elements.push(
        <p key={i} className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: parseInline(line) }} />
      );
    }
  });

  return elements;
}

function parseInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-foreground text-[0.85em] font-mono" dir="ltr">$1</code>')
    .replace(/❌/g, '<span class="text-red-400">❌</span>')
    .replace(/✅/g, '<span class="text-emerald-400">✅</span>')
    .replace(/💡/g, '<span>💡</span>');
}

function parseTable(line: string): string {
  const cells = line.split("|").filter((c) => c.trim());
  const isHeader = cells.some((c) => c.trim().startsWith("البند") || c.trim().startsWith("التكلفة"));
  return `<tr class="border-b border-white/8 ${isHeader ? "bg-white/5 font-bold" : ""}">${cells.map((c) => `<td class="px-4 py-2.5">${c.trim()}</td>`).join("")}</tr>`;
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <div className="relative min-h-screen flex flex-col bg-background pt-24">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
        >
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <ChevronLeft className="h-3.5 w-3.5" />
          <Link href="/blog" className="hover:text-primary transition-colors">المدوّنة</Link>
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="text-foreground line-clamp-1">{post.title}</span>
        </motion.nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-semibold">
              {post.categoryLabel}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime} دقائق قراءة
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Author + share */}
          <div className="flex items-center justify-between flex-wrap gap-4 py-4 border-y border-white/8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 border border-primary/20 font-bold text-primary">
                {post.author.charAt(post.author.length - 1)}
              </div>
              <div>
                <div className="font-semibold text-sm">{post.author}</div>
                <div className="text-xs text-muted-foreground">كاتب · نكسوس ديف</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">شارك:</span>
              {[Twitter, Facebook, Linkedin, MessageSquare].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg glass hover:border-primary/30 hover:text-primary transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className={`relative aspect-video rounded-3xl bg-gradient-to-br ${post.gradient} overflow-hidden mb-10`}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="absolute inset-8 glass-strong rounded-2xl p-6 flex flex-col gap-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            </div>
            <div className="flex-1 grid grid-cols-4 gap-2">
              <div className="col-span-1 space-y-1.5">
                <div className="h-2 bg-white/15 rounded" />
                <div className="h-2 bg-white/15 rounded w-3/4" />
                <div className="h-2 bg-white/15 rounded w-2/3" />
              </div>
              <div className="col-span-3 space-y-1.5">
                <div className="h-8 bg-primary/30 rounded" />
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="h-10 bg-white/10 rounded" />
                  <div className="h-10 bg-white/10 rounded" />
                  <div className="h-10 bg-white/10 rounded" />
                </div>
                <div className="h-2 bg-white/10 rounded w-2/3" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none mb-12"
        >
          <div className="text-base leading-relaxed">
            {renderMarkdown(post.content)}
          </div>
        </motion.article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs font-mono text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA box */}
        <div className="glass-strong rounded-2xl p-6 lg:p-8 mb-12 text-center">
          <BookOpen className="h-10 w-10 text-primary mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">هل أعجبك المقال؟</h3>
          <p className="text-muted-foreground mb-5">دعنا نساعدك في تطبيق هذه المعرفة في مشروعك القادم</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition-colors"
            >
              احصل على استشارة مجانية
            </Link>
            <Link
              href="/services"
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 text-sm font-semibold transition-colors"
            >
              تصفّح خدماتنا
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">مقالات ذات صلة</h2>
              <Link href="/blog" className="text-sm text-primary hover:underline flex items-center gap-1">
                كل المقالات
                <ArrowUpLeft className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1"
                >
                  <div className={`relative h-24 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                    <div className="absolute inset-3 glass-strong rounded-lg p-2">
                      <div className="flex gap-1 mb-1">
                        <div className="h-1 w-1 rounded-full bg-red-400/70" />
                        <div className="h-1 w-1 rounded-full bg-yellow-400/70" />
                        <div className="h-1 w-1 rounded-full bg-green-400/70" />
                      </div>
                      <div className="h-1.5 bg-white/15 rounded w-2/3" />
                      <div className="h-1.5 bg-white/15 rounded w-1/2 mt-1" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-muted-foreground mb-1">{formatDate(p.date)}</div>
                    <h3 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
