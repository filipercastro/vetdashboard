import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCPEcHZpA9E1DxE-GVVr6ann6hNjQq1TxE",
  authDomain: "vetdashboard-7cb3c.firebaseapp.com",
  databaseURL: "https://vetdashboard-7cb3c.firebaseio.com",
  projectId: "vetdashboard-7cb3c",
  storageBucket: "vetdashboard-7cb3c.appspot.com",
  messagingSenderId: "36230675695"
};

export const firebaseApp = firebase.initializeApp(config);
//export const usersRef = firebase.database().ref('users');
