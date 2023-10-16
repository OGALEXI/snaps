import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserPosts } from "../../store/userPosts";
import { NavLink } from "react-router-dom";
import './UserPosts.css';

function UserPosts({ user }) {
    const dispatch = useDispatch();
    const postsData = useSelector((state) => state.userPosts.user_posts);
    const userPosts = postsData ? Object.values(postsData.posts) : [];

    useEffect(() => {
        dispatch(fetchUserPosts(user.id))
    }, [dispatch, user.id])

    console.log(userPosts)

    return (
        <>
        {userPosts.length ? userPosts.map((post) => (
            <NavLink to={`/posts/${post.id}`} className="post-box">
                <img src={post.content} className="post-img"></img>
            </NavLink>
        )) : (
            <h1 id="no-posts-yet">No Posts Yet.</h1>
        )}
        </>
    )
}

export default UserPosts;