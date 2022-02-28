// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaFYbNIzdmFFUK1XdZLWYAJH3JcpgvCRU",
  authDomain: "house-marketplace-9cae2.firebaseapp.com",
  projectId: "house-marketplace-9cae2",
  storageBucket: "house-marketplace-9cae2.appspot.com",
  messagingSenderId: "609387812289",
  appId: "1:609387812289:web:a0efa7f611eb13e97a8b40"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore() 