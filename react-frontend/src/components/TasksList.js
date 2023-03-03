import React, { useState, useEffect } from "react";
import TaskService from "../services/TaskService";
import { Link } from "react-router-dom";

const TasksList = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveTasks();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveTasks = () => {
        TaskService.getAll()
            .then(response => {
                setTasks(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveTasks();
        setCurrentTask(null);
        setCurrentIndex(-1);
    };

    const setActiveTask = (task, index) => {
        setCurrentTask(task);
        setCurrentIndex(index);
    };

    const removeAllTasks = () => {
        TaskService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        TaskService.findByTitle(searchTitle)
            .then(response => {
                setTasks(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Tasks List</h4>

                <ul className="list-group">
                    {tasks &&
                        tasks.map((task, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveTask(task, index)}
                                key={index}
                            >
                                {task.title}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllTasks}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentTask ? (
                    <div>
                        <h4>Task</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentTask.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentTask.description}
                        </div>
                        <div>
                            <label>
                                <strong>Content:</strong>
                            </label>{" "}
                            {currentTask.content}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentTask.status}
                        </div>
                        <div>
                            <label>
                                <strong>Priority:</strong>
                            </label>{" "}
                            {currentTask.priority}
                        </div>
                        <div>
                            <label>
                                <strong>Hours:</strong>
                            </label>{" "}
                            {currentTask.hours}
                        </div>
                        {/* <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentTask.published ? "Published" : "Pending"}
                        </div> */}
                        <div>Edit</div>
                        <Link
                            to={"/tasks/" + currentTask.id}
                            className="badge badge-warning">
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Task...</p>
                        <div className="card text-bg-info mb-3" style={{'max-width': '18rem'}}>
                            <div className="card-header">Header</div>
                            <div className="card-body">
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TasksList;
