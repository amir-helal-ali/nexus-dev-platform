import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

// ============================================================
// POST /api/auth/register
// تسجيل مستخدم جديد
// ============================================================

interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateEgyptianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^(\+20|0)?1[0-25]\d{8}$/.test(cleaned);
}

function validatePassword(password: string): string[] {
  const errors: string[] = [];
  if (password.length < 8) errors.push("8 أحرف على الأقل");
  if (!/[A-Z]/.test(password)) errors.push("حرف كبير واحد على الأقل");
  if (!/[a-z]/.test(password)) errors.push("حرف صغير واحد على الأقل");
  if (!/[0-9]/.test(password)) errors.push("رقم واحد على الأقل");
  return errors;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterPayload;

    // Validation
    const errors: string[] = [];

    if (!body.name || body.name.trim().length < 3) {
      errors.push("الاسم مطلوب (3 أحرف على الأقل)");
    }
    if (!body.email || !validateEmail(body.email)) {
      errors.push("بريد إلكتروني غير صحيح");
    }
    if (body.phone && !validateEgyptianPhone(body.phone)) {
      errors.push("رقم هاتف مصري غير صحيح");
    }
    if (!body.password) {
      errors.push("كلمة المرور مطلوبة");
    } else {
      const pwdErrors = validatePassword(body.password);
      if (pwdErrors.length > 0) {
        errors.push(`كلمة المرور يجب أن تحتوي على: ${pwdErrors.join("، ")}`);
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors, message: "تحقّق من البيانات المُدخلة" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await db.user.findUnique({
      where: { email: body.email.toLowerCase() },
    });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "هذا البريد الإلكتروني مسجّل بالفعل" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(body.password, 12);

    // Create user
    const user = await db.user.create({
      data: {
        name: body.name.trim(),
        email: body.email.toLowerCase(),
        phone: body.phone || null,
        passwordHash,
        role: "user", // default role
      },
    });

    return NextResponse.json({
      success: true,
      message: "تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول.",
      userId: user.id,
    });
  } catch (error) {
    console.error("[Register API] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع أثناء التسجيل" },
      { status: 500 }
    );
  }
}
