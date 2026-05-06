import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const API = "http://18.142.108.52:3000";

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!task) return;

    await axios.post(`${API}/tasks`, {
      name: task
    });

    setTask("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>DevOps Task Manager 🚀</h1>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((t) => (
          <div className="task-card" key={t._id}>
            <span>{t.name}</span>

            <button onClick={() => deleteTask(t._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
