import {
  SAVE_PENDING,
  SAVE_DONE,
  ADD_DONE,
  ADD_PENDING,
  DELETE_PENDING,
  DELETE_DONE } from '../actions';

const initialState = {
  done : [],
  pending : []
}

export default (state = initialState, action) => {
  const { pending, done } = state;

  switch (action.type) {
    case SAVE_DONE:
      return {pending, done: action.done ? action.done : []};
    case SAVE_PENDING:
      return {done, pending: action.pending ? action.pending : []};
    case ADD_DONE:
      return {pending, done: [...done.concat(action.value)]};
    case ADD_PENDING:
      return {done, pending: [...pending.concat(action.value)]};
    case DELETE_PENDING:
      return {
        done,
        pending: [...pending.slice(0, action.idx),
                  ...pending.slice(action.idx + 1)]
      };
    case DELETE_DONE:
      return {
        pending,
        done: [...done.slice(0, action.idx),
               ...done.slice(action.idx + 1)]
      };
    default:
      return state;
  }
}
