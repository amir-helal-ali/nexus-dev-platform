import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// ============================================================
// PATCH /api/notifications/[id]
// تعليم إشعار كمقروء
// ============================================================

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "غير مصرّح" }, { status: 401 });
    }

    const { id } = await params;

    // Verify ownership
    const notification = await db.notification.findUnique({ where: { id } });
    if (!notification || notification.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, message: "الإشعار غير موجود" },
        { status: 404 }
      );
    }

    await db.notification.update({
      where: { id },
      data: { isRead: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Notification PATCH] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}

// ============================================================
// DELETE /api/notifications/[id]
// حذف إشعار
// ============================================================

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "غير مصرّح" }, { status: 401 });
    }

    const { id } = await params;

    const notification = await db.notification.findUnique({ where: { id } });
    if (!notification || notification.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, message: "الإشعار غير موجود" },
        { status: 404 }
      );
    }

    await db.notification.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Notification DELETE] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
