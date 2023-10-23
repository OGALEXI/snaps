import React, { useEffect } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import '../../UserProfile/UserProfile.css'
import UserPosts from "../../UserProfile/UserPosts";
import defaultAvatar from '../../../assets/default_avatar.png';
import { getAllUsers } from "../../../store/session";
import { fetchUserFollowers, createNewFollower, deleteFollow } from "../../../store/followers";
import './OtherProfiles.css';

function OtherProfiles() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector((state) => state.session.users[userId])
    const currUser = useSelector((state) => state.session.user);
    const followers = useSelector((state) => state.followers[userId]);
    let isFollowing = false;

    const checkIfFollowing = (followers) => {
        followers?.forEach((follower) => {
        if (follower["follower_id"] === currUser?.id) {
            isFollowing = true;
        }
    })
    }

    const updateFollowersCount = async (newNumber, user_id) => {
        const res = await fetch(`/users/${user_id}/followers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newNumber
            }),
        });
        if (res.ok) {
            await dispatch(getAllUsers());
        } else {
            const errors = await res.json();
            return errors;
        }
    }

    const updateFollowingCount = async (newNumber, user_id) => {
        const res = await fetch(`/users/${user_id}/following`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newNumber
            }),
        });
        if (res.ok) {
            await dispatch(getAllUsers());
        } else {
            const errors = await res.json();
            return errors;
        }
    }

    const handleFollow = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createNewFollower(userId))
            await dispatch(fetchUserFollowers(userId))
            let followersNumber = user.number_of_followers + 1;
            let followingNumber = currUser.number_of_following + 1;
            updateFollowingCount(followingNumber, currUser.id)
            updateFollowersCount(followersNumber, user.id);
        } catch (e) {
            console.log('Error', e)
        }
    }

    const handleUnfollow = async (e) => {
        e.preventDefault();
        try {
            await dispatch(deleteFollow(userId, currUser.id))
            await dispatch(fetchUserFollowers(userId))
            let followersNumber = user.number_of_followers - 1;
            let followingNumber = currUser.number_of_following - 1;
            updateFollowingCount(followingNumber, currUser.id)
            updateFollowersCount(followersNumber, user.id);
        } catch (e) {
            console.log('Error', e)
        }
    }

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(fetchUserFollowers(userId))
    }, [dispatch, userId])

    checkIfFollowing(followers);
    return (
        <>
            {user && (
                <>
                    <div id="user-profile-info">
                        <aside id="user-avatar-username">
                            <div id="user-profile-avatar">
                                {user.avatar ? (
                                    <img src={user.avatar} id="profile-avatar-img" alt="avatar"></img>
                                ) : (
                                    <img src={defaultAvatar} id="profile-default-avatar"  alt="avatar"></img>
                                )}
                            </div>
                            <p>@{user.username}</p>
                        </aside>
                        <section id="user-name-stats">
                            <div id="other-follow-unfollow">
                                <h1 id="user-profile-full-name">{user.firstname} {user.lastname}</h1>
                                {isFollowing ? (
                                    <button onClick={handleUnfollow} id="unfollow-btn">Unfollow</button>
                                ) : (
                                    <button onClick={handleFollow} id="follow-btn">Follow</button>
                                )}
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