import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../store/session';
import './UserStuff.css'

function UserStuff() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();


  const logOut = (e) => {
    e.preventDefault();
    dispatch(logout())
  }

  return (
    <ul>
      {user ? (
        <>
          <div id="user-dropdown">
            <button id="user-dropdown"><span className="material-symbols-outlined">account_circle</span></button>
            <div id="user-content">
              <NavLink to='/' className="user-linkies"><span className="material-symbols-outlined">location_home</span>Profile</NavLink>
              <NavLink to='/login' className="user-linkies"><span className="material-symbols-outlined">notifications</span>Notifications</NavLink>
              <button onClick={logOut} className='user-linkies' id="logout-btn"><span className="material-symbols-outlined">logout</span>Log Out</button>
            </div>
          </div>
        </>
      ) : (
        <div class="login-signup">
            <NavLink to='/login' id="login-btn">Login</NavLink>
            <NavLink to='/signup' id="signup-btn">Signup</NavLink>
        </div>
      )}
    </ul>
  );
}

export default UserStuff;