const Task = require("../models/Task");
const Project = require("../models/Project");
const notify = require("../utils/notify");
const s3 = require("../config/s3");
const { DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

exports.createTask = async (req, res) => {
  const { projectId, title, description, assignedTo, priority, dueDate } =
    req.body;

  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: "Project not found" });

  const isMember = project.members.some(
    (id) => id.toString() === req.user._id.toString()
  );
  if (!isMember)
    return res.status(403).json({ message: "Not a project member" });

  const task = await Task.create({
    project: projectId,
    title,
    description,
    assignedTo,
    priority,
    dueDate,
    createdBy: req.user._id,
  });

  // notify assignees
  for (const userId of assignedTo || []) {
    await notify({
      user: userId,
      type: "TASK_ASSIGNED",
      message: `You were assigned a task: ${title}`,
      metadata: { projectId, taskId: task._id },
    });
  }

  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const { taskId, title, description, priority, dueDate, assignedTo } =
    req.body;

  const task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (title) task.title = title;
  if (description) task.description = description;
  if (priority) task.priority = priority;
  if (dueDate) task.dueDate = dueDate;
  if (assignedTo) task.assignedTo = assignedTo;

  await task.save();
  res.json(task);
};

exports.updateTaskStatus = async (req, res) => {
  const { taskId, status } = req.body;

  const task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.status = status;
  await task.save();

  res.json({ message: "Task status updated", status });
};

exports.getProjectTasks = async (req, res) => {
  const { projectId } = req.params;

  const tasks = await Task.find({ project: projectId })
    .populate("assignedTo", "name email")
    .sort({ createdAt: -1 });

  res.json(tasks);
};

exports.uploadTaskAttachment = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.attachments.push({
      filename: req.file.originalname,
      url: req.file.location,
      key: req.file.key,
      uploadedBy: req.user._id,
    });

    await task.save();
    const project = await Project.findById(task.project);

    for (const memberId of project.members) {
      const memberIdStr = memberId.toString();

      // skip uploader
      if (memberIdStr === req.user._id.toString()) continue;

      await notify({
        user: memberIdStr,
        type: "TASK_ATTACHMENT_ADDED",
        message: `${req.user.name} added an attachment to task "${task.title}"`,
        metadata: {
          projectId: project._id,
          taskId: task._id,
          filename: req.file.originalname,
        },
      });
    }

    return res.status(201).json({
      message: "Attachment uploaded successfully",
      attachment: task.attachments.at(-1),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteTaskAttachment = async (req, res) => {
  try {
    const { taskId, key } = req.params;

    const decodedKey = decodeURIComponent(key);

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const attachmentIndex = task.attachments.findIndex(
      (a) => a.key === decodedKey
    );

    if (attachmentIndex === -1) {
      return res.status(404).json({ message: "Attachment not found" });
    }

    // 1️⃣ Delete from S3 first
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: decodedKey,
      })
    );

    // 2️⃣ Remove from MongoDB
    task.attachments.splice(attachmentIndex, 1);
    await task.save();
    const project = await Project.findById(task.project);

    for (const memberId of project.members) {
      const memberIdStr = memberId.toString();

      if (memberIdStr === req.user._id.toString()) continue;

      await notify({
        user: memberIdStr,
        type: "TASK_ATTACHMENT_DELETED",
        message: `${req.user.name} deleted an attachment from task "${task.title}"`,
        metadata: {
          projectId: project._id,
          taskId: task._id,
          key: decodedKey,
        },
      });
    }

    return res.json({ message: "Attachment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAttachmentDownloadUrl = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { key } = req.query;

    if (!key) {
      return res.status(400).json({ message: "Missing attachment key" });
    }

    const decodedKey = decodeURIComponent(key);

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const attachmentExists = task.attachments.some(
      (a) => a.key === decodedKey
    );

    if (!attachmentExists) {
      return res.status(404).json({ message: "Attachment not found" });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: decodedKey
    });

    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 60 * 5 // 5 minutes
    });

    return res.json({ url: signedUrl });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
