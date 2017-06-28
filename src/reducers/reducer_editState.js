import { ENABLE_EDIT, DISABLE_EDIT } from '../actions';

export default (state = false, action) => {
  switch (action.type) {
    case ENABLE_EDIT:
      return false;
    case DISABLE_EDIT:
      return true;
    default:
      return state;
  }
}
