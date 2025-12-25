const Project = require("../models/Project");
const generateCode = require("../utils/generateCode");
const notify = require("../utils/notify");

exports.createProject = async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.create({
    name,
    description,
    leader: req.user._id,
    members: [req.user._id],
    code: generateCode(),
  });

  res.status(201).json(project);
};

exports.requestJoin = async (req, res) => {
  const { code } = req.body;

  const project = await Project.findOne({ code });
  if (!project) {
    return res.status(404).json({ message: "Invalid project code" });
  }

  const alreadyMember = project.members.includes(req.user._id);
  if (alreadyMember) {
    return res.status(400).json({ message: "Already a member" });
  }

  const alreadyRequested = project.joinRequests.some(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (alreadyRequested) {
    return res.status(400).json({ message: "Request already sent" });
  }

  project.joinRequests.push({ user: req.user._id });
  await project.save();
  await notify({
    user: project.leader,
    type: "JOIN_REQUEST",
    message: `${req.user.name} requested to join ${project.name}`,
    metadata: { projectId: project._id },
  });

  res.json({ message: "Join request sent" });
};

// leader only
exports.approveJoin = async (req, res) => {
  const { projectId, userId } = req.body;

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.leader.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Only leader can approve requests" });
  }

  const requestExists = project.joinRequests.some(
    (r) => r.user.toString() === userId
  );

  if (!requestExists) {
    return res.status(400).json({ message: "No such join request" });
  }

  // add member
  project.members.push(userId);

  // remove join request
  project.joinRequests = project.joinRequests.filter(
    (r) => r.user.toString() !== userId
  );

  await project.save();
  await notify({
    user: userId,
    type: "JOIN_APPROVED",
    message: `You were added to ${project.name}`,
    metadata: { projectId: project._id },
  });

  res.json({ message: "Join request approved" });
};

exports.declineJoin = async (req, res) => {
  const { projectId, userId } = req.body;

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.leader.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Only leader can decline requests" });
  }

  const requestExists = project.joinRequests.some(
    (r) => r.user.toString() === userId
  );

  if (!requestExists) {
    return res.status(400).json({ message: "No such join request" });
  }

  project.joinRequests = project.joinRequests.filter(
    (r) => r.user.toString() !== userId
  );

  await project.save();
  await notify({
    user: userId,
    type: "JOIN_APPROVED",
    message: `Your request to join ${project.name} was declined!`,
    metadata: { projectId: project._id },
  });

  res.json({ message: "Join request declined" });
};

exports.leaveProject = async (req, res) => {
  const { projectId } = req.body;

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.leader.toString() === req.user._id.toString()) {
    return res.status(400).json({ message: "Leader cannot leave project" });
  }

  project.members = project.members.filter(
    (id) => id.toString() !== req.user._id.toString()
  );

  await project.save();
  await notify({
    user: project.leader,
    type: "MEMBER_LEFT",
    message: `${req.user.name} left your ${project.name} team`,
    metadata: { projectId: project._id },
  });
  res.json({ message: "Left project successfully" });
};

exports.updateProject = async (req, res) => {
  const { projectId, name, description } = req.body;

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.leader.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  if (name) project.name = name;
  if (description) project.description = description;

  await project.save();
  res.json(project);
};

// get projects
exports.getMyProjects = async (req, res) => {
  const projects = await Project.find({
    $or: [{ leader: req.user._id }, { members: req.user._id }],
  }).populate("leader", "name email");

  res.json(projects);
};

// Remove an existing member
exports.removeMember = async (req, res) => {
  const { projectId, userId } = req.body;

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.leader.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Only leader can remove members" });
  }

  project.members = project.members.filter((id) => id.toString() !== userId);

  await project.save();
  await notify({
    user: userId,
    type: "JOIN_APPROVED",
    message: `You were removed from ${project.name} team by the leader.`,
    metadata: { projectId: project._id },
  });
  res.json({ message: "Member removed" });
};

//! Delete Project
exports.deleteProject = async (req, res) => {
  const { projectId } = req.body;

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.leader.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Only leader can delete project" });
  }

  await project.deleteOne();
  res.json({ message: "Project deleted successfully" });
};

exports.transferLeadership = async (req, res) => {
  const { projectId, newLeaderId } = req.body;

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.leader.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Only leader can transfer ownership" });
  }

  const isMember = project.members.some((id) => id.toString() === newLeaderId);

  if (!isMember) {
    return res
      .status(400)
      .json({ message: "New leader must be a project member" });
  }

  project.leader = newLeaderId;
  await project.save();

  res.json({ message: "Leadership transferred successfully" });
};
