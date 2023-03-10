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
            <div >
                {currentTask ? (
                    <div className=" container text-left">
                        <div className=" row align-items-start">
                            <div className=" col-md-4">

                                <h4>Details: </h4>
                                <div className="task-description">
                                    <p>Title: {currentTask.title}</p>
                                    <p>Current status: {currentTask.status}</p>
                                    <p>Priority: {currentTask.priority}</p>
                                </div>

                                <h4>Description: </h4>
                                <div className="task-description">
                                    <p>{currentTask.description}</p>
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
                            </div>
                            <div className="col-md-4">
                                <h4>Time frames: </h4>
                                <div className="task-description">
                                    <p>Count hours for task: {currentTask.hours}</p>
                                    <p>Time start: {currentTask.actualStartDate}</p>
                                    <p>Time end: {currentTask.actualEndDate}</p>
                                </div>
                                <h4>Tags: </h4>
                                <div className="tag">
                                    <ul >
                                        {currentTask.tags && currentTask.tags.map((tag, i) => {
                                            return (
                                                <li key={i}
                                                    style={{ color: tag.color }}
                                                    className=" mb-2 ">
                                                    {tag.name}
                                                </li>)
                                        })}
                                    </ul>
                                    {/* nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 nav-link px-2  */}
                                </div>

                            </div>
                            <div className=" col-md-4">
                            <h4>People: </h4>
                                <div className="task-description">
                                    <p>This task assigned: </p>
                                    
                                </div>

                            </div>
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
            </div>

            <h3>Comments</h3>
            <div class=" border-bottom"></div>


        </div>
    );
};

export default Task;
