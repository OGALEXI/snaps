import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { loadPostDetails } from "../../store/posts";
import { getAllUsers } from "../../store/session";
import './PostPage.css'
import likeHeart from '../../assets/empty_heart.png';
//import filledHeart from '../../assets/filled_heart.png'; TODO
import Comment from "./Comments";
import { fetchPostComments, createComment } from "../../store/comments";
import { deletePostThunk } from "../../store/posts";


function PostPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { postId } = useParams();
    const currUser = useSelector((state) => state.session.user);
    const post = useSelector((state) => state?.posts[postId]);
    const postOwner = useSelector((state) => state?.session.users[post?.user_id])
    const postComments = useSelector((state) => state.comments[postId]);
    const [comment, setComment] = useState('');
    let userOrOwner = false;

    if (currUser?.username === postOwner?.username) {
        userOrOwner = true;
    }

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

    const handleDelete = async (e) => {
        e.preventDefault();
        const res = await dispatch(deletePostThunk(postId))
        if (res) {
            console.log('Error', res)
        }
        history.push('/profile')
    }

    useEffect(() => {
        dispatch(loadPostDetails(postId));
         dispatch(fetchPostComments(postId))
        dispatch(getAllUsers());
    }, [dispatch, postId])

    return (
        <>
            {postOwner && post && (
                <div id="post-page-outer">
                    <section id="pp-post-and-comments">
                        <div id="pp-post-container">
                        <img src={post.content} id="post-page-img"  alt="avatar"></img>
                        <div>
                            <button id="pp-heart-like"><img src={likeHeart}  alt="avatar"></img></button>
                        </div>
                        <div className="pp-post-details">
                            <p id="pp-post-likes">{post.number_of_reactions ? (<p>{post.number_of_reactions} Likes</p>) : (<p>0 Likes</p>)}</p>
                        </div>
                        <div id="pp-username-and-caption" className="pp-post-details">
                            <h3>@{postOwner.username}</h3>
                            <p>{post.caption}</p>
                        </div>
                        {userOrOwner && <button onClick={handleDelete} id="user-pp-delete-btn">DELETE</button>}
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
                                id="add-comment-input"
                            />
                            <button type="submit" id="add-comment-btn">Post</button>
                        </form>
                    </aside>
                    </section>
                </div>
            )}
        </>
    )
}

export default PostPage;