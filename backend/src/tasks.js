const router = require("express").Router();
const pool = require("./db");

// Get all tasks
router.get("/tasks", async (req, res) => {
  
  // req.params => Path Parameters: /tasks/:id
  // req.query => Query Parameters: /tasks?status=done
  // req.body => Request Data

  const { status } = req.query ?? {};

  try {
    const sql = status ? `SELECT * FROM tasks where status = "${status}"` : "SELECT * FROM tasks" 
    const response = await pool.query(sql);
    res.json({ tasks: response[0] });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get task by id
router.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({error: "Id is required."});
  }

  try {
    const [rows] = await pool.query("select * from tasks where id = ?", [id]);

    if (rows.length == 0) {
      return res.status(404).json({error: "Task not found"});
    }

    return res.json({task: rows[0]});
  } catch (err) {
    res.status(500).json({error: "Internal server error"});
  }
});

// Add a new task
router.post("/tasks", async (req, res) => {
  const { title, description } = req.body ?? {};
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

// Delete task by id
router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: "Task ID is required." })
  }

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

module.exports = router;
