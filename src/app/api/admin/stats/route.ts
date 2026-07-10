import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// ============================================================
// GET /api/admin/stats
// إحصائيات لوحة التحكم
// ============================================================

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ success: false, message: "غير مصرّح" }, { status: 401 });
    }

    const [
      totalUsers,
      totalConversations,
      openConversations,
      totalRequests,
      newRequests,
      totalMessages,
      adminUsers,
      recentUsers,
      recentRequests,
    ] = await Promise.all([
      db.user.count(),
      db.conversation.count(),
      db.conversation.count({ where: { status: "open" } }),
      db.contactRequest.count(),
      db.contactRequest.count({ where: { status: "new" } }),
      db.message.count(),
      db.user.count({ where: { role: "admin" } }),
      db.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, email: true, role: true, createdAt: true, lastLoginAt: true },
      }),
      db.contactRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, email: true, service: true, status: true, priority: true, createdAt: true, requestId: true },
      }),
    ]);

    // Requests by status
    const requestsByStatus = await db.contactRequest.groupBy({
      by: ["status"],
      _count: true,
    });

    // Conversations by status
    const conversationsByStatus = await db.conversation.groupBy({
      by: ["status"],
      _count: true,
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalConversations,
        openConversations,
        totalRequests,
        newRequests,
        totalMessages,
        adminUsers,
        recentUsers,
        recentRequests,
        requestsByStatus,
        conversationsByStatus,
      },
    });
  } catch (error) {
    console.error("[Admin Stats API] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
