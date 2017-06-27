import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './reducer_user';
import patients from './reducer_patients';
import vets from './reducer_vets';
import systems from './reducer_systems';
import exams from './reducer_exams';

const rootReducer = combineReducers({
  user,
  patients,
  vets,
  systems,
  exams,
  form: formReducer
});

export default rootReducer;
