import { NextRequest } from "next/response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// ============================================================
// GET /api/conversations/stream
// SSE stream for conversation updates (new messages, status changes)
// ============================================================
// يُرسل تحديثات المحادثات للمستخدم لحظياً:
// - رسائل جديدة في أي محادثة
// - تغيير حالة المحادثة
// - تحديث unread counts

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = session.user.id;
  const isAdmin = session.user.role === "admin";
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Initial connection
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: "connected", userId, isAdmin })}\n\n`)
      );

      // Track state
      let lastMessageCheck = new Date();
      let lastConversationCheck = new Date();
      const sentMessageIds = new Set<string>();

      // Heartbeat
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: heartbeat\n\n`));
        } catch (e) {
          clearInterval(heartbeat);
          clearInterval(messageInterval);
          clearInterval(convInterval);
          controller.close();
        }
      }, 30000);

      // Message check (every 2s for low-latency chat)
      const messageInterval = setInterval(async () => {
        try {
          // Find conversations this user has access to
          const whereClause = isAdmin
            ? {} // admin sees all
            : { userId };

          const conversations = await db.conversation.findMany({
            where: whereClause,
            select: { id: true },
          });

          const convIds = conversations.map((c) => c.id);
          if (convIds.length === 0) return;

          // New messages since last check
          const newMessages = await db.message.findMany({
            where: {
              conversationId: { in: convIds },
              createdAt: { gt: lastMessageCheck },
              senderId: { not: userId }, // only messages from others
            },
            include: {
              sender: {
                select: { id: true, name: true, role: true },
              },
              conversation: {
                select: { id: true, subject: true, userId: true, adminId: true },
              },
            },
            orderBy: { createdAt: "asc" },
            take: 20,
          });

          if (newMessages.length > 0) {
            lastMessageCheck = new Date();
            for (const msg of newMessages) {
              if (sentMessageIds.has(msg.id)) continue;
              sentMessageIds.add(msg.id);
              // Keep set from growing indefinitely
              if (sentMessageIds.size > 100) {
                const arr = Array.from(sentMessageIds);
                sentMessageIds.clear();
                arr.slice(-50).forEach((id) => sentMessageIds.add(id));
              }

              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({
                  type: "message",
                  conversationId: msg.conversationId,
                  message: {
                    id: msg.id,
                    conversationId: msg.conversationId,
                    senderId: msg.senderId,
                    senderName: msg.sender.name,
                    senderRole: msg.sender.role,
                    content: msg.content,
                    type: msg.type,
                    createdAt: msg.createdAt.toISOString(),
                    isRead: msg.isRead,
                  },
                  conversation: msg.conversation,
                })}\n\n`)
              );
            }
          }
        } catch (err) {
          console.error("[SSE Conv] Message stream error:", err);
        }
      }, 2000);

      // Conversation status check (every 5s)
      const convInterval = setInterval(async () => {
        try {
          const whereClause = isAdmin
            ? { updatedAt: { gt: lastConversationCheck } }
            : { userId, updatedAt: { gt: lastConversationCheck } };

          const updatedConvs = await db.conversation.findMany({
            where: whereClause,
            include: {
              user: { select: { id: true, name: true, email: true } },
              admin: { select: { id: true, name: true } },
            },
            orderBy: { updatedAt: "desc" },
            take: 10,
          });

          if (updatedConvs.length > 0) {
            lastConversationCheck = new Date();
            for (const conv of updatedConvs) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({
                  type: "conversation_update",
                  conversation: {
                    id: conv.id,
                    subject: conv.subject,
                    type: conv.type,
                    status: conv.status,
                    priority: conv.priority,
                    lastMessage: conv.lastMessage,
                    lastMessageAt: conv.lastMessageAt?.toISOString(),
                    unreadByUser: conv.unreadByUser,
                    unreadByAdmin: conv.unreadByAdmin,
                    user: conv.user,
                    admin: conv.admin,
                    updatedAt: conv.updatedAt.toISOString(),
                  },
                })}\n\n`)
              );
            }
          }
        } catch (err) {
          console.error("[SSE Conv] Status stream error:", err);
        }
      }, 5000);

      // Cleanup on abort
      req.signal.addEventListener("abort", () => {
        clearInterval(heartbeat);
        clearInterval(messageInterval);
        clearInterval(convInterval);
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
