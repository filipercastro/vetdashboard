import { FETCH_VETS } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_VETS:
      return action.payload;
    default:
      return state;
  }
}
