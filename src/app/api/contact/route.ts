import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// ============================================================
// POST /api/contact
// استقبال طلبات التواصل وحفظها في قاعدة البيانات
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
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^(\+20|0)?1[0-25]\d{8}$/.test(cleaned);
}

function generateRequestId(): string {
  return `NXS-${Date.now().toString(36).toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;
    const session = await getServerSession(authOptions);

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

    // Generate unique request ID
    const requestId = generateRequestId();

    // Create contact request in DB
    const contactRequest = await db.contactRequest.create({
      data: {
        requestId,
        name: body.name.trim(),
        email: body.email.toLowerCase(),
        phone: body.phone || null,
        company: body.company || null,
        budget: body.budget || null,
        service: body.service || null,
        message: body.message.trim(),
        status: "new",
        priority: "normal",
        userId: session?.user?.id || null,
      },
    });

    // Notify all admins
    const admins = await db.user.findMany({ where: { role: "admin" } });
    for (const admin of admins) {
      await db.notification.create({
        data: {
          userId: admin.id,
          type: "request",
          title: "طلب تواصل جديد",
          body: `${body.name} - ${body.service || "استشارة"}: ${body.message.slice(0, 80)}`,
          link: `/admin/requests`,
        },
      });
    }

    // Log for development
    console.log("[Contact] New request saved:", {
      requestId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.service,
      budget: body.budget,
      dbId: contactRequest.id,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "تم استلام طلبك بنجاح! سنتواصل معك خلال 24 ساعة.",
      requestId,
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
