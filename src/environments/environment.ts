// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
