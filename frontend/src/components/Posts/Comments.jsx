import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/session";


function Comment({ comment }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.session.users[comment?.user_id])

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    return (
        <>
            <p>@{user?.username}</p>
            <h1>{comment.content}</h1>
        </>
    );
}

export default Comment;