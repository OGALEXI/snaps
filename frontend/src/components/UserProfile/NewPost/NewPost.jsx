import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { createPost } from "../../../store/userPosts";
import { useDispatch } from "react-redux";
import './NewPost.css';


function NewPost() {
    const dispatch = useDispatch();
    const [caption, setCaption] = useState('');
    const [content, setContent] = useState(null);

    function editContent(e) {
        setContent(e.target.files[0]);
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
                alert('Post successfully created!')
            } catch (error) {
                return console.log('Error', error)
            }
        }
    }

    return (
        <>
            <div id="link-to-prof-from-newp">
                <NavLink to='/profile'><span class="material-symbols-outlined">arrow_back</span></NavLink>
                <h1>Create a new post</h1>
            </div>
            <section id="new-post-lower-page">
                <div id="create-new-post-container">
                    <div id="new-post-img-box">
                        {content && (
                            <img src={content}  alt="avatar"></img>
                        )}
                    </div>
                    <label id="edit-prof-pic">
                        <input type="file" id="edit-prof-pic-input" onChange={editContent}/>
                        Choose Photo
                    </label>
                    <textarea onChange={editCaption} id="new-post-caption" placeholder="Caption"></textarea>
                    <button onClick={createNewPost} id="newp-create-btn">CREATE POST</button>
                </div>
            </section>
        </>
    )
}

export default NewPost;