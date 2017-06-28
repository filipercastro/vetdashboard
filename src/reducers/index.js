import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './reducer_user';
import patients from './reducer_patients';
import vets from './reducer_vets';
import systems from './reducer_systems';
import exams from './reducer_exams';
import disabled from './reducer_editState';

const rootReducer = combineReducers({
  user,
  patients,
  vets,
  systems,
  exams,
  disabled,
  form: formReducer
});

export default rootReducer;
