const SET_POST_COMMENTS = 'comments/SET_POST_COMMENTS';
const ADD_COMMENT = '/comments/ADD_COMMENT';

const setComments = (comments) => ({
  type: SET_POST_COMMENTS,
  payload: comments,
});

const addCommentAction = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

export const createComment = (content, postId) => async (dispatch) => {
  try {
    const res = await fetch(`/comments/${postId}/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
      }),
    });
    if (res.ok) {
      const newComment = await res.json();
      dispatch(addCommentAction(newComment));
      return newComment;
    }
  } catch (error) {
    console.log('Error', error);
    return error;
  }
};

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
      const postComments = action.payload.comments;
      if (postComments.length) {
        newState[postComments[0].post_id] = postComments;
      }
      return newState;
    case ADD_COMMENT:
      const newComment = action.payload;
      const postId = newComment.post_id;
      if (!newState[postId]) {
        newState[postId] = [];
      }
      newState[postId].push(newComment);
      return newState;
    default:
      return state;
  }
}
