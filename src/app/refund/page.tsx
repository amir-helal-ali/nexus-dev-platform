import PageLayout from "@/components/site/page-layout";
import { COMPANY } from "@/lib/data/content";

export const metadata = {
  title: "سياسة الاسترجاع | NEXUS DEV",
  description: "سياسة استرجاع الأموال لقوالب ومشاريع نكسوس ديف.",
};

export default function RefundPage() {
  return (
    <PageLayout
      title="سياسة الاسترجاع"
      subtitle="نريدك أن تكون مطمئناً. إليك سياسة الاسترجاع والاسترداد لدينا."
      breadcrumb={[{ label: "سياسة الاسترجاع" }]}
      background="subtle"
    >
      <section className="pb-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">

            <div className="glass rounded-2xl p-5 border-r-4 border-emerald-500">
              <p className="text-sm text-foreground mb-1 font-semibold">✅ ضمان رضا 100%</p>
              <p className="text-sm">نحن واثقون من جودة خدماتنا. إذا لم تكن راضياً، سنصلح المشكلة أو نستردّ أموالك وفق السياسة التالية.</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">1. القوالب الجاهزة</h2>
              <div className="space-y-4">
                <div className="glass rounded-xl p-4">
                  <h3 className="font-semibold text-foreground mb-2">✅ قابلة للاسترجاع</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm mr-2">
                    <li>خلال 14 يوم من الشراء</li>
                    <li>إذا لم يتم تحميل القالب</li>
                    <li>إذا كان القالب معطوباً ولا يعمل</li>
                    <li>إذا لم يتطابق الوصف مع المحتوى</li>
                  </ul>
                </div>
                <div className="glass rounded-xl p-4">
                  <h3 className="font-semibold text-foreground mb-2">❌ غير قابلة للاسترجاع</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm mr-2">
                    <li>بعد تحميل الكود المصدري</li>
                    <li>بعد 14 يوم من الشراء</li>
                    <li>إذا تم تعديل القالب من قبلك</li>
                    <li>للقالب الذي تم استخدامه في مشروع منشور</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">2. المشاريع المخصّصة</h2>
              <div className="space-y-4">
                <div className="glass rounded-xl p-4">
                  <h3 className="font-semibold text-foreground mb-2">✅ قابلة للاسترجاع</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm mr-2">
                    <li>الدفعة الأولى خلال 7 أيام من بدء المشروع</li>
                    <li>إذا لم نبدأ العمل الفعلي</li>
                    <li>إذا ألغيت لأسباب تتعلق بنا</li>
                  </ul>
                </div>
                <div className="glass rounded-xl p-4">
                  <h3 className="font-semibold text-foreground mb-2">❌ غير قابلة للاسترجاع</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm mr-2">
                    <li>بعد بدء العمل الفعلي في المشروع</li>
                    <li>الدفعة الثانية والثالثة بعد المرحلة المقابلة</li>
                    <li>إذا ألغيت بسبب تغيير رأيك</li>
                    <li>بعد تسليم الكود المصدري</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">3. الخدمات الاستشارية</h2>
              <p>الخدمات الاستشارية غير قابلة للاسترجاع بعد تقديمها. إذا ألغيت قبل الموعد بـ 24 ساعة على الأقل، نسترجع 50% من المبلغ.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">4. كيفية طلب الاسترجاع</h2>
              <ol className="list-decimal list-inside space-y-2 mr-2">
                <li>راسلنا على <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a></li>
                <li>اذكر رقم الطلب وسبب الاسترجاع</li>
                <li>سنردّ خلال 3-5 أيام عمل</li>
                <li>إذا تمت الموافقة، نسترجع المبلغ خلال 10 أيام</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">5. طرق الاسترجاع</h2>
              <p>نسترجع المبلغ بنفس طريقة الدفع:</p>
              <ul className="list-disc list-inside space-y-1 mr-2 mt-2">
                <li>فودافون كاش → خلال 24 ساعة</li>
                <li>إنستاباي → خلال 24 ساعة</li>
                <li>تحويل بنكي → 3-5 أيام عمل</li>
                <li>بطاقة ائتمانية → 7-14 يوم</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">6. حالات خاصة</h2>
              <p>في الحالات التالية، نقدّر تقييماً فردياً:</p>
              <ul className="list-disc list-inside space-y-1 mr-2">
                <li>الظروف القاهرة (مرض، وفاة)</li>
                <li>أعطال تقنية كبيرة من جانبنا</li>
                <li>الإلغاء من جانبنا</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">7. التواصل</h2>
              <div className="glass rounded-xl p-5">
                <p className="mb-3 text-sm">لأي استفسار حول الاسترجاع:</p>
                <div className="space-y-1 text-sm">
                  <div><strong className="text-foreground">البريد:</strong> <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a></div>
                  <div><strong className="text-foreground">الهاتف:</strong> <span dir="ltr">{COMPANY.phoneEG}</span></div>
                  <div><strong className="text-foreground">ساعات العمل:</strong> {COMPANY.workingHours}</div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </section>
    </PageLayout>
  );
}
