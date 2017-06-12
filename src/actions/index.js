import { db, auth } from '../firebase';

export const IS_AUTH = 'IS_AUTH';
export const FETCH_USER = 'FETCH_USER';
export const LOG_OUT = 'LOG_OUT';
export const FETCH_PATIENTS = 'FETCH_PATIENTS'
export const FETCH_PATIENT = 'FETCH_PATIENT'
export const SAVE_PATIENT = 'SAVE_PATIENT';
export const FETCH_VETS = 'FETCH_VETS';
export const FETCH_SYSTEMS = 'FETCH_SYSTEMS';

export function isAuth() {
  return {type: IS_AUTH, auth: true}
}

export function fetchUser(uid) {
  const usersRef = db.ref('users/' + uid);
  return dispatch => {
    usersRef.on('value', (snap) => {
      dispatch({type: FETCH_USER, user: snap.val()});
    });
  }
}

export function logOut(callback) {
  return dispatch => {
    auth.signOut()
      .then(() => {
        callback();
        dispatch({type: LOG_OUT});
      });
  }
}

export function fetchPatientList() {
  const patientsRef = db.ref('patients');
  return dispatch => {
    patientsRef.on('value', (snap) => {
      dispatch({type: FETCH_PATIENTS, payload: snap.val()});
    })
  }
}

export function fetchPatient(register) {
  const patientRef = db.ref(`patients/${register}`);
  return dispatch => {
    patientRef.on('value', (snap) => {
      dispatch({type: FETCH_PATIENT, payload: snap.val()});
    });
  }
}

export function savePatient(values) {
  return dispatch => {
    console.log("save patient action creator");
    dispatch({type: SAVE_PATIENT});
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
