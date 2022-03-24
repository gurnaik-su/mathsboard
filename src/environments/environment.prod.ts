import { FirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyC1x4cJCkpeYskSQtRRUNJJuQnYpSEJGmk",
    authDomain: "mathsboard-60eff.firebaseapp.com",
    databaseURL: "https://mathsboard-60eff-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mathsboard-60eff",
    storageBucket: "mathsboard-60eff.appspot.com",
    messagingSenderId: "682550955876",
    appId: "1:682550955876:web:3cb45ff4a87b4df6363471",
    measurementId: "G-G7J74FL8LG"
  }
};
import firebase from "firebase/compat/app";
import "firebase/firestore";

firebase.initializeApp(environment.firebaseConfig);
export const db = getFirestore();

