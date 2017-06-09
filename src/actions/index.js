import { db, auth } from '../firebase';

export const FETCH_USER = 'FETCH_USER';
export const LOG_OUT = 'LOG_OUT';
export const FETCH_PATIENTS = 'FETCH_PATIENTS'

export function fetchUser(uid) {
  const usersRef = db.ref('users/' + uid);
  return dispatch => {
    usersRef.on('value', (snap) => {
      dispatch({type: FETCH_USER, user: snap.val()});
      console.log(`Fetch user role: ${JSON.stringify(snap.val())}`)
    })
  }
}

export function logIn(values, callback, errorCallback) {
  return dispatch => {
    const { email, password } = values;
    auth.signInWithEmailAndPassword(email, password)
     .then(() => {
       console.log("Logged in");
       callback();
     })
     .catch(error => {errorCallback(error)});
  }
}

export function checkLogin() {
  return dispatch => {
    auth.onAuthStateChanged(data => {
      if (data) {
        console.log(`User ${data.uid} is logged in`);
        dispatch(fetchUser(data.uid));
      } else {
        console.log("No user");
      }
    });
  }
}

export function logOut(callback) {
  return dispatch => {
    auth.signOut()
      .then(() => {
        callback();
        dispatch({type: LOG_OUT, user: {}});
      });
  }
}

export function fetchPatientList() {
  const patientsRef = db.ref('patients');
  return dispatch => {
    patientsRef.on('value', (snap) => {
      dispatch({type: FETCH_PATIENTS, patients: snap.val()});
      console.log(`Fetch patients: ${JSON.stringify(snap.val())}`);
    })
  }
}
