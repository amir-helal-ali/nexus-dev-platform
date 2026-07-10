import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// ============================================================
// GET /api/conversations
// - للمستخدم: محادثاته فقط
// - للأدمن: كل المحادثات (مع فلترة اختيارية)
// ============================================================

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "غير مصرّح" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};

    if (session.user.role === "admin") {
      // Admin sees all
      if (status) where.status = status;
    } else {
      // User sees only their own
      where.userId = session.user.id;
      if (status) where.status = status;
    }

    const conversations = await db.conversation.findMany({
      where,
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true, avatar: true },
        },
        admin: {
          select: { id: true, name: true, email: true, avatar: true },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { lastMessageAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      conversations,
    });
  } catch (error) {
    console.error("[Conversations API] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}

// ============================================================
// POST /api/conversations
// إنشاء محادثة جديدة (للمستخدم فقط)
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "غير مصرّح" }, { status: 401 });
    }

    const body = await req.json();
    const { subject, type = "consultation", initialMessage, contactRequestId } = body;

    if (!subject || !initialMessage) {
      return NextResponse.json(
        { success: false, message: "الموضوع والرسالة الأولى مطلوبان" },
        { status: 400 }
      );
    }

    // Create conversation + first message in transaction
    const conversation = await db.$transaction(async (tx) => {
      const conv = await tx.conversation.create({
        data: {
          userId: session.user.id,
          subject,
          type,
          status: "open",
          lastMessage: initialMessage,
          lastMessageAt: new Date(),
        },
      });

      // If a contact request ID was provided, link it
      if (contactRequestId) {
        await tx.contactRequest.update({
          where: { id: contactRequestId },
          data: { conversationId: conv.id },
        }).catch(() => {
          // ignore if not found
        });
      }

      await tx.message.create({
        data: {
          conversationId: conv.id,
          senderId: session.user.id,
          content: initialMessage,
          type: "text",
        },
      });

      // Notify admins
      const admins = await tx.user.findMany({ where: { role: "admin" } });
      for (const admin of admins) {
        await tx.notification.create({
          data: {
            userId: admin.id,
            type: "message",
            title: "محادثة جديدة",
            body: `${session.user.name} بدأ محادثة: ${subject}`,
            link: `/admin/chats`,
          },
        });
      }

      return conv;
    });

    return NextResponse.json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error("[Conversations POST] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
