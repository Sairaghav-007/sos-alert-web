import { auth } from "./firebase.js";

export default function TestFirebase() {
  console.log("Firebase Auth Instance:", auth);
  return <h1>Firebase Connected!</h1>;
}