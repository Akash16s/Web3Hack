import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Use your config values here.
const app = initializeApp({
  apiKey: "AIzaSyCap-QfQ80U9GbGY2BigH7d9nLiJfkGFO0",
  authDomain: "web3hackathon.firebaseapp.com",
  projectId: "web3hackathon",
  storageBucket: "web3hackathon.appspot.com",
  messagingSenderId: "1025163191346",
  appId: "1:1025163191346:web:22465c9b85e1c0dfa4082b",
  measurementId: "G-4BCCL311DR",
});

export const db = getFirestore(app);
