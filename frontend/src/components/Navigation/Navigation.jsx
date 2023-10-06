import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import UserStuff from './UserStuff/UserStuff';
import './Navigation.css';

function Navigation({ isLoaded }) {
  return (
    <nav className="main-nav">
      <div>
        <NavLink exact to="/"><span className="material-symbols-outlined nav-left-link">view_comfy_alt</span></NavLink>
      </div>
      {isLoaded && <UserStuff />}
    </nav>
  );
}

export default Navigation;
