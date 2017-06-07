import * as firebase from 'firebase'
import { firebaseApp } from '../firebase';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export function fetchRole(uid) {
  const usersRef = firebase.database().ref('users/' + uid);
  return dispatch => {
    usersRef.on('value', (snap) => {
      dispatch({type: LOG_IN, user: snap.val()});
    })
  }
}

export function logIn(values, callback, errorCallback) {
  return dispatch => {
    const { email, password } = values;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
     .then(() => {
       callback();
     })
     .catch(error => {errorCallback(error)});
  }
}

export function checkLogin(callback, errorcallback) {
  return dispatch => {
    firebaseApp.auth().onAuthStateChanged(data => {
      if (data) {
        callback();
        console.log(`User ${data.uid} is logged in`);
        dispatch(fetchRole(data.uid));
      } else {
        errorcallback();
        console.log("No user");
      }
    });
  }
}

export function logOut(callback) {
  return dispatch => {
    firebaseApp.auth().signOut()
      .then(() => {
        callback();
        dispatch({type: LOG_OUT, user: {}});
      });
  }
}
