import React from "react"; 
import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import './UserProfile.css'
import UserPosts from "./UserPosts";
import defaultAvatar from '../../assets/default_avatar.png';

function UserProfile() {
    const user = useSelector((state) => state.session.user);

    if (!user) return <Redirect to="/" />;

    return (
        <>
            <div id="user-profile-info">
                <aside id="user-avatar-username">
                    <div id="user-profile-avatar">
                        {user.avatar ? (
                            <img src={user.avatar} id="profile-avatar-img"></img>
                        ) : (
                            <img src={defaultAvatar} id="profile-default-avatar"></img>
                        )}
                    </div>
                    <p>@{user.username}</p>
                </aside>
                <section id="user-name-stats">
                    <div className="user-profile-info">
                        <h1 id="user-profile-full-name">{user.firstname} {user.lastname}</h1>
                    </div>
                    <ul className="user-profile-info" id="user-num-stats">
                        <li className="user-num-of">
                            <h2 className="nummy">{user.number_of_posts}</h2>
                            <p>Posts</p>
                        </li>
                        <li className="user-num-of">
                            <h2 className="nummy">{user.number_of_followers}</h2>
                            <p>Followers</p>
                        </li>
                        <li className="user-num-of">
                            <h2 className="nummy">{user.number_of_following}</h2>
                            <p>Following</p>
                        </li>
                    </ul>
                    <div className="user-profile-info">{user.bio}</div>
                </section>
                <aside id="user-edit-profile">
                    <NavLink to="/profile/edit"><span className="material-symbols-outlined">edit</span></NavLink>
                    <NavLink to="/posts/new"><span className="material-symbols-outlined">add_circle</span></NavLink>
                </aside>
            </div>
            <footer id="user-profile-posts-section">
                <UserPosts user={user} />
            </footer>
        </>
    )
}

export default UserProfile