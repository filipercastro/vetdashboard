import * as firebase from 'firebase'
import { firebaseApp } from '../firebase';

export const LOG_IN = 'LOG_IN';

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
     .then((data) => {
       callback();
       dispatch(fetchRole(data.uid));
     })
     .catch(error => {errorCallback(error)});
  }
}
