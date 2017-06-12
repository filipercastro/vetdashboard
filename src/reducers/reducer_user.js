import { IS_AUTH, FETCH_USER, LOG_OUT } from '../actions';

const initialState = {
  auth: false,
  name: '',
  role: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTH:
      return {...state, auth: true};
    case FETCH_USER:
      return {...state, ...action.user};
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
