import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// ============================================================
// POST /api/conversations/[id]/reopen
// إعادة فتح محادثة (الأدمن فقط)
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

    // Only admins can reopen
    if (session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "صلاحيات غير كافية" },
        { status: 403 }
      );
    }

    const { id } = await params;

    const conversation = await db.conversation.findUnique({ where: { id } });
    if (!conversation) {
      return NextResponse.json(
        { success: false, message: "المحادثة غير موجودة" },
        { status: 404 }
      );
    }

    await db.$transaction(async (tx) => {
      await tx.conversation.update({
        where: { id },
        data: { status: "open" },
      });

      await tx.message.create({
        data: {
          conversationId: id,
          senderId: session.user.id,
          content: "🔓 تمت إعادة فتح هذه المحادثة.",
          type: "system",
        },
      });
    });

    return NextResponse.json({ success: true, status: "open" });
  } catch (error) {
    console.error("[Conversation Reopen] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
