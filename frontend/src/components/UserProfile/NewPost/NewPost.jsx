import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { createPost } from "../../../store/userPosts";
import { useDispatch } from "react-redux";


function NewPost() {
    const dispatch = useDispatch();
    const [caption, setCaption] = useState('');
    const [content, setContent] = useState(null);

    function editContent(e) {
        setContent(URL.createObjectURL(e.target.files[0]));
    }

    function editCaption(e) {
        if (e.target.value) {
            setCaption(e.target.value)
        } else {
            return;
        }
    }

    const createNewPost = async (e) => {
        e.preventDefault();
        if (content) {
            try {
                await dispatch(createPost(content, caption))
                return <Redirect to='/profile' />
            } catch (error) {
                return console.log('Error', error)
            }
        }
    }

    return (
        <>
            <div>
                <NavLink to='/profile'><span class="material-symbols-outlined">arrow_back</span></NavLink>
                <h1>Create a new post</h1>
            </div>
            <div>TODO-IMG BOX</div>
            <label id="edit-prof-pic">
                <input type="file" id="edit-prof-pic-input" onChange={editContent}/>
                Choose Photo
            </label>
            <textarea onChange={editCaption}>Caption</textarea>
            <button onClick={createNewPost}>POST</button>
        </>
    )
}

export default NewPost;