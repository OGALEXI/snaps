const setAllUserPosts = (userPosts) => ({
  type: SET_ALL_USER_POSTS,
  payload: userPosts,
});

export const fetchUserPosts = (userId) => async (dispatch) => {
  try {
    const res = await fetch(`/posts/browse/${userId}`);

    if (res.ok) {
      const data = await res.json();
      dispatch(setAllUserPosts(data));
    }
  } catch (err) {
    console.error('An error occurred, please try again.');
  }
};

const initialState = {
  userPosts: null,
};

export default function userPostsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_USER_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
  }
}
