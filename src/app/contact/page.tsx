import PageLayout from "@/components/site/page-layout";
import Contact from "@/components/sections/contact";
import FAQ from "@/components/sections/faq";
import { COMPANY, PAYMENT_METHODS } from "@/lib/data/content";
import { Mail, Phone, MapPin, MessageSquare, Clock, Building2 } from "lucide-react";

export const metadata = {
  title: "تواصل معنا | NEXUS DEV",
  description: "تواصل مع فريق نكسوس ديف — مكتب في القاهرة، دعم بالعربية، ردّ خلال 24 ساعة.",
};

export default function ContactPage() {
  return (
    <PageLayout
      title="تواصل معنا"
      subtitle="سواء كنت في مرحلة الفكرة، أو لديك MVP يحتاج تطويراً، أو منتج قائم يحتاج إعادة بناء — فريقنا جاهز لمساعدتك. أرسل لنا رسالة وسنعود إليك خلال 24 ساعة."
      breadcrumb={[{ label: "تواصل" }]}
      background="subtle"
    >
      {/* Quick contact cards */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Phone, label: "اتصل بنا", value: COMPANY.phoneEG, href: `tel:${COMPANY.phoneEG.replace(/\s/g, "")}`, ltr: true },
              { icon: MessageSquare, label: "واتساب", value: COMPANY.phoneEG, href: `https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}`, ltr: true },
              { icon: Mail, label: "بريد إلكتروني", value: COMPANY.email, href: `mailto:${COMPANY.email}`, ltr: true },
              { icon: Clock, label: "ساعات العمل", value: "السبت - الخميس · 9 ص - 6 م", ltr: false },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href || "#"}
                className="glass rounded-2xl p-5 hover:border-primary/30 transition-colors group"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-3 group-hover:scale-110 transition-transform">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <div className="text-sm font-semibold" dir={item.ltr ? "ltr" : "rtl"}>{item.value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form section */}
      <Contact full />

      {/* Address + payment info */}
      <section className="py-16 lg:py-20 border-y border-white/5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Address */}
            <div className="glass-strong rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">مقرّنا الرئيسي</h3>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {COMPANY.address}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  {COMPANY.workingHours}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4 text-primary" />
                  سجل تجاري: {COMPANY.commercialRegister} · رقم ضريبي: {COMPANY.taxNumber}
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div className="glass-strong rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-lg">💳</span>
                </div>
                <h3 className="text-xl font-bold">طرق الدفع المتاحة</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {PAYMENT_METHODS.map((method) => (
                  <div key={method.name} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/8">
                    <span className="text-lg">{method.icon}</span>
                    <span className="text-sm font-medium">{method.name}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                جميع المدفوعات تشمل فاتورة ضريبية رسمية معتمدة من مصلحة الضرائب المصرية.
                للمشاريع الكبيرة، نقسّم الدفع على 3 دفعات لراحتك.
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ limit={4} />
    </PageLayout>
  );
}
