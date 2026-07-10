import { NextRequest, NextResponse } from "next/server";

// ============================================================
// POST /api/contact
// استقبال طلبات التواصل من النموذج
// في الإنتاج: اربط هذا الـ endpoint بقاعدة بيانات (Prisma)
// أو خدمة بريد مثل Resend / Nodemailer
// ============================================================

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  service?: string;
  message: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateEgyptianPhone(phone: string): boolean {
  // Egyptian mobile: +20 10/11/12/15 + 8 digits
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^(\+20|0)?1[0-25]\d{8}$/.test(cleaned);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;

    // Validation
    const errors: string[] = [];

    if (!body.name || body.name.trim().length < 3) {
      errors.push("الاسم مطلوب (3 أحرف على الأقل)");
    }
    if (!body.email || !validateEmail(body.email)) {
      errors.push("بريد إلكتروني غير صحيح");
    }
    if (body.phone && !validateEgyptianPhone(body.phone)) {
      errors.push("رقم هاتف مصري غير صحيح (مثال: 0100 123 4567)");
    }
    if (!body.message || body.message.trim().length < 10) {
      errors.push("الرسالة قصيرة جداً (10 أحرف على الأقل)");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
          message: "تحقّق من الحقول المُدخلة",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // TODO (Production): حفظ في قاعدة البيانات + إرسال بريد
    // ============================================================
    // مثال:
    // import { db } from '@/lib/db';
    // await db.contactRequest.create({
    //   data: {
    //     name: body.name,
    //     email: body.email,
    //     phone: body.phone,
    //     company: body.company,
    //     budget: body.budget,
    //     service: body.service,
    //     message: body.message,
    //     status: 'new',
    //   }
    // });
    //
    // await sendEmail({
    //   to: 'hello@nexusdev.eg',
    //   subject: `طلب جديد من ${body.name}`,
    //   body: `...`,
    // });

    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 600));

    // Log for development (remove in production)
    console.log("[Contact] New request received:", {
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.service,
      budget: body.budget,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "تم استلام طلبك بنجاح! سنتواصل معك خلال 24 ساعة.",
      requestId: `NXS-${Date.now().toString(36).toUpperCase()}`,
    });
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ غير متوقع. حاول مرة أخرى أو راسلنا مباشرة عبر واتساب.",
      },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/contact",
    method: "POST",
    description: "استقبال طلبات التواصل من نموذج الاتصال",
  });
}
