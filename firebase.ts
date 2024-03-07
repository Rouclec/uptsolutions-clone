// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_5M8yX2ILT-H74HmcZqtsrMUccRi9zAo",
  authDomain: "uptsolutions-b2c5d.firebaseapp.com",
  projectId: "uptsolutions-b2c5d",
  storageBucket: "uptsolutions-b2c5d.appspot.com",
  messagingSenderId: "629029903198",
  appId: "1:629029903198:web:758d1a69f3f1c696940dcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
