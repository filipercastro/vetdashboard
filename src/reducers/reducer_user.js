import { LOG_IN, LOG_OUT } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case LOG_IN:
    case LOG_OUT:
    console.log(action.user);
      return action.user;
    default:
      return state;
  }
}
