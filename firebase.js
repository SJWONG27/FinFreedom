// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoSmQNc0DDc2LqQLpU_O7F6-QJrqOmgns",
  authDomain: "finfreedom-18ca3.firebaseapp.com",
  projectId: "finfreedom-18ca3",
  storageBucket: "finfreedom-18ca3.appspot.com",
  messagingSenderId: "650010373431",
  appId: "1:650010373431:web:ee8bbe7a332c1d829bfeb2",
  measurementId: "G-TCBPJHZSJH"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const firebaseFirestore = firebaseApp.firestore();

// Export Firebase modules
export { firebaseAuth, firebaseFirestore };