import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserFeed from './UserFeed/UserFeed';
import LandingPage from './LandingPage';

function UserStuff() {
  const user = useSelector((state) => state.session.user);

  return (
    <ul>
      {user ? (
        <UserFeed />
      ) : (
        <LandingPage />
      )}
    </ul>
  );
}

export default UserStuff;