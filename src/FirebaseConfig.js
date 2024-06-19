// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCL3JPD6h_dLihm2lnxQNW9YqOuUeYhFv8",
  authDomain: "event-94489.firebaseapp.com",
  projectId: "event-94489",
  storageBucket: "event-94489.appspot.com",
  messagingSenderId: "197456457383",
  appId: "1:197456457383:web:2b75093933fbfea287f582",
  measurementId: "G-9EERK27MG1"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const storage=firebase.storage();
export {storage,firebase as default};
