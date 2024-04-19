import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";;



const app =firebase.initializeApp({
    apiKey: "AIzaSyC1nHsI2xUPjFydrOB5qBUnDe6hMLDrqjU",
    authDomain: "founded-960fb.firebaseapp.com",
    projectId: "founded-960fb",
    storageBucket: "founded-960fb.appspot.com",
    messagingSenderId: "551927978763",
    appId: "1:551927978763:web:ae1c1235a038057573e00e"

})
export const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
export const fireStoreApp = app.firestore();
export const storageApp = app.storage();
export const authApp = app.auth();