import { FETCH_PATIENTS } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PATIENTS:
      return action.patients;
    default:
      return state;
  }
}
