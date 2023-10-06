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

    return (
        <>
        {userPosts?.map((post) => (
            <NavLink to={`/posts/${post.id}`} className="post-box">
                <img src={post.content} className="post-img"></img>
            </NavLink>
        ))}
        </>
    )
}

export default UserPosts;