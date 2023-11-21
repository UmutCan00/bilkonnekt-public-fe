// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzeJXRUF8lgxn8uftxb8UCD-_yKg71RX0",
  authDomain: "bilkonnekt.firebaseapp.com",
  projectId: "bilkonnekt",
  storageBucket: "bilkonnekt.appspot.com",
  messagingSenderId: "148147768846",
  appId: "1:148147768846:web:281f0bc3fa8181de4e765f",
  measurementId: "G-3M7NFKNKKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);