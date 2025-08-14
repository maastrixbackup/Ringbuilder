// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7L051HHHkp1EtLMZwXvauU0iK3TdI-Go",
  authDomain: "ring-builder-b7268.firebaseapp.com",
  projectId: "ring-builder-b7268",
  storageBucket: "ring-builder-b7268.firebasestorage.app",
  messagingSenderId: "447805365184",
  appId: "1:447805365184:web:fc5f3c469ab02ba9cb0625",
  measurementId: "G-EKSXKR9QM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);