// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const SET_ALL_USERS = 'session/SET_ALL_USERS';

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const setAllUsers = (users) => ({
  type: SET_ALL_USERS,
  payload: users,
});

export const authenticate = () => async (dispatch) => {
  const res = await fetch('/auth/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const getAllUsers = () => async (dispatch) => {
  const res = await fetch('/users/');
  if (res.ok) {
    const data = await res.json();
    dispatch(setAllUsers(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const login = (email, password) => async (dispatch) => {
  const res = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(setUser(data));
    return null;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

export const logout = () => async (dispatch) => {
  const res = await fetch('/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (firstname, lastname, username, email, password) => async (dispatch) => {
    const res = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
        password,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(setUser(data));
      return null;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.'];
    }
  };

export const editUser =
  (userId, firstname, lastname, avatar, bio) => async (dispatch) => {
    const res = await fetch(`/edituser/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        avatar,
        bio,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(setUser(data));
      return null;
    } else {
      const data = await res.json();
      if (data.errors) {
        return data.errors;
      }
    }
  };

const initialState = { user: null, users: [] };

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_USER:
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState.user = null;
      return newState;
    case SET_ALL_USERS:
      action.payload.users.forEach((user) => {
        newState.users[user.id] = user;
      });
      return newState;
    default:
      return state;
  }
}
