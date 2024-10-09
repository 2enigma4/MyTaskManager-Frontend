import React, { useEffect, useState } from 'react';
import { getAllTasks, deleteTask } from '../services/taskService';
import './TaskList.css'; // Import the CSS file

const TaskList = ({ onEdit }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            let data = await getAllTasks();
            data = data.map(i=>{
                let uniqKey = i.id + `-` + i.title + `-` + i.description;
                console.log(uniqKey)
                return {uniqKey,...i};
            })
            console.log(data);
            setTasks(data);
        };
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id)); // Update the list
        window.alert("Task is sucessfully deleted!!")
    };

    return (
        <div className="task-list-container">
            <h2>Task List</h2>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length === 0 ? (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center' }}>
                                No tasks available.
                            </td>
                        </tr>
                    ) : (
                        tasks.map(task => (
                            <tr key={task.uniqKey}> {/* Ensure unique key here */}
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>
                                    <button onClick={() => onEdit(task)}>Edit</button>
                                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default TaskList;
