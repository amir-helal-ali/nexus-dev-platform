import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

// ============================================================
// PATCH /api/user/profile
// تحديث بيانات المستخدم (الاسم، الهاتف) + تغيير كلمة المرور
// ============================================================

interface UpdatePayload {
  name?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
}

function validateEgyptianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^(\+20|0)?1[0-25]\d{8}$/.test(cleaned);
}

function validatePassword(password: string): string[] {
  const errors: string[] = [];
  if (password.length < 8) errors.push("8 أحرف على الأقل");
  if (!/[A-Z]/.test(password)) errors.push("حرف كبير واحد");
  if (!/[a-z]/.test(password)) errors.push("حرف صغير واحد");
  if (!/[0-9]/.test(password)) errors.push("رقم واحد");
  return errors;
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "غير مصرّح" }, { status: 401 });
    }

    const body = (await req.json()) as UpdatePayload;
    const errors: string[] = [];

    // Validate name
    if (body.name !== undefined && body.name.trim().length < 3) {
      errors.push("الاسم يجب أن يكون 3 أحرف على الأقل");
    }

    // Validate phone
    if (body.phone && !validateEgyptianPhone(body.phone)) {
      errors.push("رقم هاتف مصري غير صحيح");
    }

    // Validate password change
    if (body.newPassword) {
      if (!body.currentPassword) {
        errors.push("كلمة المرور الحالية مطلوبة لتغيير كلمة المرور");
      }
      const pwdErrors = validatePassword(body.newPassword);
      if (pwdErrors.length > 0) {
        errors.push(`كلمة المرور الجديدة: ${pwdErrors.join("، ")}`);
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors, message: "تحقّق من البيانات" },
        { status: 400 }
      );
    }

    // Fetch current user
    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ success: false, message: "المستخدم غير موجود" }, { status: 404 });
    }

    // Verify current password if changing
    if (body.newPassword && body.currentPassword) {
      const isValid = await bcrypt.compare(body.currentPassword, user.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          { success: false, message: "كلمة المرور الحالية غير صحيحة" },
          { status: 400 }
        );
      }
    }

    // Build update data
    const updateData: Record<string, unknown> = {};
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.phone !== undefined) updateData.phone = body.phone || null;

    if (body.newPassword) {
      updateData.passwordHash = await bcrypt.hash(body.newPassword, 12);
    }

    const updated = await db.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: { id: true, name: true, email: true, phone: true, role: true },
    });

    return NextResponse.json({
      success: true,
      message: body.newPassword
        ? "تم تحديث البيانات وكلمة المرور بنجاح"
        : "تم تحديث البيانات بنجاح",
      user: updated,
    });
  } catch (error) {
    console.error("[Profile PATCH] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
