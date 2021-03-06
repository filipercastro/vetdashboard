import { db, auth } from '../firebase';

export const SET_AUTH = 'SET_AUTH';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_PATIENTS = 'FETCH_PATIENTS';
export const FETCH_PATIENT = 'FETCH_PATIENT';
export const FETCH_VETS = 'FETCH_VETS';
export const SAVE_PENDING = 'SAVE_PENDING';
export const SAVE_DONE = 'SAVE_DONE';
export const ADD_PENDING = 'ADD_PENDING';
export const ADD_DONE = 'ADD_DONE';
export const DELETE_PENDING = 'DELETE_PENDING';
export const DELETE_DONE = 'DELETE_DONE';
export const INIT_PROTOCOL = 'SAVE_PROTOCOL';
export const ADD_MED = 'ADD_MED';
export const DELETE_MED = 'DELETE_MED';
export const RESET_PROTOCOL = 'RESET_PROTOCOL';

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
      if (payload.exams) {
        dispatch(savePendingExams(payload.exams.pending));
        dispatch(saveDoneExams(payload.exams.done));
        dispatch(initProtocol(payload.protocol));
      }
    });
  }
}

export function savePatient(patient, callback) {
  const patientRef = db.ref(`patients/${patient.register}`);
  return dispatch => {
    patientRef.update(patient)
    .then(() => {
      if (callback) { callback() };
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

export function saveExams(id, exams, callback) {
  const examsRef = db.ref(`patients/${id}/exams`);
  return dispatch => {
    examsRef.update(exams)
    .then(() => {
      if (callback) { callback() };
    });
  }
}

export function saveProtocol(id, protocol, callback) {
  const protocolRef = db.ref(`patients/${id}/protocol`);
  return dispatch => {
    protocolRef.update(protocol)
    .then(() => {
      if (callback) { callback() };
    });
  }
}

export function initProtocol(protocol) {
  return {type: INIT_PROTOCOL, protocol};
}

export function addMed(med) {
  return {type: ADD_MED, med};
}

export function deleteMed(idx) {
  return {type: DELETE_MED, idx};
}

export function resetProtocol() {
  return {type: RESET_PROTOCOL};
}
