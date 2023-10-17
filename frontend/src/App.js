import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import { authenticate } from './store/session';
import Navigation from './components/Navigation/Navigation';
import UserProfile from './components/UserProfile/UserProfile';
import Notifications from './components/Notifications/Notifications';
import PostPage from './components/Posts/PostPage';
import EditProfile from './components/UserProfile/EditProfile/EditProfile';
import NewPost from './components/UserProfile/NewPost/NewPost';
import OtherProfiles from './components/HomePage/OtherProfiles/OtherProfiles';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/profile/edit">
            <EditProfile />
          </Route>
          <Route exact path="/profile">
            <UserProfile />
          </Route>
          <Route exact path="/notifications">
            <Notifications />
          </Route>
          <Route exact path="/posts/new">
            <NewPost />
          </Route>
          <Route exact path="/posts/:postId">
            <PostPage />
          </Route>
          <Route exact path="/otherusers/:userId">
            <OtherProfiles />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
