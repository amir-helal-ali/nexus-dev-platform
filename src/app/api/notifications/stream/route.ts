import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// ============================================================
// GET /api/notifications/stream
// Server-Sent Events (SSE) stream for real-time notifications
// ============================================================
// يُرسل الإشعارات الجديدة للمستخدم لحظياً عبر SSE
// يتحقق كل 5 ثوانٍ من وجود إشعارات جديدة (DB polling داخلي، ليس HTTP polling)
// يُرسل heartbeat كل 30 ثانية لإبقاء الاتصال حياً

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = session.user.id;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Send initial connection event
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: "connected", userId, timestamp: Date.now() })}\n\n`)
      );

      // Track last check time
      let lastCheck = new Date();

      // Heartbeat interval (every 30s)
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: heartbeat\n\n`));
        } catch (e) {
          clearInterval(heartbeat);
          clearInterval(notifyInterval);
          controller.close();
        }
      }, 30000);

      // Notification check interval (every 5s)
      const notifyInterval = setInterval(async () => {
        try {
          // Find unread notifications created after lastCheck
          const notifications = await db.notification.findMany({
            where: {
              userId,
              isRead: false,
              createdAt: { gt: lastCheck },
            },
            orderBy: { createdAt: "desc" },
            take: 10,
          });

          if (notifications.length > 0) {
            lastCheck = new Date();
            for (const n of notifications) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({
                  type: "notification",
                  id: n.id,
                  notificationType: n.type,
                  title: n.title,
                  body: n.body,
                  link: n.link,
                  createdAt: n.createdAt.toISOString(),
                })}\n\n`)
              );
            }
          }

          // Also send unread counts for conversations (chat badge updates)
          const userConvCount = await db.conversation.count({
            where: {
              OR: [
                { userId, unreadByUser: { gt: 0 } },
                { adminId: userId, unreadByAdmin: { gt: 0 } },
              ],
            },
          });

          const totalUnreadMessages = await db.conversation.aggregate({
            where: {
              OR: [
                { userId, unreadByUser: { gt: 0 } },
                { adminId: userId, unreadByAdmin: { gt: 0 } },
              ],
            },
            _sum: {
              unreadByUser: true,
              unreadByAdmin: true,
            },
          });

          const unreadForMe =
            session.user.role === "admin"
              ? totalUnreadMessages._sum.unreadByAdmin || 0
              : totalUnreadMessages._sum.unreadByUser || 0;

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              type: "unread_count",
              conversations: userConvCount,
              messages: unreadForMe,
            })}\n\n`)
          );
        } catch (err) {
          console.error("[SSE] Notification stream error:", err);
        }
      }, 5000);

      // Cleanup on abort
      req.signal.addEventListener("abort", () => {
        clearInterval(heartbeat);
        clearInterval(notifyInterval);
        try {
          controller.close();
        } catch (e) {
          // already closed
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
