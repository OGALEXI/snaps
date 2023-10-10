const SET_POST = 'posts/SET_POST';
const DELETE_POST = 'posts/DELETE_POST';

const loadPost = (post) => ({
  type: SET_POST,
  payload: post,
});

const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId,
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

export const deletePostThunk = (postId) => async (dispatch) => {
  const res = await fetch(`/posts/${postId}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    dispatch(deletePost(postId));
  } else {
    const errors = await res.json();
    return errors;
  }
};

export default function postReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_POST:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_POST:
      const deletedPostId = action.payload;
      newState.posts.filter((post) => post.id !== deletedPostId);
      return newState;
    default:
      return state;
  }
}
