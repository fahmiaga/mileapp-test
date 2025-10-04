const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const taskData = require("../data/tasks");

router.use(auth);

// GET /tasks
router.get("/", (req, res) => {
  const {
    status,
    search,
    sort = "created_at:desc",
    page = 1,
    limit = 10
  } = req.query;

  let tasks = [...taskData.getAll()];

  // filter by status
  if (status) {
    tasks = tasks.filter(t => t.status === status);
  }

  // filter by keyword (title or description)
  if (search) {
    const keyword = search.toLowerCase();
    tasks = tasks.filter(
      t =>
        (t.title && t.title.toLowerCase().includes(keyword)) ||
        (t.description && t.description.toLowerCase().includes(keyword))
    );
  }

  // sort
  const [sortField, sortOrder] = sort.split(":");
  tasks.sort((a, b) => {
    if (typeof a[sortField] === "string") {
      return sortOrder === "desc"
        ? b[sortField].localeCompare(a[sortField])
        : a[sortField].localeCompare(b[sortField]);
    } else {
      return sortOrder === "desc"
        ? b[sortField] - a[sortField]
        : a[sortField] - b[sortField];
    }
  });

  // pagination
  const pageNum = parseInt(page);
  const pageSize = parseInt(limit);

  const start = (pageNum - 1) * pageSize;
  const paginated = tasks.slice(start, start + pageSize);

  const total = tasks.length;
  const totalPages = Math.ceil(total / pageSize);

  res.json({
    data: paginated,
    meta: {
      total,
      page: pageNum,
      limit: pageSize,
      count: paginated.length,
      totalPages
    }
  });
});




// POST /tasks
router.post("/", (req, res) => {
  const { title, status, description } = req.body;

  if (!title || !status || !description) {
    return res.status(400).json({ error: "Title , description,  and status required" });
  }

  const tasks = taskData.getAll();
  const newTask = { id: Date.now(), title, status, description, created_at: new Date() };
  tasks.push(newTask);
  taskData.setAll(tasks);

  res.status(201).json(newTask);
});

// PUT /tasks/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, status } = req.body;

  const tasks = taskData.getAll();
  const idx = tasks.findIndex(t => t.id === id);

  if (idx === -1) return res.status(404).json({ error: "Task not found" });

  if (title) tasks[idx].title = title;
  if (status) tasks[idx].status = status;

  taskData.setAll(tasks);
  res.json(tasks[idx]);
});

// DELETE /tasks/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const tasks = taskData.getAll();
  const newTasks = tasks.filter(t => t.id !== id);

  if (newTasks.length === tasks.length) {
    return res.status(404).json({ error: "Task not found" });
  }

  taskData.setAll(newTasks);
  res.status(204).send();
});

module.exports = router;
