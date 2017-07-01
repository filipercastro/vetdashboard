import { db, auth } from '../firebase';

export const SET_AUTH = 'SET_AUTH';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_PATIENTS = 'FETCH_PATIENTS'
export const FETCH_PATIENT = 'FETCH_PATIENT'
export const SAVE_PATIENT = 'SAVE_PATIENT';
export const FETCH_VETS = 'FETCH_VETS';
export const FETCH_SYSTEMS = 'FETCH_SYSTEMS';
export const SAVE_PENDING = 'SAVE_PENDING';
export const SAVE_DONE = 'SAVE_DONE';
export const ADD_PENDING = 'ADD_PENDING';
export const ADD_DONE = 'ADD_DONE';
export const DELETE_PENDING = 'DELETE_PENDING';
export const DELETE_DONE = 'DELETE_DONE';
export const ENABLE_EDIT = 'ENABLE_EDIT';
export const DISABLE_EDIT = 'DISABLE_EDIT';


export function setAuth(auth) {
  return {type: SET_AUTH, auth}
}

export function fetchUser(uid) {
  const usersRef = db.ref('users/' + uid);
  return dispatch => {
    usersRef.on('value', (snap) => {
      dispatch({type: FETCH_USER, user: snap.val()});
    });
  }
}

export function logIn(values, callback, errorCallback) {
  return dispatch => {
    dispatch(setAuth("loggingIn"));
    const { email, password } = values;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        callback();
      })
      .catch(error => {errorCallback(error);}
      );
  }
}

export function logOut(callback) {
  return dispatch => {
    auth.signOut()
      .then(() => {
        callback();
        dispatch(setAuth("notAuth"));
      });
  }
}

export function fetchPatientList() {
  const patientsRef = db.ref('patients');
  return dispatch => {
    patientsRef.on('value', (snap) => {
      const payload = snap.val();
      dispatch({type: FETCH_PATIENTS, payload});
    })
  }
}

export function fetchPatient(register) {
  const patientRef = db.ref(`patients/${register}`);
  return dispatch => {
    patientRef.on('value', (snap) => {
      const payload = snap.val();
      dispatch({type: FETCH_PATIENT, payload});
      dispatch(savePendingExams(payload.exams.pending));
      dispatch(saveDoneExams(payload.exams.done));

    });
  }
}

export function savePatient(patient, callback) {
  const patientRef = db.ref(`patients/${patient.register}`);
  return dispatch => {
    patientRef.set(patient)
    .then(() => {
      if (callback) { callback() };
      dispatch({type: SAVE_PATIENT, patient});
    });
  }
}

export function fetchVets() {
  const vetsRef = db.ref('vets');
  return dispatch => {
    vetsRef.on('value', (snap) => {
      dispatch({type: FETCH_VETS, payload: snap.val()});
    });
  }
}

export function fetchSystems() {
  const systemsRef = db.ref('systems');
  return dispatch => {
    systemsRef.on('value', (snap) => {
      dispatch({type: FETCH_SYSTEMS, payload: snap.val()});
    });
  }
}

export function savePendingExams(pending) {
  return {type: SAVE_PENDING, pending};
}

export function saveDoneExams(done) {
  return {type: SAVE_DONE, done};
}

export function addPendingExam(value) {
  return {type: ADD_PENDING, value};
}

export function addDoneExam(value) {
  return {type: ADD_DONE, value};
}

export function deletePendingExam(idx) {
  return {type: DELETE_PENDING, idx};
}

export function deleteDoneExam(idx) {
  return {type: DELETE_DONE, idx};
}

export function enableEdit() {
  return {type: ENABLE_EDIT};
}

export function disableEdit() {
  return {type: DISABLE_EDIT};
}
