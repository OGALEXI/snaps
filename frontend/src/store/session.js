const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const res = await fetch('/auth', {
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
  (avatar, firstname, lastname, username, email, password) =>
  async (dispatch) => {
    const res = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar,
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}
