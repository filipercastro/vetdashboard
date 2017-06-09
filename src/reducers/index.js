import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './reducer_user';
import patients from './reducer_patients';

const rootReducer = combineReducers({
  user,
  patients,
  form: formReducer
});

export default rootReducer;
