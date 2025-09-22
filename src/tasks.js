const router = require("express").Router();
const pool = require("./db");

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks");
    res.json({ tasks: rows });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new task
router.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "title and description are required." });
  }

  try {
    const sql = "INSERT INTO tasks (title, description) VALUES (?, ?)";
    const [result] = await pool.query(sql, [title, description]);
    res.status(201).json({ 
      message: "Task created successfully", 
      taskId: result.insertId 
    });
  } catch (err) {
    console.error("Error inserting task:", err);
    res.status(500).json({ error: "Failed to add task." });
  }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully", deletedId: id });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Failed to delete task." });
  }
});

// Get tasks by status
router.get("/tasks/done", async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE status = "done"');
    res.json({ tasks: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/tasks/not-done", async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE status = "not-done"');
    res.json({ tasks: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/tasks/in-progress", async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE status = "in-progress"');
    res.json({ tasks: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
