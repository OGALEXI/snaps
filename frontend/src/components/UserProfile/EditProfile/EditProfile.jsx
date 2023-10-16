import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import defaultAvatar from '../../../assets/default_avatar.png';
import './EditProfile.css'
import { editUser } from "../../../store/session";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function EditProfile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [avatar, setAvatar] = useState(user.avatar);
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [bio, setBio] = useState(user.bio);

    if (!user) return <Redirect to="/" />;

    function editProfilePic(e) {
        setAvatar(URL.createObjectURL(e.target.files[0]));
    }

    function editBio(e) {
        if (e.target.value) {
            setBio(e.target.value)
        } else {
            return;
        }
    }

    const submitEditUser = async (e) => {
        e.preventDefault();
        const data = await dispatch(editUser(user.id, firstname, lastname, avatar, bio))
        if (data) {
            return console.log("Error", data)
        }
        return alert('Profile successfully edited!')
    }

    return (
        <>  
            <div id="edit-prof-title-arrow">
                <NavLink to='/profile'><span class="material-symbols-outlined">arrow_back</span></NavLink>
                <h1 id="edit-profile-h1">Edit Profile</h1>
            </div>
            <section id="edit-prof-lower-page">
                <div id="edit-prof-info-box">
                    <h2>@{user.username}</h2>
                    <div id="avatar-and-update-prompt">
                        {user.avatar ? (
                            <img src={user.avatar} id="profile-avatar-img"></img>
                        ) : (
                            <img src={defaultAvatar} id="profile-default-avatar"></img>
                        )}
                        <label id="edit-prof-pic">
                            <input type="file" id="edit-prof-pic-input" onChange={editProfilePic}/>
                            Update Profile Picture
                        </label>
                    </div>
                    <div id="firstandlastboxes">
                        <input
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                            placeholder={user.firstname}
                            className="firstlastinput"
                        />
                        <input
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                            placeholder={user.lastname}
                            className="firstlastinput"
                        />
                    </div>
                    <footer id="bio-and-prompt">
                        <h3>EDIT BIO:</h3>
                        <textarea onChange={editBio} id="bio-input-box">{user.bio}</textarea>
                    </footer>
                    <button onClick={submitEditUser} id="edit-user-prof-sub-btn">Submit</button>
                </div>
            </section>
        </>
    )
}

export default EditProfile;