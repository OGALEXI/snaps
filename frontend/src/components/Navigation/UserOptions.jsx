import './Navigation.css'
import React, { useState, useEffect, useRef } from "react";

function UserOptions() {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    return (
        <>
        <nav className="main-nav">
            <span class="material-symbols-outlined">
                view_comfy_alt
            </span>
            <div>
                <button>Login</button>
                <button>Sign</button>
            </div>
        </nav>
        </>
    )
}

export default UserOptions
