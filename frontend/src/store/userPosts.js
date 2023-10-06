const SET_USER_POSTS = 'userPosts/SET_USER_POSTS';
const CREATE_POST = 'userPosts/CREATE_POST';

const setPosts = (posts) => ({
  type: SET_USER_POSTS,
  payload: posts,
});

const createNewPost = (post) => ({
  type: CREATE_POST,
  payload: post,
});

export const fetchUserPosts = (userId) => async (dispatch) => {
  try {
    const res = await fetch(`/posts/browse/${userId}`);
    if (res.ok) {
      const posts = await res.json();
      dispatch(setPosts(posts));
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

export const createPost = (content, caption) => async (dispatch) => {
  try {
    const res = await fetch('/posts/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        caption,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(createNewPost(data));
      return data;
    } else {
      const errors = await res.json();
      return errors;
    }
  } catch (error) {
    console.log('Error: ', error);
    return error;
  }
};

export default function userPostsReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_USER_POSTS:
      const userPosts = action.payload;
      newState.user_posts = userPosts;
      return newState;
    case CREATE_POST:
      const newPost = action.payload;
      newState[newPost.id] = newPost;
      return newState;
    default:
      return state;
  }
}
