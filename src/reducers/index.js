import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './reducer_user';
import patients from './reducer_patients';
import vets from './reducer_vets';
import systems from './reducer_systems';

const rootReducer = combineReducers({
  user,
  patients,
  vets,
  systems,
  form: formReducer
});

export default rootReducer;
