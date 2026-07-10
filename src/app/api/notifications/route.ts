import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// ============================================================
// GET /api/notifications
// جلب إشعارات المستخدم (آخر 50)
// ============================================================

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "غير مصرّح" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const onlyUnread = searchParams.get("unread") === "true";
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);

    const where: Record<string, unknown> = { userId: session.user.id };
    if (onlyUnread) where.isRead = false;

    const notifications = await db.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    const unreadCount = await db.notification.count({
      where: { userId: session.user.id, isRead: false },
    });

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error("[Notifications GET] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}

// ============================================================
// PATCH /api/notifications
// تعليم الكل كمقروء
// ============================================================

export async function PATCH() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "غير مصرّح" }, { status: 401 });
    }

    const result = await db.notification.updateMany({
      where: { userId: session.user.id, isRead: false },
      data: { isRead: true },
    });

    return NextResponse.json({
      success: true,
      updated: result.count,
    });
  } catch (error) {
    console.error("[Notifications PATCH] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
