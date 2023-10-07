import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { loadPostDetails } from "../../store/posts";
import { getAllUsers } from "../../store/session";
import './PostPage.css'
import likeHeart from '../../assets/empty_heart.png';
import PostComments from "./PostComments";

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
                    <section id="pp-post-and-comments">
                        <div id="pp-post-container">
                        <img src={post.content} id="post-page-img"></img>
                        <div>
                            <button id="pp-heart-like"><img src={likeHeart}></img></button>
                        </div>
                        <div className="pp-post-details">
                            <p id="pp-post-likes">TODO- Number of likes</p>
                        </div>
                        <div id="pp-username-and-caption" className="pp-post-details">
                            <h3>@{user.username}</h3>
                            <p>{post.caption}</p>
                        </div>
                    </div>
                    <aside id="pp-comments-container">
                        <PostComments postId={postId}/>
                    </aside>
                    </section>
                </div>
            ) : (
                <h2>TODO - LOADING</h2>
            )}
        </>
    )
}

export default PostPage;