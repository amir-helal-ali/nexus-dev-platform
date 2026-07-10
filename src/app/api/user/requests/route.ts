import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// ============================================================
// GET /api/user/requests
// جلب طلبات التواصل للمستخدم الحالي
// ============================================================

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "غير مصرّح" }, { status: 401 });
    }

    // For non-logged-in users who submitted contact forms,
    // we match by email — but since this API requires auth,
    // we'll fetch by userId OR by email
    const requests = await db.contactRequest.findMany({
      where: {
        OR: [
          { userId: session.user.id },
          { email: session.user.email },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        requestId: true,
        service: true,
        status: true,
        priority: true,
        createdAt: true,
        message: true,
        conversationId: true,
      },
    });

    return NextResponse.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("[User Requests GET] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
