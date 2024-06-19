// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDXgH4VavgZ5asGerGVgziFbuEUN_iIYiM",
  authDomain: "event-management-9aece.firebaseapp.com",
  projectId: "event-management-9aece",
  storageBucket: "event-management-9aece.appspot.com",
  messagingSenderId: "798184556724",
  appId: "1:798184556724:web:e9583c53acfad87170efe1",
  measurementId: "G-DX07F83DN1"
};



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const storage=firebase.storage();
export {storage,firebase as default};
