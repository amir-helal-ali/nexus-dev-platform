import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// ============================================================
// POST /api/conversations/[id]/messages
// إرسال رسالة جديدة في محادثة
// ============================================================

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "غير مصرّح" }, { status: 401 });
    }

    const { id: conversationId } = await params;
    const body = await req.json();
    const { content, type = "text", attachmentUrl } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "محتوى الرسالة مطلوب" },
        { status: 400 }
      );
    }

    // Verify conversation exists and user has access
    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      return NextResponse.json(
        { success: false, message: "المحادثة غير موجودة" },
        { status: 404 }
      );
    }

    const isAdmin = session.user.role === "admin";
    if (!isAdmin && conversation.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, message: "غير مصرّح" },
        { status: 403 }
      );
    }

    if (conversation.status === "closed") {
      return NextResponse.json(
        { success: false, message: "المحادثة مغلقة" },
        { status: 400 }
      );
    }

    // If admin sends, auto-assign to them
    let adminId = conversation.adminId;
    if (isAdmin && !adminId) {
      adminId = session.user.id;
    }

    // Create message + update conversation in transaction
    const message = await db.$transaction(async (tx) => {
      const msg = await tx.message.create({
        data: {
          conversationId,
          senderId: session.user.id,
          content: content.trim(),
          type,
          attachmentUrl: attachmentUrl || null,
        },
      });

      // Update conversation
      const updateData: Record<string, unknown> = {
        lastMessage: content.trim(),
        lastMessageAt: new Date(),
        adminId: adminId || null,
      };

      // Increment unread for the other party
      if (isAdmin) {
        updateData.unreadByUser = (conversation.unreadByUser || 0) + 1;
      } else {
        updateData.unreadByAdmin = (conversation.unreadByAdmin || 0) + 1;
      }

      await tx.conversation.update({
        where: { id: conversationId },
        data: updateData,
      });

      // Create notification for the other party
      const notifyUserId = isAdmin ? conversation.userId : (adminId || conversation.adminId);
      if (notifyUserId && notifyUserId !== session.user.id) {
        await tx.notification.create({
          data: {
            userId: notifyUserId,
            type: "message",
            title: isAdmin ? "ردّ جديد من الإدارة" : "رسالة جديدة من عميل",
            body: content.trim().slice(0, 100),
            link: isAdmin ? `/chat` : `/admin/chats`,
          },
        });
      }

      return msg;
    });

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("[Messages POST] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
