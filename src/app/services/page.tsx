import PageLayout from "@/components/site/page-layout";
import Services from "@/components/sections/services";
import Process from "@/components/sections/process";
import TechStack from "@/components/sections/tech-stack";
import CTA from "@/components/sections/cta";
import { SERVICES } from "@/lib/data/content";

export const metadata = {
  title: "خدماتنا الهندسية | NEXUS DEV",
  description: "تطوير ويب وموبايل، تجارة إلكترونية، DevOps، تصميم UI/UX، وأمان — بمعايير عالمية ومُكيّفة للسوق المصري.",
};

export default function ServicesPage() {
  return (
    <PageLayout
      title="خدماتنا الهندسية"
      subtitle="منظومة خدمات متكاملة تغطّي دورة حياة المنتج بالكامل — من التصميم والتطوير إلى النشر والصيانة. كل خدمة مُكيّفة للسوق المصري بطرق دفع محلية ودعم فني بالعربية."
      breadcrumb={[{ label: "الخدمات" }]}
      background="subtle"
    >
      {/* Detailed services list */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="space-y-16 lg:space-y-24">
            {SERVICES.map((service, i) => (
              <div
                key={service.slug}
                id={service.slug}
                className={`scroll-mt-32 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  i % 2 === 1 ? "lg:[direction:ltr]" : ""
                }`}
              >
                {/* Content */}
                <div className="[direction:rtl]">
                  <div className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br ${service.color} border border-white/10 mb-6`}>
                    <service.icon className={`h-8 w-8 ${service.accent}`} strokeWidth={1.8} />
                  </div>

                  <span className="text-xs uppercase tracking-widest text-primary font-bold">
                    خدمة {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-2 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Features grid */}
                  <div className="space-y-4 mb-8">
                    {service.features.map((feat) => (
                      <div key={feat.title} className="flex gap-3">
                        <div className={`shrink-0 h-1.5 w-1.5 rounded-full ${service.accent.replace("text-", "bg-")} mt-2.5`} />
                        <div>
                          <div className="font-semibold text-sm">{feat.title}</div>
                          <div className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables + price */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.deliverables.map((d) => (
                      <span
                        key={d}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/8 text-xs font-medium text-muted-foreground"
                      >
                        ✓ {d}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/8">
                    <div>
                      <span className="text-xs text-muted-foreground">يبدأ من</span>
                      <div className="text-2xl font-extrabold">
                        {new Intl.NumberFormat("ar-EG").format(service.priceFrom)} <span className="text-sm font-normal text-muted-foreground">ج.م</span>
                      </div>
                    </div>
                    <a
                      href="/contact"
                      className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition-colors"
                    >
                      اطلب الخدمة
                    </a>
                  </div>
                </div>

                {/* Visual */}
                <div className="[direction:rtl]">
                  <div className={`relative aspect-[4/3] rounded-3xl bg-gradient-to-br ${service.color} overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                    {/* Mock UI */}
                    <div className="absolute inset-6 glass-strong rounded-2xl p-5 flex flex-col gap-3">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="h-3 bg-white/15 rounded" />
                          <div className="h-3 bg-white/15 rounded w-3/4" />
                          <div className="h-3 bg-white/15 rounded w-2/3" />
                          <div className="h-8 bg-primary/30 rounded mt-2" />
                          <div className="h-3 bg-white/15 rounded" />
                          <div className="h-3 bg-white/15 rounded w-1/2" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-12 bg-primary/20 rounded-xl" />
                          <div className="grid grid-cols-2 gap-2">
                            <div className="h-8 bg-white/10 rounded" />
                            <div className="h-8 bg-white/10 rounded" />
                          </div>
                          <div className="h-3 bg-white/15 rounded" />
                          <div className="h-3 bg-white/15 rounded w-3/4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <TechStack />
      <CTA />
    </PageLayout>
  );
}
