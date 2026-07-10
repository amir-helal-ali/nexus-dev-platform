"use client";

import Link from "next/link";
import PageLayout from "@/components/site/page-layout";
import Stats from "@/components/sections/stats";
import Testimonials from "@/components/sections/testimonials";
import CTA from "@/components/sections/cta";
import { COMPANY, COMPANY_VALUES, TEAM } from "@/lib/data/content";
import { motion } from "framer-motion";
import { ArrowUpLeft, MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";

export default function AboutPage() {
  return (
    <PageLayout
      title="من نحن"
      subtitle="نكسوس ديف شركة هندسة برمجيات مصرية تأسست بمهمة واحدة: رفع مستوى البرمجيات في السوق المصري والإقليمي إلى المعايير العالمية."
      breadcrumb={[{ label: "من نحن" }]}
      background="subtle"
    >
      {/* Story section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-[oklch(0.70_0.16_200/0.15)] overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="absolute inset-8 glass-strong rounded-2xl p-8 flex flex-col justify-center gap-4">
                  <div className="text-6xl font-extrabold text-gradient-primary">8+</div>
                  <div className="text-sm text-muted-foreground">سنوات من الخبرة الهندسية في السوق المصري والإقليمي</div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-2xl font-extrabold">🇪🇬</div>
                      <div className="text-xs text-muted-foreground mt-1">مقرّنا في القاهرة</div>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold">+18</div>
                      <div className="text-xs text-muted-foreground mt-1">دولة نخدمها</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 glass-strong rounded-2xl px-5 py-3 text-sm font-semibold">
                🇪🇬 صُنع في مصر
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                قصتنا
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-2 mb-6">
                من القاهرة إلى <span className="text-gradient-primary">العالم</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  بدأت نكسوس ديف في عام 2018 بفريق صغير من 3 مهندسين مصريين شغوفين بالكود النظيف
                  والمعايير العالمية. كنا نؤمن أن السوق المصري يستحق برمجيات بجودة Silicon Valley،
                  لا حلول مُسعّرة بأرخص ثمن.
                </p>
                <p>
                  خلال 8 سنوات، نمَونا إلى فريق من 24 مهندساً ومصمّماً، نفّذنا أكثر من 120 مشروعاً
                  لعملاء في مصر، السعودية، الإمارات، والكويت. أعمالنا خدمت ملايين المستخدمين —
                  من تطبيقات بنكية إلى منصات تجارة إلكترونية وأنظمة صحية.
                </p>
                <p>
                  اليوم، نكسوس ديف ليست مجرد شركة تطوير — نحن شريك تقني يفهم تحديات السوق المصري،
                  ويعرف كيف يبني برمجيات تنمو مع أعمال عملائنا. نفتخر بكوننا مصريين، ونطمح
                  لتمثيل مصر في المشهد التقني الإقليمي والعالمي.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition-colors"
                >
                  شاهد أعمالنا
                  <ArrowUpLeft className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 text-sm font-semibold transition-colors"
                >
                  تواصل معنا
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Stats />

      {/* Values */}
      <section className="py-16 lg:py-20 border-y border-white/5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">قيمنا</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-2 mb-4">
              المبادئ التي <span className="text-gradient-primary">نبني عليها</span>
            </h2>
            <p className="text-muted-foreground">
              ليست مجرد كلمات على ورق — بل قواعد نطبّقها في كل قرار وكل سطر كود
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMPANY_VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-primary/30 transition-colors"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 mb-4">
                  <value.icon className={`h-6 w-6 ${value.color}`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">فريقنا</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-2 mb-4">
              قادة <span className="text-gradient-primary">الفريق</span>
            </h2>
            <p className="text-muted-foreground">
              مهندسون ومصمّمون شغوفون بخلق برمجيات تصنع الفرق
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center hover:border-primary/30 transition-colors"
              >
                <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${member.color} font-bold text-3xl mb-4`}>
                  {member.avatar}
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <div className="text-sm text-primary font-semibold mb-2">{member.role}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office / Contact info */}
      <section className="py-16 lg:py-20 border-y border-white/5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="glass-strong rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-bold">مقرّنا</span>
                <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-2 mb-4">
                  زورنا في <span className="text-gradient-primary">القاهرة</span>
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  مكتبنا في قلب القاهرة الجديدة — حيث يلتقي الإبداع بالهندسة. نرحّب بزيارتك
                  لمناقشة مشروعك وجهاً لوجه، أو نأتي إليك في أي مكان في القاهرة الكبرى.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">العنوان</div>
                      <div className="text-sm text-muted-foreground">{COMPANY.address}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">الهاتف</div>
                      <div className="text-sm text-muted-foreground" dir="ltr">{COMPANY.phoneEG}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">البريد</div>
                      <div className="text-sm text-muted-foreground">{COMPANY.email}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">ساعات العمل</div>
                      <div className="text-sm text-muted-foreground">{COMPANY.workingHours}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">سجل تجاري وضريبي</div>
                      <div className="text-sm text-muted-foreground">
                        سجل: {COMPANY.commercialRegister} · ضريبي: {COMPANY.taxNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-[oklch(0.70_0.16_200/0.1)] overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary mx-auto mb-3 float-anim" />
                    <div className="font-bold text-lg">القاهرة الجديدة</div>
                    <div className="text-sm text-muted-foreground">التجمع الخامس، شارع التسعين</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <CTA />
    </PageLayout>
  );
}
