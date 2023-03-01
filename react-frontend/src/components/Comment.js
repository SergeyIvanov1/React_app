import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import CommentDataService from "../services/CommentService";

const Comment = props => {
    const { id }= useParams();
    let navigate = useNavigate();

    const initialCommentState = {
        id: null,
        title: "",
        description: "",
        published: false
    };
    const [currentComment, setCurrentComment] = useState(initialCommentState);
    const [message, setMessage] = useState("");

    const getComment = id => {
        CommentDataService.get(id)
            .then(response => {
                setCurrentComment(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getComment(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentComment({ ...currentComment, [name]: value });
    };

    const updatePublished = status => {
        var data = {
            id: currentComment.id,
            title: currentComment.title,
            description: currentComment.description,
            published: status
        };

        CommentDataService.update(currentComment.id, data)
            .then(response => {
                setCurrentComment({ ...currentComment, published: status });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateComment = () => {
        CommentDataService.update(currentComment.id, currentComment)
            .then(response => {
                console.log(response.data);
                setMessage("The comment was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteComment = () => {
        CommentDataService.remove(currentComment.id)
            .then(response => {
                console.log(response.data);
                navigate("/comments");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentComment ? (
                <div className="edit-form">
                    <h4>Comment</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentComment.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentComment.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentComment.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentComment.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(true)}
                        >
                            Publish
                        </button>
                    )}

                    <button className="badge badge-danger mr-2" onClick={deleteComment}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateComment}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Comment...</p>
                </div>
            )}
        </div>
    );
};

export default Comment;
