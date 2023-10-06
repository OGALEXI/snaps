const SET_POST = 'posts/SET_POST';

const loadPost = (post) => ({
  type: SET_POST,
  payload: post,
});

export const loadPostDetails = (postId) => async (dispatch) => {
  try {
    const res = await fetch(`/posts/${postId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(loadPost(data));
      return res;
    } else {
      const errors = await res.json();
      return errors;
    }
  } catch (error) {
    console.log('Error: ', error);
    return error;
  }
};

export default function postReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_POST:
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
}
