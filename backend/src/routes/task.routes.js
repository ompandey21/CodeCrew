const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const {
  createTask,
  updateTask,
  updateTaskStatus,
  getProjectTasks,
  uploadTaskAttachment,
  deleteTaskAttachment,
  getAttachmentDownloadUrl,
} = require("../controllers/task.controller");
const upload = require("../middleware/upload");

router.post("/", protect, createTask);
router.put("/", protect, updateTask);
router.patch("/status", protect, updateTaskStatus);
router.get("/:projectId", protect, getProjectTasks);
router.post(
  "/:taskId/attachments",
  protect,
  upload.single("file"),
  uploadTaskAttachment
);
router.delete(
  "/:taskId/attachments/:key",
  protect,
  deleteTaskAttachment
);
router.get(
  "/:taskId/attachments/download",
  protect,
  getAttachmentDownloadUrl
);



module.exports = router;
