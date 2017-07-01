import { FETCH_USER } from '../actions';

const initialState = {
  name: '',
  role: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {...state, ...action.user};
    default:
      return state;
  }
}
