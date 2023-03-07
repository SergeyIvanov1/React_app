import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TaskService from "../../services/TaskService";

const Task = props => {

    const { id } = useParams();
    let navigate = useNavigate();

    const initialTaskState = {
        id: null,
        title: "",
        description: "",
        content: "",
        status: "",
        priority: "",
        hours: null
        // published: false
    };

    const [currentTask, setCurrentTask] = useState(initialTaskState);
    const [message, setMessage] = useState("");

    const getTask = id => {
        TaskService.get(id)
            .then(response => {
                setCurrentTask(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    //   useEffect(() => {
    //     getTask(props.match.params.id);
    //   }, [props.match.params.id]);

    useEffect(() => {
        if (id)
            getTask(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentTask({ ...currentTask, [name]: value });
    };

    //   const updatePublished = status => {
    //     var data = {
    //       id: currentTask.id,
    //       title: currentTask.title,
    //       description: currentTask.description,
    //       published: status
    //     };

    //     TaskService.update(currentTask.id, data)
    //       .then(response => {
    //         setCurrentTask({ ...currentTask, published: status });
    //         console.log(response.data);
    //         setMessage("The status was updated successfully!");
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    //   };

    const updateTask = () => {
        TaskService.update(currentTask.id, currentTask)
            .then(response => {
                console.log(response.data);
                setMessage("The Task was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteTask = () => {
        TaskService.remove(currentTask.id)
            .then(response => {
                console.log(response.data);
                navigate("/tasks");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div >
            <div className="list row">
                {currentTask ? (
                    <div className="edit-form">
                        <div className="col-md-12">
                            <h4>Task</h4>

                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={currentTask.title}
                                        onChange={handleInputChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Short description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={currentTask.description}
                                        onChange={handleInputChange} />
                                </div>

                                <button className="adding btn btn-primary"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasScrolling"
                                    aria-controls="offcanvasScrolling">Show content</button>

                                <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Full description content</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body">
                                        <p>{currentTask.content}</p>
                                    </div>
                                </div>

                                {/* <div className="form-group">
                                    <label htmlFor="content">Content</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="content"
                                        name="content"
                                        value={currentTask.content}
                                        onChange={handleInputChange} />
                                </div> */}

                                <div className="form-group">
                                    <label htmlFor="content">Status</label>
                                    <select className="form-select form-select-md" aria-label=".form-select-md example" required>
                                        <option defaultValue>{currentTask.status}</option>
                                        <option value={currentTask.status}>To Do</option>
                                        <option value={currentTask.status}>In progress</option>
                                        <option value={currentTask.status}>Code review</option>
                                        <option value={currentTask.status}>Tests</option>
                                        <option value={currentTask.status}>Done</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="content">Priority</label>
                                    <select className="form-select form-select-md" aria-label=".form-select-md example" required>
                                        <option defaultValue>{currentTask.priority}</option>
                                        <option value={currentTask.priority}>Low</option>
                                        <option value={currentTask.priority}>Medium</option>
                                        <option value={currentTask.priority}>High</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="hours">Hours</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="hours"
                                        name="hours"
                                        value={currentTask.hours}
                                        onChange={handleInputChange} />
                                </div>
                            </form>
                        </div>

                        <button className="adding btn btn-primary" onClick={deleteTask}>
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="adding btn btn-primary"
                            onClick={updateTask}>
                            Update
                        </button>
                        <br />
                        <p>{message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Task...</p>
                    </div>
                )}

                <div className="comments col-md-6">
                    <h4>Comments</h4>
                    <div className="comments-field">


                    </div>

                </div>

            </div>
        </div>
    );
};

export default Task;
