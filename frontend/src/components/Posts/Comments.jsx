import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/session";
import './Comments.css';


function Comment({ comment }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.session.users[comment?.user_id])

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    return (
        <div id="pp-comment-container">
            <h3>@{user?.username}</h3>
            <p>{comment.content}</p>
        </div>
    );
}

export default Comment;