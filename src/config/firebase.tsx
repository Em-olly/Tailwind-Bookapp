import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyDTEKyMTfjln8AsvPPObDZ-UiSfiLJEAiM",
  authDomain: "bookhaven-78f92.firebaseapp.com",
  projectId: "bookhaven-78f92",
  storageBucket: "bookhaven-78f92.firebasestorage.app",
  messagingSenderId: "380528746157",
  appId: "1:380528746157:web:3e59bbca21a3b660a6b024",
  measurementId: "G-BBL1M62H8V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  

