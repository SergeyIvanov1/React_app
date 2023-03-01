import React, { useState, useEffect } from "react";
import CommentDataService from "../services/CommentService";
import { Link } from "react-router-dom";

const CommentsList = () => {
    const [comments, setComments] = useState([]);
    const [currentComment, setCurrentComment] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveComments();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveComments = () => {
        CommentDataService.getAll()
            .then(response => {
                setComments(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveComments();
        setCurrentComment(null);
        setCurrentIndex(-1);
    };

    const setActiveComment = (comment, index) => {
        setCurrentComment(comment);
        setCurrentIndex(index);
    };

    const removeAllComments = () => {
        CommentDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        CommentDataService.findByTitle(searchTitle)
            .then(response => {
                setComments(response.data);
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
                <h4>Comments List</h4>

                <ul className="list-group">
                    {comments &&
                        comments.map((comment, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveComment(comment, index)}
                                key={index}
                            >
                                {comment.title}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllComments}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentComment ? (
                    <div>
                        <h4>Comment</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentComment.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentComment.description}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentComment.published ? "Published" : "Pending"}
                        </div>

                        <div>Edit</div>
                        <Link
                            to={"/comments/" + currentComment.id}
                            className="badge badge-warning">
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Comment...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentsList;
