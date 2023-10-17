const SET_POST = 'posts/SET_POST';
const DELETE_POST = 'posts/DELETE_POST';
const NON_USER_POSTS = '/posts/NON_USER_POSTS';
const SET_POST_REACTIONS = '/posts/SET_POST_REACTIONS';

const loadPost = (post) => ({
  type: SET_POST,
  payload: post,
});

const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId,
});

const setNonUserPosts = (posts) => ({
  type: NON_USER_POSTS,
  payload: posts,
});

const setPostReactions = (reactions) => ({
  type: SET_POST_REACTIONS,
  payload: reactions,
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

export const fetchNonUserPosts = () => async (dispatch) => {
  const res = await fetch('/posts/');
  if (res.ok) {
    const data = await res.json();
    dispatch(setNonUserPosts(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const fetchPostReactions = (postId) => async (dispatch) => {
  const res = await fetch(`posts/${postId}/reactions`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setPostReactions(data));
    return data;
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
    case NON_USER_POSTS:
      const posts = action.payload;
      newState = posts;
      return newState;
    default:
      return state;
  }
}
