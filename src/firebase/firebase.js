// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKxBsrvM5GzHDfTnAKg-r42cxr3RyFyi8",
  authDomain: "ehxhfks.firebaseapp.com",
  databaseURL: "https://ehxhfks-default-rtdb.firebaseio.com",
  projectId: "ehxhfks",
  storageBucket: "ehxhfks.firebasestorage.app",
  messagingSenderId: "513043809628",
  appId: "1:513043809628:web:1d2824d75ea707bee2ad99",
  measurementId: "G-SBN7QH3L8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firestore = getFirestore(app); 
export const firebaseDB = firestore;
// Firebase 초기화


// Firebase 앱을 export
export { app };