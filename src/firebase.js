// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDta7QQJTh7I5VP_gXkVwaofdfXhIfF3Tk",
  authDomain: "sparta-dict.firebaseapp.com",
  projectId: "sparta-dict",
  storageBucket: "sparta-dict.appspot.com",
  messagingSenderId: "377023719005",
  appId: "1:377023719005:web:5a4c7485dba74613afcfb4",
  measurementId: "G-YRFTVVG0P9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();
export{db};