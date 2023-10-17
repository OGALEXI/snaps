import React, { useEffect } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import '../../UserProfile/UserProfile.css'
import UserPosts from "../../UserProfile/UserPosts";
import defaultAvatar from '../../../assets/default_avatar.png';
import { getAllUsers } from "../../../store/session";

function OtherProfiles() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector((state) => state.session.users[userId])

    useEffect(() => {
        dispatch(getAllUsers())
    })

    return (
        <>
            {user && (
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
                                <h2>TODO-Following</h2>
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
                    </div>
                    <footer id="user-profile-posts-section">
                        <UserPosts user={user} />
                    </footer>
                </>
            )}
        </>
    )
}

export default OtherProfiles;