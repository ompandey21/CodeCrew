const Notification = require('../models/Notification');

exports.getMyNotifications = async (req, res) => {
  const notifications = await Notification.find({
    user: req.user._id
  }).sort({ createdAt: -1 });

  res.json(notifications);
};

exports.markAsRead = async (req, res) => {
  const notificationId = req.params.id;

  await Notification.findOneAndUpdate(
    { _id: notificationId, user: req.user._id },
    { isRead: true }
  );

  res.json({ message: 'Notification marked as read' });
};


