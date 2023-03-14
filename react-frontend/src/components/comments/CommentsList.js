import React, { useState, useEffect } from "react";
import CommentService from "../../services/CommentService";
import { EmojiFrown } from "react-bootstrap-icons";
import { EmojiSmile } from "react-bootstrap-icons";

const CommentsList = ({ id, comments }) => {

    const initialServerObjectState = {
        text: '',
        updateAt: '',
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
            updateAt: serverObject.updateAt,
            text: serverObject.text,
            taskId: serverObject.taskId,
            username: serverObject.username,
            comments: serverObject.comments
        }

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
                        className="form-control field-background"
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
                                className=" margin-30">
                                <div className="  ">
                                    <div className="row">
                                        <div className="avatar-comment ">
                                            <img
                                                src={require('../../images/defaultAvatar.png')}
                                                className="img-fluid avatar"
                                                alt="" />
                                        </div>
                                        <div className="col-md-11">
                                            <div className=" comment-text comment-meta">                                               
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-8  ">
                                                            {comment.username}
                                                        </div>
                                                        {/* <div className="col-md-4  text-left">
                                                        </div> */}
                                                        <div className="col-md-4  ">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-11 border comment-text field-background">
                                                {comment.text}
                                            </div>
                                        </div>
                                        <div className=" ">
                                            <div className="row">
                                                <div className="col " style={{textAlign: 'center', paddingTop: '10px'}}>
                                                    <button className="answer " >Answer</button>
                                                </div>
                                                <div className="col "></div>
                                                <div className="col "></div>
                                                <div className="col comment-meta">
                                                    {comment.updateAt}
                                                </div>

                                                <div className="col ">
                                                    <div className="btn-group-emoji">
                                                        <button
                                                        // onClick={deleteTask}
                                                        >
                                                            <EmojiSmile style={{backgroundColor: 'bisque', borderRadius: '50%'}}/>
                                                        </button>

                                                        <button>33333</button>

                                                        <button className="btn-group-emoji"
                                                        // onClick={deleteTask}
                                                        >
                                                            <EmojiFrown style={{backgroundColor: 'lightpink', borderRadius: '50%'}}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>) : (
                <div className="container margin-30">

                </div>
            )}
        </div>
    );
};

export default CommentsList;
