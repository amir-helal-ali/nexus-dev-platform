"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Github, Twitter, Linkedin, MessageSquare, Mail, ArrowUp, MapPin, Phone } from "lucide-react";
import { COMPANY, NAV_LINKS, PAYMENT_METHODS } from "@/lib/data/content";

const FOOTER_EXTRA_LINKS = [
  {
    title: "الخدمات",
    links: [
      { label: "تطوير الويب", href: "/services" },
      { label: "تطبيقات الجوال", href: "/services" },
      { label: "التجارة الإلكترونية", href: "/services" },
      { label: "DevOps", href: "/services" },
    ],
  },
  {
    title: "القوالب",
    links: [
      { label: "Frontend", href: "/templates" },
      { label: "Backend", href: "/templates" },
      { label: "Full Stack", href: "/templates" },
      { label: "الباقات", href: "/pricing" },
    ],
  },
  {
    title: "الشركة",
    links: [
      { label: "من نحن", href: "/about" },
      { label: "أعمالنا", href: "/portfolio" },
      { label: "المدوّنة", href: "/blog" },
      { label: "تواصل معنا", href: "/contact" },
    ],
  },
  {
    title: "قانوني",
    links: [
      { label: "سياسة الخصوصية", href: "/privacy" },
      { label: "شروط الخدمة", href: "/terms" },
      { label: "سياسة الاسترجاع", href: "/refund" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="relative border-t border-white/8 bg-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Brand + Contact */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/90 to-primary/60 border border-primary/40">
                <Terminal className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-extrabold tracking-tight">NEXUS<span className="text-primary">DEV</span></span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-widest">{COMPANY.taglineEn}</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-sm">
              {COMPANY.description}
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 mb-5 text-sm">
              <div className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{COMPANY.address}</span>
              </div>
              <a href={`tel:${COMPANY.phoneEG.replace(/\s/g, "")}`} className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors" dir="ltr">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>{COMPANY.phoneEG}</span>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>{COMPANY.email}</span>
              </a>
            </div>

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
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {FOOTER_EXTRA_LINKS.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Payment methods */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">
              طرق الدفع المصرية
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {PAYMENT_METHODS.slice(0, 6).map((method) => (
                <div
                  key={method.name}
                  className="flex items-center gap-1.5 p-2 rounded-lg bg-white/5 border border-white/8 text-[11px] text-muted-foreground"
                  title={method.desc}
                >
                  <span className="text-sm">{method.icon}</span>
                  <span className="font-medium truncate">{method.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20 text-[11px] text-muted-foreground">
              <span className="text-primary font-semibold">فاتورة ضريبية رسمية</span> · سجل تجاري · رقم ضريبي: {COMPANY.taxNumber}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground text-center sm:text-right">
            © 2026 {COMPANY.name} · {COMPANY.nameAr} · جميع الحقوق محفوظة
            <span className="hidden sm:inline"> · صُمّم في القاهرة بشغف هندسي 🇪🇬</span>
          </div>

          <div className="flex items-center gap-2">
            {[
              { icon: Github, label: "GitHub", href: COMPANY.social.github },
              { icon: Twitter, label: "Twitter", href: COMPANY.social.twitter },
              { icon: Linkedin, label: "LinkedIn", href: COMPANY.social.linkedin },
              { icon: MessageSquare, label: "WhatsApp", href: `https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}` },
              { icon: Mail, label: "Email", href: `mailto:${COMPANY.email}` },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/8 hover:border-primary/30 hover:text-primary transition-colors"
              >
                <s.icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>

          <Link
            href="#top"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            للأعلى
            <ArrowUp className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
