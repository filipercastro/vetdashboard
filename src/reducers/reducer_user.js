import { SET_AUTH, FETCH_USER, LOG_OUT } from '../actions';

const initialState = {
  auth: null,
  name: '',
  role: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {...state, auth: action.auth};
    case FETCH_USER:
      return {...state, ...action.user};
    case LOG_OUT:
      return {...initialState, auth: "notAuth"};
    default:
      return state;
  }
}
