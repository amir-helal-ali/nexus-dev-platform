import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ============================================================
// GET /api/conversations/quick-replies
// ردود سريعة جاهزة للأدمن
// ============================================================

interface QuickReply {
  id: string;
  title: string;
  content: string;
  category: "greeting" | "pricing" | "timeline" | "support" | "closing";
}

const QUICK_REPLIES: QuickReply[] = [
  // Greetings
  {
    id: "greet-1",
    title: "ترحيب",
    category: "greeting",
    content: "مرحباً بك في نكسوس ديف! 🎉\n\nشكراً لتواصلك معنا. كيف يمكننا مساعدتك اليوم؟",
  },
  {
    id: "greet-2",
    title: "ترحيب رسمي",
    category: "greeting",
    content: "أهلاً وسهلاً بك في نكسوس ديف. 👋\n\nفريقنا جاهز لمساعدتك. شاركنا تفاصيل طلبك وسنردّ عليك خلال دقائق.",
  },
  // Pricing
  {
    id: "price-1",
    title: "طلب تفاصيل الأسعار",
    category: "pricing",
    content: "بخصوص الأسعار، تختلف التكلفة حسب:\n\n• نطاق المشروع\n• الميزات المطلوبة\n• الجدول الزمني\n\nهل يمكنك مشاركة تفاصيل أكثر عن فكرتك؟ سنرسل لك عرض سعر مفصّل خلال 24 ساعة.",
  },
  {
    id: "price-2",
    title: "عرض الباقات",
    category: "pricing",
    content: "لدينا 3 باقات تناسب احتياجات مختلفة:\n\n🚀 Starter — تبدأ من 60,000 ج.م\n🏢 Growth — تبدأ من 155,000 ج.م (الأكثر طلباً)\n✨ Enterprise — حسب الطلب\n\nتفاصيل أكثر على: /pricing",
  },
  // Timeline
  {
    id: "time-1",
    title: "مواعيد التسليم",
    category: "timeline",
    content: "مواعيد التسليم تختلف حسب نوع المشروع:\n\n• MVP: 4-6 أسابيع\n• تطبيق ويب: 8-12 أسبوع\n• منصة كبيرة: 4-6 أشهر\n\nسنعطيك جدولاً زمنياً مفصّلاً بعد جلسة الاكتشافت.",
  },
  // Support
  {
    id: "support-1",
    title: "طلب سكرين شوت",
    category: "support",
    content: "لمساعدتك بشكل أفضل، يرجى إرسال:\n\n📸 لقطة شاشة للمشكلة\n🔗 رابط الصفحة (إن وجدت)\n📝 وصف للخطوات التي قمت بها",
  },
  {
    id: "support-2",
    title: "تأكيد الحل",
    category: "support",
    content: "تم حل المشكلة! ✅\n\nهل يمكنك التأكد من أن كل شيء يعمل بشكل صحيح الآن؟ إذا واجهت أي مشكلة أخرى، نحن هنا للمساعدة.",
  },
  // Closing
  {
    id: "close-1",
    title: "شكر وتوديع",
    category: "closing",
    content: "شكراً لك على ثقتك في نكسوس ديف! 🙏\n\nنحن دائماً هنا إذا احتجت أي مساعدة مستقبلاً. نتمنى لك يوماً سعيداً!",
  },
  {
    id: "close-2",
    title: "متابعة لاحقة",
    category: "closing",
    content: "سنتواصل معك مرة أخرى بعد أيام لمتابعة الأمور. إذا كان لديك أي استفسار قبل ذلك، لا تتردد في مراسلتنا.\n\nمع تحيات فريق نكسوس ديف 🇪🇬",
  },
];

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ success: false, message: "غير مصرّح" }, { status: 401 });
  }

  // All authenticated users can see quick replies (useful for users too)
  // but only admins get all categories
  const replies = session.user.role === "admin"
    ? QUICK_REPLIES
    : QUICK_REPLIES.filter((r) => r.category === "greeting" || r.category === "closing");

  return NextResponse.json({
    success: true,
    replies,
    categories: [
      { value: "greeting", label: "ترحيب" },
      { value: "pricing", label: "أسعار" },
      { value: "timeline", label: "مواعيد" },
      { value: "support", label: "دعم" },
      { value: "closing", label: "ختام" },
    ],
  });
}
