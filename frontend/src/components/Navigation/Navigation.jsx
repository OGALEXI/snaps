import './Navigation.css'
// import { NavLink } from "react-router-dom";
// import { useRef } from "react";
// import { logout } from '../../store/session';
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";


function Navigation() {
    //const currentUser = useSelector(state => state.session.user);

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

export default Navigation
