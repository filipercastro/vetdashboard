import { FETCH_SYSTEMS } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SYSTEMS:
      return action.payload;
    default:
      return state;
  }
}
