// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCdbX4axxsHZIgKyOYieVJUXztJTf8swk",
  authDomain: "style-decor-project-client.firebaseapp.com",
  projectId: "style-decor-project-client",
  storageBucket: "style-decor-project-client.firebasestorage.app",
  messagingSenderId: "44564121174",
  appId: "1:44564121174:web:ff48c9c4dd053c0d599df7"
};
console.log("ENV CHECK:", import.meta.env.VITE_apiKey);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);