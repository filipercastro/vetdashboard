import { INIT_PROTOCOL, ADD_MED, DELETE_MED, RESET_PROTOCOL } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case INIT_PROTOCOL:
      return action.protocol ? action.protocol : [];
    case ADD_MED:
      return [...state.concat(action.med)];
    case DELETE_MED:
      return [...state.slice(0, action.idx),
              ...state.slice(action.idx + 1)]
    case RESET_PROTOCOL:
      return [];
    default:
      return state;
  }
}
