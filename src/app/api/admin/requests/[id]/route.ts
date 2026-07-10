import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// ============================================================
// PATCH /api/admin/requests/[id]
// تحديث حالة/أولوية/إسناد طلب تواصل
// ============================================================

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ success: false, message: "غير مصرّح" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status, priority, assignedTo, notes } = body;

    const data: Record<string, unknown> = {};
    if (status) data.status = status;
    if (priority) data.priority = priority;
    if (assignedTo !== undefined) data.assignedTo = assignedTo || null;
    if (notes !== undefined) data.notes = notes;

    const request = await db.contactRequest.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      request,
    });
  } catch (error) {
    console.error("[Admin Request PATCH] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}

// ============================================================
// DELETE /api/admin/requests/[id]
// حذف طلب تواصل
// ============================================================

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ success: false, message: "غير مصرّح" }, { status: 401 });
    }

    const { id } = await params;
    await db.contactRequest.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "تم حذف الطلب",
    });
  } catch (error) {
    console.error("[Admin Request DELETE] Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
