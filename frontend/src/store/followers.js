const SET_FOLLOWERS = '/followers/SET_FOLLOWERS';
const CREATE_FOLLOWER = '/followers/CREATE_FOLLOWER';
const DELETE_FOLLOWER = '/followers/DELETE_FOLLOWER';

const setFollowers = (followers) => ({
  type: SET_FOLLOWERS,
  payload: followers,
});

const addFollower = (follower) => ({
  type: CREATE_FOLLOWER,
  payload: follower,
});

const removeFollower = (userId, followerId) => ({
  type: DELETE_FOLLOWER,
  payload: {
    userId,
    followerId,
  },
});

export const fetchUserFollowers = (userId) => async (dispatch) => {
  const res = await fetch(`/followers/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setFollowers(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const createNewFollower = (userId) => async (dispatch) => {
  const res = await fetch(`/followers/new/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addFollower(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteFollow = (userId, followerId) => async (dispatch) => {
  const res = await fetch(`/followers/${followerId}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    dispatch(removeFollower(userId, followerId));
  } else {
    const errors = await res.json();
    return errors;
  }
};

export default function followerReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_FOLLOWERS:
      const userFollowers = action.payload.followers;
      if (userFollowers.length) {
        newState[userFollowers[0].user_id] = userFollowers;
      }
      return newState;
    case CREATE_FOLLOWER:
      const follower = action.payload;
      console.log('STOREEE', follower);
      const userId = follower.user_id;
      if (!newState[userId]) {
        newState[userId] = [];
      }
      newState[userId].push(follower);
      return newState;
    case DELETE_FOLLOWER:
      const followerId = action.payload.followerId;
      const followedId = action.payload.userId;
      newState[followedId].filter(
        (follower) => follower.follower_id !== followerId
      );
      return newState;
    default:
      return state;
  }
}
