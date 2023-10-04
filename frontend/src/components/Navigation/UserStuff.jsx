import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';

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
        <li>Hi, {user.firstname}</li>
        <li>
            <button onClick={logOut}>Log Out</button>
        </li>
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