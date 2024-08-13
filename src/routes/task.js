const express = require("express");
const {
  renderTask,
  createTask,
  deleteTask,
  markTaskAsDone,
} = require("./controllers/taskController");
const router = express.Router();

router.get("/", renderTask);
router.post("/add", createTask);
router.delete("/tasks/:id", deleteTask);
router.patch("/tasks/:id/done", markTaskAsDone);

module.exports = router;
