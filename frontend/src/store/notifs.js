const SET_USER_NOTIFS = 'comments/SET_USER_NOTIFS';
//const ADD_NOTIF = '/comments/ADD_NOTIF';

const setUserNotifs = (notifs) => ({
  type: SET_USER_NOTIFS,
  payload: notifs,
});

export const fetchUserNotifs = (userId) => async (dispatch) => {
  const res = await fetch(`/notifs/${userId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(setUserNotifs(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export default function notifReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_USER_NOTIFS:
      const userNotifs = action.payload.notifs;
      newState[userNotifs[0]['user_id']] = userNotifs;
      return newState;
    default:
      return state;
  }
}
