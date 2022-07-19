import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

// convert to ".env"
const firebaseConfig = {
    // apiKey: "AIzaSyC8QIspmZ8N3zTTjpLjhQW6-MHNDUzA1g4",
    // authDomain: "recipe-fav.firebaseapp.com",
    // projectId: "recipe-fav",
    // storageBucket: "recipe-fav.appspot.com",
    // messagingSenderId: "297429039887",
    // appId: "1:297429039887:web:8ecf3fe90347214fea9c7a",
    // measurementId: "G-6RBMY5XW5R"
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
export const db = getFirestore(app)