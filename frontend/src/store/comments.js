const SET_POST_COMMENTS = 'comments/SET_POST_COMMENTS';

const setComments = (comments) => ({
  type: SET_POST_COMMENTS,
  payload: comments,
});

export const fetchPostComments = (postId) => async (dispatch) => {
  try {
    const res = await fetch(`/comments/${postId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(setComments(data));
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

export default function commentReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_POST_COMMENTS:
      const postComments = action.payload;
      newState.post_comments = postComments;
      return newState;
    default:
      return state;
  }
}
