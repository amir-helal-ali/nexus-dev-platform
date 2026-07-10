// ============================================================
// NEXUS DEV — Real-time Chat WebSocket Service
// Port: 3003
// ============================================================
// يستقبل الاتصالات من Caddy عبر XTransformPort=3003
// Frontend: io("/?XTransformPort=3003")
// ============================================================

import { createServer } from "http";
import { Server, Socket } from "socket.io";

const PORT = 3003;

const httpServer = createServer();
const io = new Server(httpServer, {
  path: "/",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

// ============================================================
// إدارة الحالة في الذاكرة
// ============================================================

// خريطة: socket.id -> { userId, role }
const onlineUsers = new Map<string, { userId: string; role: string; socket: Socket }>();

// خريطة: userId -> Set<socket.id> (قد يكون له أكثر من اتصال)
const userSockets = new Map<string, Set<string>>();

// خريطة: conversationId -> Set<socket.id> (المتواجدون في الغرفة)
const roomMembers = new Map<string, Set<string>>();

// ============================================================
// Helpers
// ============================================================

function setUserOnline(userId: string, role: string, socket: Socket) {
  onlineUsers.set(socket.id, { userId, role, socket });
  if (!userSockets.has(userId)) userSockets.set(userId, new Set());
  userSockets.get(userId)!.add(socket.id);
}

function setUserOffline(socket: Socket) {
  const userInfo = onlineUsers.get(socket.id);
  if (!userInfo) return;
  onlineUsers.delete(socket.id);
  const sockets = userSockets.get(userInfo.userId);
  if (sockets) {
    sockets.delete(socket.id);
    if (sockets.size === 0) userSockets.delete(userInfo.userId);
  }
}

function joinRoom(conversationId: string, socket: Socket) {
  socket.join(`conv:${conversationId}`);
  if (!roomMembers.has(conversationId)) roomMembers.set(conversationId, new Set());
  roomMembers.get(conversationId)!.add(socket.id);
}

function leaveRoom(conversationId: string, socket: Socket) {
  socket.leave(`conv:${conversationId}`);
  const members = roomMembers.get(conversationId);
  if (members) {
    members.delete(socket.id);
    if (members.size === 0) roomMembers.delete(conversationId);
  }
}

function emitToUser(userId: string, event: string, data: unknown) {
  const sockets = userSockets.get(userId);
  if (!sockets) return;
  sockets.forEach((socketId) => {
    const userInfo = onlineUsers.get(socketId);
    if (userInfo) userInfo.socket.emit(event, data);
  });
}

// ============================================================
// Connection handler
// ============================================================

io.on("connection", (socket: Socket) => {
  console.log(`[${new Date().toISOString()}] Client connected: ${socket.id}`);

  // ============================================================
  // Event: user:join
  // عندما ي logarithm المستخدم بنجاح
  // payload: { userId, role }
  // ============================================================
  socket.on("user:join", (payload: { userId: string; role: string }) => {
    if (!payload?.userId) return;
    setUserOnline(payload.userId, payload.role || "user", socket);
    console.log(`User online: ${payload.userId} (${payload.role})`);

    // Notify admins that user is online
    if (payload.role !== "admin") {
      onlineUsers.forEach((info) => {
        if (info.role === "admin") {
          info.socket.emit("user:online", { userId: payload.userId });
        }
      });
    }
  });

  // ============================================================
  // Event: conversation:join
  // عندما يفتح المستخدم/الأدمن محادثة
  // payload: { conversationId }
  // ============================================================
  socket.on("conversation:join", (payload: { conversationId: string }) => {
    if (!payload?.conversationId) return;
    joinRoom(payload.conversationId, socket);
    console.log(`Socket ${socket.id} joined conversation: ${payload.conversationId}`);

    // Notify others in the room
    socket.to(`conv:${payload.conversationId}`).emit("conversation:typing", {
      conversationId: payload.conversationId,
      userId: onlineUsers.get(socket.id)?.userId,
      isViewing: true,
    });
  });

  // ============================================================
  // Event: conversation:leave
  // ============================================================
  socket.on("conversation:leave", (payload: { conversationId: string }) => {
    if (!payload?.conversationId) return;
    leaveRoom(payload.conversationId, socket);
  });

  // ============================================================
  // Event: message:send
  // إرسال رسالة جديدة
  // payload: { conversationId, message (object) }
  // ============================================================
  socket.on(
    "message:send",
    (payload: { conversationId: string; message: MessagePayload }) => {
      if (!payload?.conversationId || !payload?.message) return;

      const message = payload.message;
      console.log(`[Message] Conv: ${payload.conversationId} | From: ${message.senderId} | Content: ${message.content.slice(0, 50)}`);

      // Broadcast to everyone in the conversation room
      io.to(`conv:${payload.conversationId}`).emit("message:receive", {
        conversationId: payload.conversationId,
        message,
      });

      // Also emit to all sockets of the OTHER party (in case they're not in the room)
      const senderInfo = onlineUsers.get(socket.id);
      if (senderInfo) {
        // If sender is admin, notify the user; if sender is user, notify all admins
        // We don't know the other party's userId from here,
        // but the frontend already handles it via room join
      }
    }
  );

  // ============================================================
  // Event: message:read
  // عند قراءة الرسائل
  // payload: { conversationId, userId }
  // ============================================================
  socket.on("message:read", (payload: { conversationId: string; userId: string }) => {
    if (!payload?.conversationId) return;
    socket.to(`conv:${payload.conversationId}`).emit("message:read", {
      conversationId: payload.conversationId,
      userId: payload.userId,
    });
  });

  // ============================================================
  // Event: typing:start / typing:stop
  // ============================================================
  socket.on("typing:start", (payload: { conversationId: string; userId: string; name: string }) => {
    if (!payload?.conversationId) return;
    socket.to(`conv:${payload.conversationId}`).emit("typing:start", payload);
  });

  socket.on("typing:stop", (payload: { conversationId: string; userId: string }) => {
    if (!payload?.conversationId) return;
    socket.to(`conv:${payload.conversationId}`).emit("typing:stop", payload);
  });

  // ============================================================
  // Event: conversation:created
  // إشعار بإنشاء محادثة جديدة (للأدمن)
  // ============================================================
  socket.on("conversation:created", (payload: { conversation: unknown; userId: string }) => {
    // Notify all admins
    onlineUsers.forEach((info) => {
      if (info.role === "admin") {
        info.socket.emit("conversation:created", payload);
      }
    });
  });

  // ============================================================
  // Disconnect
  // ============================================================
  socket.on("disconnect", () => {
    const userInfo = onlineUsers.get(socket.id);
    if (userInfo) {
      console.log(`User offline: ${userInfo.userId}`);
      // Notify admins
      if (userInfo.role !== "admin") {
        onlineUsers.forEach((info) => {
          if (info.role === "admin") {
            info.socket.emit("user:offline", { userId: userInfo.userId });
          }
        });
      }
    }
    setUserOffline(socket);
    console.log(`[${new Date().toISOString()}] Client disconnected: ${socket.id}`);
  });
});

// ============================================================
// Types
// ============================================================
interface MessagePayload {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  type: string;
  createdAt: string;
}

// ============================================================
// Start server
// ============================================================
httpServer.listen(PORT, () => {
  console.log(`🚀 NEXUS Chat WebSocket Service running on port ${PORT}`);
  console.log(`📡 Ready to accept connections via Caddy gateway`);
});

export { httpServer, io };
