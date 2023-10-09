import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { loadPostDetails } from "../../store/posts";
import { getAllUsers } from "../../store/session";
import './PostPage.css'
import likeHeart from '../../assets/empty_heart.png';
import Comment from "./Comments";
import { fetchPostComments, createComment } from "../../store/comments";

function PostPage() {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const post = useSelector((state) => state?.posts[postId]);
    const user = useSelector((state) => state?.session.users[post?.user_id])
    const postComments = useSelector((state) => state.comments[postId]);
    const [comment, setComment] = useState('');

    console.log(postId)

    const addComment = async (e) => {
        e.preventDefault();
        const data = await dispatch(
            createComment(comment, postId)
        );
        if (data.errors) {
            return console.log('An error has occurred: ', data.errors)
        } else {
            await dispatch(fetchPostComments(postId));
            return setComment('')
        }
    }

    useEffect(() => {
        dispatch(loadPostDetails(postId));
         dispatch(fetchPostComments(postId))
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
                        {postComments?.map((comment) => (
                            <div key={comment.id}>
                                <Comment comment={comment} />
                            </div>
                        ))}
                        <form onSubmit={addComment} id='add-comment-form'>
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                placeholder='Add a comment...'
                            />
                            <button type="submit">Post</button>
                        </form>
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