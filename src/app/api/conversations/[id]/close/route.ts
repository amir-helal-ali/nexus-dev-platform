import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// ============================================================
// POST /api/conversations/[id]/close
// إغلاق محادثة (المستخدم أو الأدمن)
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

    const { id } = await params;

    const conversation = await db.conversation.findUnique({ where: { id } });
    if (!conversation) {
      return NextResponse.json(
        { success: false, message: "المحادثة غير موجودة" },
        { status: 404 }
      );
    }

    // Authorization
    const isAdmin = session.user.role === "admin";
    if (!isAdmin && conversation.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, message: "غير مصرّح" },
        { status: 403 }
      );
    }

    await db.$transaction(async (tx) => {
      await tx.conversation.update({
        where: { id },
        data: { status: "closed" },
      });

      // Add system message
      await tx.message.create({
        data: {
          conversationId: id,
          senderId: session.user.id,
          content: isAdmin
            ? "🔒 تم إغلاق هذه المحادثة من قبل الإدارة. إذا احتجت مساعدة إضافية، ابدأ محادثة جديدة."
            : "🔒 تم إغلاق هذه المحادثة من قبل العميل.",
          type: "system",
        },
      });

      // Notify the other party
      const otherUserId = isAdmin ? conversation.userId : conversation.adminId;
      if (otherUserId && otherUserId !== session.user.id) {
        await tx.notification.create({
          data: {
            userId: otherUserId,
            type: "system",
            title: "تم إغلاق محادثة",
            body: `المحادثة: ${conversation.subject}`,
            link: isAdmin ? "/chat" : "/admin/chats",
          },
        });
      }
    });

    return NextResponse.json({ success: true, status: "closed" });
  } catch (error) {
    console.error("[Conversation Close] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
