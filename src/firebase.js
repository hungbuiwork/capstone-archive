// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM6N5juAkz41v0l_YiQKS6Vf_QB_Lx5pw",
  authDomain: "capstone-archive.firebaseapp.com",
  projectId: "capstone-archive",
  storageBucket: "capstone-archive.appspot.com",
  messagingSenderId: "269341507347",
  appId: "1:269341507347:web:c63776e2fade8a13be64e6",
  measurementId: "G-XYNE04K5Z0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);

