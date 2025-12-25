const Notification = require("../models/Notification");
const { getIO, emitToUser } = require("../config/socket"); // ✅ ADD THIS

const notify = async ({ user, type, message, metadata }) => {
  const notification = await Notification.create({
    user,
    type,
    message,
    metadata,
  });

  try {
    emitToUser(user, "notification:new", notification);
  } catch (e) {
    console.log("Socket emit skipped:", e.message);
  }

  return notification;
};

module.exports = notify;
