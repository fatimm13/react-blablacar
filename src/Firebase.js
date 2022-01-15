// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDx0fAIdqmgx5DKtRa7IWHqHrT_4JKaZSE",
  authDomain: "halfwayhome-c2105.firebaseapp.com",
  projectId: "halfwayhome-c2105",
  storageBucket: "halfwayhome-c2105.appspot.com",
  messagingSenderId: "632254440476",
  appId: "1:632254440476:web:6a98494792152e0d646bd9",
  measurementId: "G-GT4P5EELHS"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export {firebase}