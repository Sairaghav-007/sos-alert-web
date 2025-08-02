import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAHGcJjNy0mWOBZqW0fpQlZrV4bvFyTOU",
  authDomain: "sosalert-5b3f2.firebaseapp.com",
  projectId: "sosalert-5b3f2",
  storageBucket: "sosalert-5b3f2.firebasestorage.app",
  messagingSenderId: "702940900636",
  appId: "1:702940900636:web:c3b9b8d0a6456935879ed9",
  measurementId: "G-RZ40TTBPVG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics };
export const auth = getAuth(app);
export const db = getFirestore(app);