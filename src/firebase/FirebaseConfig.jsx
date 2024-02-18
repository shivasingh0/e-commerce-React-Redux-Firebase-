// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRtiDzgsw1GNM6zou8gnDM__xc07Kl9FE",
  authDomain: "e-commerce-75de4.firebaseapp.com",
  projectId: "e-commerce-75de4",
  storageBucket: "e-commerce-75de4.appspot.com",
  messagingSenderId: "955292690039",
  appId: "1:955292690039:web:743cbf8be9eda6d04b8872"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)
const auth = getAuth(app);
export {fireDB,auth } ;