import { useEffect } from 'react';
import './ScrollCard.css';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../../../store/session';
import defaultAvatar from '../../../assets/default_avatar.png';
import { NavLink } from 'react-router-dom';

const ScrollCard = ({ post }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.session.users[post?.user_id])

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <>
            {user && (
                <NavLink  to={`/posts/${post.id}`} id="scroll-card">
                    <div>
                        <header id="scrolly-card-header">
                            <div id="scrolly-avatar-container">
                                {user.avatar ? (
                                    <img src={user.avatar} id="scrolly-avatar-img"></img>
                                ) : (
                                    <img src={defaultAvatar} id="scrolly-default-avatar"></img>
                                )}
                            </div>
                            <p>@{user.username}</p>
                        </header>
                    <div id="scrolly-content-box">
                        <img src={post.content} id="scrolly-content-img"/>
                    </div>
                    <div id="scroll-card-bottom">
                        <h3>{user.username}</h3>
                        <p>{post.caption}</p>
                    </div>
                    </div>
                </NavLink>
            )}
        </>
    );
};
export default ScrollCard;