import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPostComments } from '../../store/comments';
import Comment from './Comments';

function PostComments({ postId }) {
    const dispatch = useDispatch();
    const commentsData = useSelector((state) => state.comments.post_comments);
    const postComments = commentsData ? Object.values(commentsData.comments) : [];
    console.log("COMMENTSS",postComments)

    useEffect(() => {
        dispatch(fetchPostComments(postId))
    }, [dispatch, postId])

    return (
        <>
            {postComments?.map((comment) => (
                <div key={comment.id}>
                    <Comment comment={comment} />
                </div>
            ))}
        </>
    );
}

export default PostComments;