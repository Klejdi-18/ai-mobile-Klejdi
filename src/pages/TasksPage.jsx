import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all | completed | active

  // FETCH ALL TASKS
  const fetchTasks = async (appliedFilter = filter) => {
    try {
      setError(null);
      let query = supabase.from("tasks").select("*");
      // apply filter
      if (appliedFilter === "completed") query = query.eq("is_done", true);
      else if (appliedFilter === "active") query = query.eq("is_done", false);

      const { data, error } = await query.order("inserted_at", { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch tasks");
    }
  };

  // ADD NEW TASK (optimistic: append returned row)
  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      setLoading(true);
      setError(null);

      // request inserted row back with .select()
      const { data, error } = await supabase
        .from("tasks")
        .insert([{ title: newTask, is_done: false }])
        .select();

      if (error) throw error;

      // append the returned row(s) (usually single)
      if (data && data.length) {
        // if current filter would include the new task, append; otherwise refetch
        const newRow = data[0];
        const shouldShow = filter === "all" || (filter === "active" && !newRow.is_done) || (filter === "completed" && newRow.is_done);
        if (shouldShow) setTasks((prev) => [newRow, ...prev]);
        else fetchTasks();
      } else {
        // fallback to re-fetch
        fetchTasks();
      }
      setNewTask("");
    } catch (err) {
      setError(err.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  // MARK AS DONE/UNDONE
  const toggleDone = async (id, is_done) => {
    try {
      setError(null);
      setLoading(true);
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_done: !is_done })
        .eq("id", id)
        .select();

      if (error) throw error;

      // after change, refetch to respect current filter
      await fetchTasks();
    } catch (err) {
      setError(err.message || "Failed to update task");
    }
    finally {
      setLoading(false);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    if (!confirm || typeof confirm !== "function") {
      // fallback - browser confirm
      if (!window.confirm("Delete this task?")) return;
    } else {
      if (!confirm("Delete this task?")) return;
    }

    try {
      setError(null);
      setLoading(true);
      const { data, error } = await supabase.from("tasks").delete().eq("id", id).select();
      if (error) {
        console.error('Delete error:', error);
        throw error;
      }
      // remove from local list
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('DeleteTask failed', err);
      setError(err.message || "Failed to delete task");
      // show a visible alert so user notices RLS/permission issues
      if (err && err.message) window.alert(`Delete failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: 800, margin: "0 auto" }}>
      <h1>Tasks</h1>

      {error && (
        <div style={{ color: "#b91c1c", marginBottom: 12 }}>{error}</div>
      )}

      <div style={{ display: "flex", gap: "10px", marginBottom: "12px", alignItems: "center" }}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Write your task..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTask} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
        <div style={{ marginLeft: 12 }}>
          <button
            onClick={() => { setFilter("all"); fetchTasks("all"); }}
            style={{ marginRight: 6, fontWeight: filter === "all" ? "600" : "400" }}
          >
            All
          </button>
          <button
            onClick={() => { setFilter("active"); fetchTasks("active"); }}
            style={{ marginRight: 6, fontWeight: filter === "active" ? "600" : "400" }}
          >
            Active
          </button>
          <button
            onClick={() => { setFilter("completed"); fetchTasks("completed"); }}
            style={{ fontWeight: filter === "completed" ? "600" : "400" }}
          >
            Completed
          </button>
        </div>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.length === 0 && <li style={{ color: "#6b7280" }}>No tasks yet</li>}
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: "10px",
              padding: "8px",
              borderRadius: 6,
              background: "#f9fafb",
            }}
          >
            <input
              type="checkbox"
              checked={task.is_done}
              onChange={() => toggleDone(task.id, task.is_done)}
            />
            <div style={{ flex: 1, cursor: "pointer" }} onClick={() => toggleDone(task.id, task.is_done)}>
              <div style={{ textDecoration: task.is_done ? "line-through" : "none" }}>{task.title}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>{new Date(task.inserted_at).toLocaleString()}</div>
            </div>
            <button onClick={() => deleteTask(task.id)} style={{ color: "#ef4444" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksPage;
