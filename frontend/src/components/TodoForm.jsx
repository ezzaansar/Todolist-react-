import { useEffect, useState } from "react";
import TodoListItem from "./TodoListItem";

function TodoForm() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: task }),
    })
      .then(() => setTask(""))
      .then(() => loadTodos())
      .catch((e) => console.log(e));
  };

  const loadTodos = () => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setTodos(data.tasks))
      .catch((e) => console.log(e));
  };

  const onDeleteClick = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" })
      .then(() => loadTodos())
      .catch((e) => console.log(e));
  };

  const onEditClick = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const onSaveClick = async (id) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: editText }),
      });

      // Update UI immediately
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, description: editText } : t))
      );

      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error("Failed to update todo", err);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6">
          Todo List
        </h1>

        {/* Todo Form */}
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Add
          </button>
        </form>

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoListItem
              key={todo.id}
              id={todo.id}
              text={todo.description}
              isEditing={editingId === todo.id}
              editText={editText}
              onEdit={() => onEditClick(todo.id, todo.description)}
              onChangeEditText={setEditText}
              onSave={() => onSaveClick(todo.id)}
              onDelete={() => onDeleteClick(todo.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoForm;
