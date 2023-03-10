import React, { useState, useEffect } from "react";
import TaskService from "../../services/TaskService";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const TasksList = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTasks(items);
    }

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
                        onChange={onChangeSearchTitle} />

                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}>
                            Search
                        </button>
                    </div>
                </div>

            </div>

            <div className="col-md-6">
                <h4>Tasks List</h4>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="tasks" >
                        {(provided) => (
                            <ul className="list-group tasks" {...provided.droppableProps} ref={provided.innerRef}>
                                {tasks && tasks.map((task, index) => {
                                    return (
                                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                            {(provided) => (
                                                <li className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    onClick={() => setActiveTask(task, index)}>

                                                    <div className="task-card card mb-3" >
                                                        <div className="card-header">{task.title}</div>
                                                        <div className="card-body">
                                                            <p className="card-text">{task.description}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>               

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllTasks}>
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

                    </div>
                )}
            </div>
        </div>
    );
};

export default TasksList;
