import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './reducer_user';

const rootReducer = combineReducers({
  user,
  form: formReducer
});

export default rootReducer;
