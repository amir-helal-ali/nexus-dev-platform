import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// ============================================================
// GET /api/conversations/[id]
// تفاصيل محادثة + جميع الرسائل
// ============================================================

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "غير مصرّح" }, { status: 401 });
    }

    const { id } = await params;

    const conversation = await db.conversation.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true, avatar: true },
        },
        admin: {
          select: { id: true, name: true, email: true, avatar: true },
        },
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { success: false, message: "المحادثة غير موجودة" },
        { status: 404 }
      );
    }

    // Authorization: user can see only their own, admin can see all
    if (session.user.role !== "admin" && conversation.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, message: "غير مصرّح" },
        { status: 403 }
      );
    }

    // Mark messages from the other party as read
    const otherPartyId = session.user.role === "admin" ? conversation.userId : conversation.adminId;
    if (otherPartyId) {
      await db.message.updateMany({
        where: {
          conversationId: id,
          senderId: { not: session.user.id },
          isRead: false,
        },
        data: { isRead: true, readAt: new Date() },
      });

      // Reset unread counter
      if (session.user.role === "admin") {
        await db.conversation.update({ where: { id }, data: { unreadByAdmin: 0 } });
      } else {
        await db.conversation.update({ where: { id }, data: { unreadByUser: 0 } });
      }
    }

    return NextResponse.json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error("[Conversation GET] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}

// ============================================================
// PATCH /api/conversations/[id]
// تحديث حالة المحادثة / إسنادها لأدمن
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
    const body = await req.json();
    const { status, adminId, priority } = body;

    // Only admins can update conversation status/assignment
    if (session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "صلاحيات غير كافية" },
        { status: 403 }
      );
    }

    const data: Record<string, unknown> = {};
    if (status) data.status = status;
    if (adminId !== undefined) data.adminId = adminId || null;
    if (priority) data.priority = priority;

    const conversation = await db.conversation.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error("[Conversation PATCH] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
