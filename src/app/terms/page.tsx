import PageLayout from "@/components/site/page-layout";
import { COMPANY } from "@/lib/data/content";

export const metadata = {
  title: "شروط الخدمة | NEXUS DEV",
  description: "شروط استخدام خدمات نكسوس ديف — المشاريع، القوالب، الاستشارات التقنية.",
};

export default function TermsPage() {
  return (
    <PageLayout
      title="شروط الخدمة"
      subtitle="آخر تحديث: يناير 2026 — ب استخدامك لخدماتنا، فإنك توافق على هذه الشروط."
      breadcrumb={[{ label: "شروط الخدمة" }]}
      background="subtle"
    >
      <section className="pb-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">

            <div className="glass rounded-2xl p-5 border-r-4 border-primary">
              <p className="text-sm text-foreground mb-1 font-semibold">📌 ملخّص سريع</p>
              <p className="text-sm">هذه الشروط تحكم العلاقة بينك وبين نكسوس ديف. باستخدامك خدماتنا، فإنك توافق على هذه الشروط بالكامل.</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">1. تعريف الخدمات</h2>
              <p className="mb-3">تشمل خدماتنا:</p>
              <ul className="list-disc list-inside space-y-1 mr-2">
                <li>تطوير تطبيقات الويب والموبايل</li>
                <li>بيع القوالب الجاهزة (Frontend, Backend, Full Stack)</li>
                <li>الاستشارات التقنية</li>
                <li>خدمات DevOps والبنية التحتية</li>
                <li>تصميم UI/UX</li>
                <li>تدقيق الأمان</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">2. المشاريع المخصّصة</h2>
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">2.1 نطاق العمل</h3>
              <p>يُحدّد نطاق كل مشروع في عقد منفصل يوقّعه الطرفان. أي طلبات خارج النطاق تُحسب كعمل إضافي بتكلفة منفصلة.</p>
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">2.2 المواعيد</h3>
              <p>نلتزم بالمواعيد المتفق عليها في العقد. التأخير من جانب العميل (مثل تأخير المراجعات) قد يؤدي لتأخير التسليم بنفس القدر.</p>
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">2.3 المدفوعات</h3>
              <p>للمشاريع الكبيرة، نقسّم الدفع على 3 دفعات:</p>
              <ul className="list-disc list-inside space-y-1 mr-2 mt-2">
                <li>30% دفعة أولى عند بدء المشروع</li>
                <li>40% عند منتصف المشروع</li>
                <li>30% عند التسليم النهائي</li>
              </ul>
              <p className="mt-3">للمشاريع الصغيرة، قد نطلب دفعة كاملة مقدماً.</p>
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">2.4 المراجعات</h3>
              <p>يشمل كل مشروع دورتي مراجعة مجانيتين. أي مراجعات إضافية تُحسب بسعر الساعة.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">3. القوالب الجاهزة</h2>
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">3.1 الترخيص</h3>
              <p>كل قالب يأتي بترخيص محدد (Personal, Commercial, Enterprise). راجع صفحة القالب لمعرفة تفاصيل الترخيص.</p>
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">3.2 المسموح</h3>
              <ul className="list-disc list-inside space-y-1 mr-2">
                <li>استخدام القالب في مشروع واحد</li>
                <li>تعديل وتخصيص الكود</li>
                <li>استخدامه في مشاريع عملائك (Commercial/Enterprise)</li>
              </ul>
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">3.3 غير المسموح</h3>
              <ul className="list-disc list-inside space-y-1 mr-2">
                <li>إعادة بيع القالب نفسه</li>
                <li>توزيعه مجاناً أو مدفوعاً</li>
                <li>استخدامه في أكثر من مشروع دون ترخيص إضافي</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">4. الملكية الفكرية</h2>
              <p className="mb-3">عند تسليم مشروع مخصّص:</p>
              <ul className="list-disc list-inside space-y-1 mr-2">
                <li>الكود المصدري يصبح ملكك بالكامل</li>
                <li>التصاميم تنتقل إليك</li>
                <li>نحتفظ بالحق في عرض المشروع في معرض أعمالنا (إلا إذا طلبت عدم ذلك)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">5. الدعم والصيانة</h2>
              <p className="mb-3">يشمل كل مشروع:</p>
              <ul className="list-disc list-inside space-y-1 mr-2">
                <li>دعم فني مجاني لمدة محددة (30-90 يوم حسب الباقة)</li>
                <li>إصلاح الأخطاء (Bugs) مجاناً خلال فترة الدعم</li>
                <li>التحديثات الأمنية الحرجة</li>
              </ul>
              <p className="mt-3">بعد انتهاء فترة الدعم، نوفّر عقود صيانة شهرية.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">6. الإلغاء والاسترجاع</h2>
              <p className="mb-3">راجع <a href="/refund" className="text-primary hover:underline">سياسة الاسترجاع</a> التفصيلية. بإيجاز:</p>
              <ul className="list-disc list-inside space-y-1 mr-2">
                <li>القوالب: استرجاع خلال 14 يوم إذا لم تُنزّل</li>
                <li>المشاريع: استرجاع الدفعة الأولى خلال 7 أيام من البدء</li>
                <li>الخدمات الاستشارية: غير قابلة للاسترجاع بعد تقديمها</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">7. السرية</h2>
              <p>نلتزم بالحفاظ على سرية معلوماتك. نوقّع NDA (اتفاقية عدم إفصاح) قبل بدء أي مشروع عند الطلب.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">8. حدود المسؤولية</h2>
              <p>مسؤوليتنا محدودة بقيمة الخدمات المؤداة. لسنا مسؤولين عن:</p>
              <ul className="list-disc list-inside space-y-1 mr-2 mt-2">
                <li>الأضرار غير المباشرة</li>
                <li>فقدان الأرباح أو البيانات</li>
                <li>أعطال الخوادم الخارجية (AWS, Vercel)</li>
                <li>تعديلات العميل على الكود بعد التسليم</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">9. القانون الحاكم</h2>
              <p>تخضع هذه الشروط للقوانين المصرية. أي نزاع يُحلّ في محاكم القاهرة، مصر.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">10. التواصل</h2>
              <div className="glass rounded-xl p-5">
                <div className="space-y-1 text-sm">
                  <div><strong className="text-foreground">الشركة:</strong> {COMPANY.name} · {COMPANY.nameAr}</div>
                  <div><strong className="text-foreground">السجل التجاري:</strong> {COMPANY.commercialRegister}</div>
                  <div><strong className="text-foreground">الرقم الضريبي:</strong> {COMPANY.taxNumber}</div>
                  <div><strong className="text-foreground">البريد:</strong> <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a></div>
                  <div><strong className="text-foreground">الهاتف:</strong> <span dir="ltr">{COMPANY.phoneEG}</span></div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </section>
    </PageLayout>
  );
}
