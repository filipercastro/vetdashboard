import { FETCH_PATIENTS, FETCH_PATIENT } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PATIENTS:
      return action.payload;
    case FETCH_PATIENT:
      return {...state, [action.payload.register]: action.payload };
    default:
      return state;
  }
}
