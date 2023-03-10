import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "fundme-9d184.firebaseapp.com",
  projectId: "fundme-9d184",
  storageBucket: "fundme-9d184.appspot.com",
  messagingSenderId: "782534537487",
  appId: "1:782534537487:web:8e0d1c05e2be225eff0e7a",
  measurementId: "G-TFG8F2Y1C3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Firestore
const db = getFirestore(app);

export { auth, provider, db };
