import { SET_AUTH } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
