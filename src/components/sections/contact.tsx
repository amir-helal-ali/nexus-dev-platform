"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { COMPANY } from "@/lib/data/content";

interface ContactProps {
  /** إذا true، يعرض القسم بكامل تفاصيله. إذا false، يعرضه بشكل مختصر */
  full?: boolean;
}

export default function Contact({ full = false }: ContactProps) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setDone(true);
    toast.success("تم استلام رسالتك! سنردّ عليك خلال 24 ساعة.", {
      description: "فريق نكسوس ديف يقدّر ثقتك.",
    });
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setDone(false), 5000);
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/15 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Right column — info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-7"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-xs font-semibold text-primary mb-4">
                ابدأ مشروعك
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                لديك فكرة؟
                <br />
                <span className="text-gradient-primary">لنحوّلها إلى منتج.</span>
              </h2>
              <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
                سواء كنت في مرحلة الفكرة، أو لديك MVP يحتاج تطويراً، أو منتج قائم يحتاج إعادة بناء —
                فريقنا جاهز لمساعدتك. أرسل لنا رسالة وسنعود إليك خلال 24 ساعة.
              </p>
            </div>

            {/* Contact methods */}
            <div className="space-y-3">
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-4 p-4 glass rounded-xl hover:border-primary/30 transition-colors group">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">البريد الإلكتروني</div>
                  <div className="text-sm font-semibold">{COMPANY.email}</div>
                </div>
              </a>

              <a href={`tel:${COMPANY.phoneEG.replace(/\s/g, "")}`} className="flex items-center gap-4 p-4 glass rounded-xl hover:border-primary/30 transition-colors group" dir="ltr">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">هاتف · واتساب</div>
                  <div className="text-sm font-semibold">{COMPANY.phoneEG}</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 glass rounded-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">العنوان · ساعات العمل</div>
                  <div className="text-sm font-semibold">{COMPANY.addressShort}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{COMPANY.workingHours}</div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-sm text-muted-foreground">تابعنا:</span>
              {[
                { icon: MessageSquare, label: "WhatsApp", href: `https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}` },
                { icon: Mail, label: "Email", href: `mailto:${COMPANY.email}` },
                { icon: Phone, label: "Call", href: `tel:${COMPANY.phoneEG.replace(/\s/g, "")}` },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg glass hover:border-primary/30 hover:text-primary transition-colors"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Left column — form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass-strong rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">أخبرنا عن مشروعك</h3>
                <p className="text-sm text-muted-foreground">كل الحقول مطلوبة — لا نرسل spam.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-semibold">الاسم الكامل</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="محمد عبدالله"
                      className="bg-white/5 border-white/10 rounded-xl h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-semibold">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="bg-white/5 border-white/10 rounded-xl h-11"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-semibold">رقم الهاتف (مصري)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="0100 123 4567"
                      className="bg-white/5 border-white/10 rounded-xl h-11"
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="budget" className="text-xs font-semibold">الميزانية التقريبية (ج.م)</Label>
                    <select
                      id="budget"
                      name="budget"
                      className="w-full bg-white/5 border border-white/10 rounded-xl h-11 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      <option value="" className="bg-card">اختر النطاق</option>
                      <option value="lt60k" className="bg-card">أقل من 60,000</option>
                      <option value="60-150k" className="bg-card">60,000 - 150,000</option>
                      <option value="150-500k" className="bg-card">150,000 - 500,000</option>
                      <option value="gt500k" className="bg-card">أكثر من 500,000</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="service" className="text-xs font-semibold">نوع الخدمة المطلوبة</Label>
                  <select
                    id="service"
                    name="service"
                    className="w-full bg-white/5 border border-white/10 rounded-xl h-11 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="" className="bg-card">اختر الخدمة</option>
                    <option value="web" className="bg-card">تطوير ويب</option>
                    <option value="mobile" className="bg-card">تطبيق موبايل</option>
                    <option value="ecommerce" className="bg-card">متجر إلكتروني</option>
                    <option value="devops" className="bg-card">DevOps</option>
                    <option value="design" className="bg-card">تصميم UI/UX</option>
                    <option value="security" className="bg-card">تدقيق أمني</option>
                    <option value="template" className="bg-card">شراء قالب جاهز</option>
                    <option value="other" className="bg-card">أخرى</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs font-semibold">تفاصيل المشروع</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="اكتب وصفاً مختصراً عن فكرتك، أهدافك، والميزات المطلوبة..."
                    className="bg-white/5 border-white/10 rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting || done}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2 shadow-lg shadow-primary/25 disabled:opacity-70"
                >
                  {done ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      تم استلام طلبك
                    </>
                  ) : submitting ? (
                    <>
                      <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      جارٍ الإرسال...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      إرسال الطلب
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-center text-muted-foreground">
                  بالضغط على إرسال، توافق على{" "}
                  <a href="#" className="text-primary hover:underline">سياسة الخصوصية</a>
                  {" "}و{" "}
                  <a href="#" className="text-primary hover:underline">شروط الخدمة</a>.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
