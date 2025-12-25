const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Message = require("../models/Message");
const Project = require("../models/Project");
const notify = require("../utils/notify");

let io;
const onlineUsers = new Map();
const projectRooms = new Map();

const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  // 🔐 SOCKET AUTH MIDDLEWARE
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return next(new Error("Unauthorized"));

      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  // 🔌 CONNECTION HANDLER (THIS IS THE IMPORTANT PART)
  io.on("connection", (socket) => {
    const userId = socket.user._id.toString();
    onlineUsers.set(userId, socket.id);

    console.log(`🔌 ${socket.user.email} connected`);

    // ✅ STEP 1: JOIN PROJECT ROOM
    socket.on("join-project", (projectId) => {
      socket.join(projectId);

      if (!projectRooms.has(projectId)) {
        projectRooms.set(projectId, new Set());
      }

      projectRooms.get(projectId).add(socket.user._id.toString());

      console.log(`💬 ${socket.user.email} joined project ${projectId}`);
    });

    // ✅ STEP 2: SEND MESSAGE
    socket.on("send-message", async ({ projectId, content }) => {
      if (!content?.trim()) return;

      const project = await Project.findById(projectId);
      if (!project) return;

      const isMember = project.members.some(
        (id) => id.toString() === socket.user._id.toString()
      );
      if (!isMember) return;

      const message = await Message.create({
        project: projectId,
        sender: socket.user._id,
        content,
      });

      const activeUsers = projectRooms.get(projectId) || new Set();

      for (const memberId of project.members) {
        const memberIdStr = memberId.toString();

        // skip sender
        if (memberIdStr === socket.user._id.toString()) continue;

        // skip users currently in chat room
        if (activeUsers.has(memberIdStr)) continue;

        await notify({
          user: memberIdStr,
          type: "NEW_MESSAGE",
          message: `New message in ${project.name}`,
          metadata: {
            projectId,
            sender: socket.user.name,
            preview: content.slice(0, 50),
          },
        });
      }

      io.to(projectId).emit("new-message", {
        _id: message._id,
        project: projectId,
        sender: {
          _id: socket.user._id,
          name: socket.user.name,
          email: socket.user.email,
        },
        content: message.content,
        createdAt: message.createdAt,
      });
    });
    socket.on("typing", ({ projectId }) => {
      socket.to(projectId).emit("user-typing", {
        userId: socket.user._id,
        name: socket.user.name,
      });
    });

    socket.on("stop-typing", ({ projectId }) => {
      socket.to(projectId).emit("user-stop-typing", {
        userId: socket.user._id,
      });
    });

    socket.on("disconnect", () => {
      for (const [projectId, users] of projectRooms.entries()) {
        users.delete(socket.user._id.toString());
        if (users.size === 0) {
          projectRooms.delete(projectId);
        }
      }
    });
  });
};

const emitToUser = (userId, event, payload) => {
  const socketId = onlineUsers.get(userId.toString());
  if (socketId && io) {
    io.to(socketId).emit(event, payload);
  }
};

module.exports = { initSocket, emitToUser };
