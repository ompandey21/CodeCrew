const Message = require('../models/Message');
const Project = require('../models/Project');

exports.getProjectMessages = async (req, res) => {
  const { projectId } = req.params;
  const { before, limit = 20 } = req.query;

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const isMember = project.members.some(
    id => id.toString() === req.user._id.toString()
  );

  if (!isMember) {
    return res.status(403).json({ message: 'Not a project member' });
  }

  const query = { project: projectId };

  if (before) {
    query.createdAt = { $lt: new Date(before) };
  }

  const messages = await Message.find(query)
    .populate('sender', 'name email')
    .sort({ createdAt: -1 })
    .limit(Number(limit));

  res.json(messages.reverse()); // oldest → newest
};
