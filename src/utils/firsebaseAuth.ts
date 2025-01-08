// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6FGalaYpb5GiM5lOIVlaZmYnMGUUUCmo",
  authDomain: "ct553-7dfab.firebaseapp.com",
  projectId: "ct553-7dfab",
  storageBucket: "ct553-7dfab.firebasestorage.app",
  messagingSenderId: "59122861486",
  appId: "1:59122861486:web:6af491ae340b222c0c343f",
  measurementId: "G-FJG7PR1VGF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
