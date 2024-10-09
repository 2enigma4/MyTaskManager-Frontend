import React, { useState, useEffect } from 'react';
import TaskList from './Components/TaskList';
import TaskForm from './Components/TaskForm';
import { getAllTasks } from './services/taskService';

const App = () => {
    const [currentTask, setCurrentTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const fetchTasks = async () => {
        const data = await getAllTasks();
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleEdit = (task) => {
      console.log("Fetching tasks after edit...");
        setCurrentTask(task);
    };

    const handleSave = () => {
      console.log("Fetching tasks after save...");
        setCurrentTask(null);
        fetchTasks(); // Refresh the task list after save
        window.location.reload(); 
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <TaskForm currentTask={currentTask} onSave={handleSave} />
            <TaskList tasks={tasks} onEdit={handleEdit} />
        </div>
    );
};

export default App;
