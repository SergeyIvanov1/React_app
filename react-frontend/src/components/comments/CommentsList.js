import React, { useState, useEffect } from "react";
import CommentService from "../../services/CommentService";

const CommentsList = ({ id, comments }) => {

    const initialServerObjectState = {
        text: '',
        taskId: id,
        username: 'Sergey',
        comments: comments,
        //   published  : false
    }

    const [serverObject, setServerObject] = useState(initialServerObjectState)

    const handleServerObjectInputChange = event => {
        const { name, value } = event.target
        setServerObject({ ...serverObject, [name]: value })
    }

    const saveServerObject = () => {
        const data = {
            text: serverObject.text,
            taskId: serverObject.taskId,
            username: serverObject.username,
            comments: serverObject.comments
        }

        // функция для получения Task состояния и отправки запроса POST в веб-API
        CommentService.create(data)
            .then(response => {
                setServerObject(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div >
            <div className="container margin-30">
                <form >
                    <label htmlFor="exampleFormControlTextarea1">New comment</label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        name="text"
                        value={serverObject.text}
                        onChange={handleServerObjectInputChange}
                        placeholder="Input text"
                        required>
                    </textarea>
                    <button
                        onClick={saveServerObject}
                        className="comment-button">
                        Send
                    </button>
                </form>
            </div>

            {serverObject.comments ? (
                <div className="container margin-30">

                    {serverObject.comments && serverObject.comments.map((comment, i) => {
                        return (
                            <div key={i}
                                // style={{ color: tag.color }}
                                className="container margin-30">
                                <div className="container text-left border">
                                    <div className="row">

                                        <div className="avatar-comment border">
                                            <img
                                                src={require('../../images/defaultAvatar.png')}
                                                className="img-fluid avatar"
                                                alt="" />
                                        </div>
                                        <div className="col-md-11">
                                        <div className="border comment-text">
                                            {/* {comment.user.username} */}
                                            {comment.updateAt}
                                        </div>

                                        
                                            <div className="col-md-11 border comment-text">
                                                {comment.text}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>) : (
                <div className="container margin-30">
                    <p>No one has left comments here yet...</p>
                </div>
            )}
        </div>
    );
};

export default CommentsList;
