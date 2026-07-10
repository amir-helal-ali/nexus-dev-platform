import PageLayout from "@/components/site/page-layout";
import Templates from "@/components/sections/templates";
import FAQ from "@/components/sections/faq";
import CTA from "@/components/sections/cta";

export const metadata = {
  title: "سوق القوالب الجاهزة | NEXUS DEV",
  description: "قوالب أكواد جاهزة للإنتاج: فرونت إند، باك إند، Full Stack — بطرق دفع مصرية وتوثيق احترافي.",
};

export default function TemplatesPage() {
  return (
    <PageLayout
      title="سوق القوالب الجاهزة"
      subtitle="مكتبة من القوالب الهندسية المختبرة، كُتبت بمعايير الإنتاج — نظيفة، موثّقة، قابلة للتوسّع. حمّل، ادمج، انشر في دقائق بدلاً من أسابيع. جميع القوالب تدعم طرق الدفع المصرية."
      breadcrumb={[{ label: "القوالب" }]}
    >
      <Templates />

      {/* Why our templates */}
      <section className="py-16 lg:py-20 border-y border-white/5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
              لماذا قوالبنا <span className="text-gradient-primary">مختلفة؟</span>
            </h2>
            <p className="text-muted-foreground">
              ليست مجرد ملفات كود — بل منتجات هندسية كاملة جاهزة للإنتاج
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "✓", title: "كود نظيف", desc: "TypeScript كامل, تعليقات, وأنماط code معتمدة عالمياً" },
              { icon: "📖", title: "توثيق شامل", desc: "README مفصّل, دليل تركيب, وأمثلة استخدام لكل ميزة" },
              { icon: "🔒", title: "ترخيص تجاري", desc: "استخدم في مشاريع عملائك بلا قيود — ترخيص مدى الحياة" },
              { icon: "🇪🇬", title: "مُكيّف لمصر", desc: "دعم PayMob, Fawry, فودافون كاش, COD, RTL كامل" },
              { icon: "⚡", title: "أداء عالٍ", desc: "Lighthouse 90+, Core Web Vitals ممتازة, تحسين SEO كامل" },
              { icon: "🧪", title: "مُختبَر", desc: "Unit tests + E2E tests — كل قالب يأتي بـ 80%+ coverage" },
              { icon: "🎨", title: "Design System", desc: "مكتبة مكونات قابلة للتخصيص, متغيرات ألوان وخطوط" },
              { icon: "🔄", title: "تحديثات مجانية", desc: "تحديثات مدى الحياة عند توفر نسخ جديدة من التقنيات" },
            ].map((item) => (
              <div key={item.title} className="glass rounded-2xl p-6 hover:border-primary/30 transition-colors">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ limit={4} />
      <CTA />
    </PageLayout>
  );
}
