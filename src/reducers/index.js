import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './reducer_auth';
import user from './reducer_user';
import patients from './reducer_patients';
import vets from './reducer_vets';
import exams from './reducer_exams';
import protocol from './reducer_protocol';

const rootReducer = combineReducers({
  auth,
  user,
  patients,
  vets,
  exams,
  protocol,
  form: formReducer
});

export default rootReducer;
