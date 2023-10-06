import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { loadPostDetails } from "../../store/posts";
import { getAllUsers } from "../../store/session";
import './PostPage.css'

function PostPage() {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const post = useSelector((state) => state?.posts[postId]);
    const user = useSelector((state) => state?.session.users[post?.user_id])

    useEffect(() => {
        dispatch(loadPostDetails(postId));
        dispatch(getAllUsers());
    }, [dispatch, postId])

    return (
        <>
            {user && post ? (
                <div id="post-page-outer">
                    <div>
                        <img src={post.content} id="post-page-img"></img>
                        <div>
                            <p>TODO- Number of likes</p>
                        </div>
                        <div id="pp-username-and-caption">
                            <h3>@{user.username}</h3>
                            <p>{post.caption}</p>
                        </div>
                    </div>
                    <p>TODO - Comments</p>
                </div>
            ) : (
                <h2>TODO - LOADING</h2>
            )}
        </>
    )
}

export default PostPage;