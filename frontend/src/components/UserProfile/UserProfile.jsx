import React from "react"; 
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
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
                            <h1>AVATAR1</h1>
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
                    <div className="user-profile-info"> BIO</div>
                </section>
                <aside id="user-edit-profile">
                    <button className="edit-add-profile-btns"><span className="material-symbols-outlined">edit</span></button>
                    <button className="edit-add-profile-btns"><span className="material-symbols-outlined">add_circle</span></button>
                </aside>
            </div>
            <footer id="user-profile-posts-section">
                <UserPosts user={user} />
            </footer>
        </>
    )
}

export default UserProfile