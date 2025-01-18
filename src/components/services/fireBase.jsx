// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUbLENZskoFm7it35nitzTjuXa1okjkio",
  authDomain: "my-trip-12958.firebaseapp.com",
  projectId: "my-trip-12958",
  storageBucket: "my-trip-12958.firebasestorage.app",
  messagingSenderId: "621206871280",
  appId: "1:621206871280:web:4cb23c3699b7a93dc47635",
  measurementId: "G-TM1DXPCZEH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
// const analytics = getAnalytics(app);