"use client";

import { Terminal, Github, Twitter, Linkedin, MessageSquare, Mail, ArrowUp } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "الخدمات",
    links: [
      { label: "تطوير الويب", href: "#services" },
      { label: "تطبيقات الجوال", href: "#services" },
      { label: "البنية التحتية", href: "#services" },
      { label: "تصميم UI/UX", href: "#services" },
    ],
  },
  {
    title: "القوالب",
    links: [
      { label: "Frontend", href: "#templates" },
      { label: "Backend", href: "#templates" },
      { label: "Full Stack", href: "#templates" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "الشركة",
    links: [
      { label: "من نحن", href: "#home" },
      { label: "أعمالنا", href: "#portfolio" },
      { label: "المنهجية", href: "#process" },
      { label: "تواصل معنا", href: "#contact" },
    ],
  },
  {
    title: "الدعم",
    links: [
      { label: "الأسئلة الشائعة", href: "#faq" },
      { label: "التوثيق", href: "#" },
      { label: "المدونة", href: "#" },
      { label: "الحالة", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="#home" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/90 to-primary/60 border border-primary/40">
                <Terminal className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-extrabold tracking-tight">NEXUS<span className="text-primary">DEV</span></span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-widest">SOFTWARE ENGINEERING</span>
              </div>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-sm">
              شركة هندسة برمجيات متخصصة في تطوير تطبيقات الويب والجوال، وتوفير قوالب أكواد
              جاهزة بمعايير الإنتاج العالمية. نبني البرمجيات التي تُحرّك أعمالك.
            </p>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="بريدك للحصول على تحديثاتنا"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/60"
              />
              <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-colors">
                اشترك
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">
            © 2026 NEXUS DEV. جميع الحقوق محفوظة · صُمّم بشغف هندسي.
          </div>

          <div className="flex items-center gap-2">
            {[
              { icon: Github, label: "GitHub" },
              { icon: Twitter, label: "Twitter" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: MessageSquare, label: "Discord" },
              { icon: Mail, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/8 hover:border-primary/30 hover:text-primary transition-colors"
              >
                <s.icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>

          <a
            href="#home"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            للأعلى
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
