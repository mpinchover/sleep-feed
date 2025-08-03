"use client";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCePfZ_FyjP5Efe4BBrA9CZKVJ58HeXw-g",
  authDomain: "voyager-446ad.firebaseapp.com",
  projectId: "voyager-446ad",
  storageBucket: "voyager-446ad.firebasestorage.app",
  messagingSenderId: "508595000699",
  appId: "1:508595000699:web:620750664b14b0c97619de",
  measurementId: "G-JX7WPKYL0F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
