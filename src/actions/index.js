import { db, auth } from '../firebase';

export const SET_AUTH = 'SET_AUTH';
export const FETCH_USER = 'FETCH_USER';
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN = 'LOG_IN';
export const FETCH_PATIENTS = 'FETCH_PATIENTS'
export const FETCH_PATIENT = 'FETCH_PATIENT'
export const SAVE_PATIENT = 'SAVE_PATIENT';
export const FETCH_VETS = 'FETCH_VETS';
export const FETCH_SYSTEMS = 'FETCH_SYSTEMS';

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

export function savePatient(patient) {
  const patientRef = db.ref(`patients/${patient.register}`);
  return dispatch => {
    console.log("save patient action creator");
    patientRef.set(patient);
    dispatch({type: SAVE_PATIENT, patient});
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
