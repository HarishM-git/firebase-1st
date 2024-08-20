import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDyY3kRUWCBcyo3yqDr9eQVxW1o3GNtiOw",
  authDomain: "market-app-4bf90.firebaseapp.com",
  projectId: "market-app-4bf90",
  storageBucket: "market-app-4bf90.appspot.com",
  messagingSenderId: "29334297183",
  appId: "1:29334297183:web:5460ecc1a4442200a959ea",
  measurementId: "G-0T91MRVB6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const gAuth = new GoogleAuthProvider(app)
export const db = getFirestore(app)
export const storage = getStorage(app)