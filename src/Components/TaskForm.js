import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService';
import './TaskForm.css'; // Import the CSS file

const TaskForm = ({ currentTask, onSave }) => {
    const [task, setTask] = useState({ title: '', description: '' });

    useEffect(() => {
        if (currentTask) {
            setTask(currentTask);
        } else {
            setTask({ title: '', description: '' });
        }
    }, [currentTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentTask) {
            await updateTask(currentTask.id, task);
            window.alert("Task is sucessfully updated!!")
        } else {
            const result = await createTask(task);
            window.alert("Task is sucessfully saved!");
        }
        onSave(); // Refresh the task list
    };

    return (
        <div className="task-form-container">
            <h2>{currentTask ? 'Edit Task' : 'Create Task'}</h2>
            <form className="task-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Task Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={task.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Task Description:</label>
                    <textarea
                        name="description"
                        id="description"
                        value={task.description}
                        onChange={handleChange}
                        placeholder="Enter task description"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    {currentTask ? 'Update Task' : 'Create Task'}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
