"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "كم يستغرق إنجاز مشروع متكامل؟",
    a: "يعتمد ذلك على نطاق المشروع وتعقيده. بشكل عام: MVP في 4-6 أسابيع، تطبيق ويب متكامل في 8-12 أسبوع، ومنصة كبيرة متعددة الخدمات في 4-6 أشهر. نزوّدك بجدول زمني مفصّل بعد جلسة الاكتشاف الأولى مع مواعيد واضمة لكل مرحلة.",
  },
  {
    q: "هل أحصل على كود المصدر الكامل؟",
    a: "نعم، بالتأكيد. جميع مشاريعنا تشمل كود المصدر الكامل بمستودع Git خاص بك، التوثيق الفني، تعليقات على الكود، وحقوق ملكية فكرية كاملة. لا نحبسك معنا — الكود ملكك من اليوم الأول.",
  },
  {
    q: "ماذا عن الدعم بعد الإطلاق؟",
    a: "كل باقة تشمل فترة دعم مجانية (30-90 يوماً حسب الباقة). بعد ذلك نوفّر عقود صيانة شهرية بمرونة كاملة: إصلاح الأعطال، تحديثات التقنيات، إضافة ميزات، ومراقبة الأداء. أنت تختار مستوى الخدمة الذي يناسبك.",
  },
  {
    q: "كيف تتعاملون مع خصوصية وأمان البيانات؟",
    a: "الأمان أولوية قصوى. نتبع معايير OWASP Top 10، نطبّق تشفير البيانات أثناء النقل والتخزين، نستخدم مصادقة قوية (2FA, OAuth2)، نعزل البيانات الحساسة، ونجري اختبارات اختراق دورية. كما نوقّع اتفاقيات سرية NDA قبل بدء أي مشروع.",
  },
  {
    q: "هل القوالب الجاهزة تدعم التخصيص؟",
    a: "بالتأكيد. كل قالب مبني ليكون مرناً: متغيرات ألوان وخطوط، مكونات قابلة للتركيب، بنية مجلدات واضحة، وتوثيق شامل. إذا احتجت تخصيصاً أعمق، فريقنا متاح لتنفيذه مقابل رسوم منفصلة، أو يمكنك تعديل الكود بنفسك بحرية.",
  },
  {
    q: "ما هي طرق الدفع المتاحة؟",
    a: "نقبل البطاقات الائتمانية (Visa, Mastercard), PayPal, تحويلات بنكية، وعملات رقمية مستقرة (USDT/USDC) للمشاريع الدولية. للمشاريع الكبيرة، نقسّم الدفع على مراحل: 30% دفعة أولى، 40% عند منتصف المشروع، 30% عند التسليم.",
  },
  {
    q: "هل تعملون مع شركات خارج المنطقة العربية؟",
    a: "نعم، عملاؤنا من أكثر من 18 دولة حول العالم. فريقنا متعدد اللغات (عربي، إنجليزي، فرنسي)، نتعامل بالتوقيتات التي تناسبك، ونتقيد باتفاقيات قانونية واضحة. لدينا خبرة في التعامل مع متطلبات الأسواق: GDPR، CCPA، وغيرها.",
  },
  {
    q: "ماذا لو لم أرضَ عن النتيجة؟",
    a: "نضمن رضاك 100%. نعمل بمنهجية Agile مع مراحل مراجعة أسبوعية، فلا مفاجآت في النهاية. إذا لم تكن راضياً خلال أول 14 يوماً من بدء العمل، نعيد دفعتك الأولى كاملة دون أسئلة. رضاك هو سمعتنا.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-20 lg:py-28 border-y border-white/5">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-xs font-semibold text-primary mb-4">
            الأسئلة الشائعة
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            كل ما تريد
            <span className="text-gradient-primary"> معرفته</span>
          </h2>
          <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
            جمعنا أكثر الأسئلة شيوعاً من عملائنا. لم تجد إجابتك؟ تواصل معنا مباشرة وسنجيبك خلال 24 ساعة.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass rounded-2xl px-6 border-none overflow-hidden data-[state=open]:border-primary/30 data-[state=open]:border transition-colors"
              >
                <AccordionTrigger className="text-right hover:no-underline py-5 text-base font-bold text-foreground">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
