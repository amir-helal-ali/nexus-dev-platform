import PageLayout from "@/components/site/page-layout";
import { COMPANY } from "@/lib/data/content";

export const metadata = {
  title: "سياسة الخصوصية | NEXUS DEV",
  description: "سياسة الخصوصية لنكسوس ديف — كيف نجمع ونستخدم ونحمي بياناتك وفق قانون 151 لسنة 2020 المصري.",
};

export default function PrivacyPage() {
  return (
    <PageLayout
      title="سياسة الخصوصية"
      subtitle="آخر تحديث: يناير 2026 — نلتزم بحماية بياناتك وفق قانون حماية البيانات الشخصية المصري (قانون 151 لسنة 2020)."
      breadcrumb={[{ label: "سياسة الخصوصية" }]}
      background="subtle"
    >
      <section className="pb-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">

            <div className="glass rounded-2xl p-5 border-r-4 border-primary">
              <p className="text-sm text-foreground mb-1 font-semibold">📌 ملخّص سريع</p>
              <p className="text-sm">نلتزم بقانون حماية البيانات الشخصية المصري (151/2020). نجمع أقل بيانات ممكنة، نستخدمها فقط لتقديم خدماتنا، ولا نشاركها مع أي طرف ثالث دون موافقتك.</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">1. البيانات التي نجمعها</h2>
              <p className="mb-3">نجمع نوعين من البيانات:</p>
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">1.1 بيانات تقدّمها بنفسك</h3>
              <p>عند ملء نموذج التواصل أو طلب خدمة، نجمع:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 mr-2">
                <li>الاسم الكامل</li>
                <li>البريد الإلكتروني</li>
                <li>رقم الهاتف (مصري)</li>
                <li>اسم الشركة (اختياري)</li>
                <li>تفاصيل المشروع أو الطلب</li>
                <li>الميزانية التقريبية</li>
              </ul>
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">1.2 بيانات تقنية تلقائية</h3>
              <p>عند زيارة موقعنا، قد نجمع تلقائياً:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 mr-2">
                <li>عنوان IP والموقع الجغرافي التقريبي</li>
                <li>نوع المتصفح والجهاز</li>
                <li>الصفحات التي زرتها ومدة الزيارة</li>
                <li>مصدر الزيارة (Google، إعلانات، إلخ)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">2. كيف نستخدم بياناتك</h2>
              <p className="mb-3">نستخدم بياناتك للأغراض التالية فقط:</p>
              <ul className="list-disc list-inside space-y-1 mr-2">
                <li>الردّ على استفساراتك وطلباتك</li>
                <li>تقديم الخدمات التي طلبتها</li>
                <li>إرسال تحديثات حول مشروعك</li>
                <li>تحسين خدماتنا وموقعنا</li>
                <li>إرسال مواد تسويقية (فقط إذا اشتركت في النشرة)</li>
                <li>الامتثال للالتزامات القانونية</li>
              </ul>
              <div className="glass rounded-xl p-4 mt-4 text-sm">
                <strong className="text-foreground">❌ ما لا نفعله:</strong> لا نبيع بياناتك، لا نشاركها مع معلنين، ولا نستخدمها لأغراض غير مصرّح بها.
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">3. الأساس القانوني للمعالجة</h2>
              <p className="mb-3">وفق قانون 151/2020، نعالج بياناتك بناءً على:</p>
              <ul className="list-disc list-inside space-y-1 mr-2">
                <li><strong className="text-foreground">موافقتك الصريحة</strong> عند ملء النماذج</li>
                <li><strong className="text-foreground">ضرورة تنفيذ العقد</strong> عند طلب خدمة</li>
                <li><strong className="text-foreground">الالتزامات القانونية</strong> (الفوترة الضريبية)</li>
                <li><strong className="text-foreground">مصالحنا المشروعة</strong> (تحسين الخدمات)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">4. حقوقك</h2>
              <p className="mb-3">لك الحقوق التالية وفق القانون المصري:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: "حق الوصول", desc: "طلب نسخة من بياناتك المخزّنة" },
                  { title: "حق التصحيح", desc: "تعديل أي بيانات غير صحيحة" },
                  { title: "حق الحذف", desc: "طلب حذف بياناتك من أنظمتنا" },
                  { title: "حق الاعتراض", desc: "الاعتراض على استخدام بياناتك" },
                  { title: "حق تقييد المعالجة", desc: "طلب تقييد كيفية استخدام بياناتك" },
                  { title: "حق نقل البيانات", desc: "استلام بياناتك بصيغة قابلة للنقل" },
                  { title: "حق سحب الموافقة", desc: "سحب موافقتك في أي وقت" },
                  { title: "حق الشكوى", desc: "التقدم بشكوى للجهة المختصة" },
                ].map((r) => (
                  <div key={r.title} className="glass rounded-xl p-4">
                    <div className="font-semibold text-sm text-foreground mb-1">{r.title}</div>
                    <div className="text-xs">{r.desc}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm">
                لممارسة أي من هذه الحقوق، راسلنا على <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a> وسنردّ خلال 30 يوم عمل.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">5. حماية البيانات</h2>
              <p className="mb-3">نتّخذ إجراءات تقنية وتنظيمية لحماية بياناتك:</p>
              <ul className="list-disc list-inside space-y-1 mr-2">
                <li>تشفير البيانات الحساسة (AES-256)</li>
                <li>اتصالات HTTPS/TLS 1.3</li>
                <li>جدران حماية وأنظمة كشف الاختراق</li>
                <li>نسخ احتياطية مشفّرة دورية</li>
                <li>تدريب الموظفين على أمان البيانات</li>
                <li>تدقيق أمني دوري (OWASP Top 10)</li>
                <li>الوصول المحدود (Need-to-know basis)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">6. مشاركة البيانات</h2>
              <p className="mb-3">لا نشارك بياناتك إلا في الحالات التالية:</p>
              <ul className="list-disc list-inside space-y-1 mr-2">
                <li>مع مزوّدي خدمات موثوقين (PayMob, Vercel) لتقديم خدماتنا</li>
                <li>عند طلبك الصريح</li>
                <li>للالتزام بالالتزامات القانونية أو طلبات الجهات الرسمية</li>
                <li>في حالة الاندماج أو الاستحواذ (مع إشعارك مسبقاً)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">7. ملفات تعريف الارتباط (Cookies)</h2>
              <p className="mb-3">نستخدم cookies أساسية لعمل الموقع وcookies تحليلية لتحسينه. يمكنك تعطيلها من إعدادات متصفحك.</p>
              <ul className="list-disc list-inside space-y-1 mr-2">
                <li><strong className="text-foreground">ضرورية:</strong> لعمل الموقع بشكل صحيح</li>
                <li><strong className="text-foreground">تحليلية:</strong> لفهم كيفية استخدام الموقع</li>
                <li><strong className="text-foreground">وظيفية:</strong> لتذكّر تفضيلاتك</li>
              </ul>
              <p className="mt-3 text-sm">لا نستخدم cookies إعلانية.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">8. الاحتفاظ بالبيانات</h2>
              <p>نحتفظ ببياناتك طالما كانت ضرورية للأغراض الموضّحة في هذه السياسة، أو حسب ما يتطلبه القانون. بعد ذلك، نحذفها بأمان أو نُفرّغها بشكل غير قابل للاسترجاع.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">9. نقل البيانات خارج مصر</h2>
              <p>قد ننقل بياناتك لخوادم خارج مصر (مثل AWS, Vercel) لأغراض تقنية. نضمن أن هذا النقل يتمّ وفق ضمانات مناسبة وحماية كافية وفق قانون 151/2020.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">10. خصوصية الأطفال</h2>
              <p>خدماتنا موجهة للشركات والأفراد البالغين. لا نجمع عمداً بيانات من أقل من 18 عاماً. إذا اكتشفنا ذلك، نحذف البيانات فوراً.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">11. التعديلات على هذه السياسة</h2>
              <p>قد نحدّث هذه السياسة دورياً. سنُعلمك بأي تغييرات جوهرية عبر البريد أو إشعار على الموقع. تاريخ آخر تحديث أعلى الصفحة.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">12. التواصل معنا</h2>
              <div className="glass rounded-xl p-5">
                <p className="mb-3">لأي استفسار حول خصوصيتك أو لممارسة حقوقك:</p>
                <div className="space-y-1 text-sm">
                  <div><strong className="text-foreground">الشركة:</strong> {COMPANY.name} · {COMPANY.nameAr}</div>
                  <div><strong className="text-foreground">العنوان:</strong> {COMPANY.address}</div>
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
