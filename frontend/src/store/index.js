import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import userPostsReducer from './userPosts';
import postReducer from './posts';
import commentReducer from './comments';
import notifReducer from './notifs';
import followerReducer from './followers';

const rootReducer = combineReducers({
  session,
  userPosts: userPostsReducer,
  posts: postReducer,
  comments: commentReducer,
  notifs: notifReducer,
  followers: followerReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
