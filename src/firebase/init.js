// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXWjNRz14QEl4pCywHBycdKZFzbc0BSr0",
  authDomain: "smoothies-app-vue.firebaseapp.com",
  projectId: "smoothies-app-vue",
  storageBucket: "smoothies-app-vue.appspot.com",
  messagingSenderId: "994090645292",
  appId: "1:994090645292:web:9955cbed98304599869e89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
