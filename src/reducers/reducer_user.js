import { SIGNED_IN } from '../actions';

let user = {
  uid: null
}

export default (state = user, action) => {
  switch (action.type) {
    case SIGNED_IN:
      const { uid } = action;
      user = {
        uid
      }
      return user;
    default:
      return state;
  }
}
