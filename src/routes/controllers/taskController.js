const tasks = require("../../db/mockDb");

const renderTask = (req, res) => {
  res.render("layout", { title: "Home Page", tasks });
};

const createTask = (req, res) => {
  const { title, description } = req.body;

  const task = {
    id: tasks.length + 1,
    title,
    description,
    creationDate: new Date().toISOString(),
    endDate: null,
    done: false,
  };

  tasks.push(task);
  res.redirect("/");
};

const deleteTask = (req, res) => {
  const id = req.params.id;
  // Modifica el contenido del array sin reasignar la variable.
  tasks.splice(tasks.findIndex((task) => task.id === id));
  res.redirect("/");
};

const markTaskAsDone = (req, res) => {
  const id = parseInt(req.params.id); // Convert ID to number
  const done = req.body.done === "true"; // Convert body value to boolean

  const task = tasks.find((task) => task.id === id);

  if (task) {
    task.done = done;

    // Optionally, send a response indicating success
    res.json({ success: true, task });
  } else {
    // Handle case where task is not found
    res.status(404).json({ success: false, message: "Task not found" });
  }
};

module.exports = {
  renderTask,
  createTask,
  deleteTask,
  markTaskAsDone,
};
