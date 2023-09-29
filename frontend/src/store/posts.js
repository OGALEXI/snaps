const SET_ALL_POSTS = 'posts/SET_ALL_POSTS';

const setAllPosts = (posts) => ({
  type: SET_ALL_POSTS,
  payload: posts,
});

export const fetchAllPosts = () => async (dispatch) => {
  try {
    const res = await fetch(`/posts/`);

    if (res.ok) {
      const data = await res.json();
      dispatch(setAllPosts(data));
    }
  } catch (err) {
    console.err('An error occurred, please try again.');
  }
};

const initialState = {
  posts: null,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
  }
}
