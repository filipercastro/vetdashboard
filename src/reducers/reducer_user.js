import { FETCH_USER, LOG_OUT } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
    case LOG_OUT:
      return action.user;
    default:
      return state;
  }
}
