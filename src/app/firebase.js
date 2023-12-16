// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK63wjGDidjRHv88NHiVZ9kOsrg-LOxSo",
  authDomain: "bilkonnekt-ef5da.firebaseapp.com",
  projectId: "bilkonnekt-ef5da",
  storageBucket: "bilkonnekt-ef5da.appspot.com",
  messagingSenderId: "360196094002",
  appId: "1:360196094002:web:036a075e5843bbcbfde42b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);