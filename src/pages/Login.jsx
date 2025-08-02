import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = async () => {
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("✅ Signup successful! You can now log in.");
        setIsSignup(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Login successful!");
        onLogin();
      }
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        {isSignup ? "Student Signup" : "Student Login"}
      </h1>
      <input
        className="border p-2 mb-2 w-64 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mb-4 w-64 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        onClick={handleAuth}
      >
        {isSignup ? "Sign Up" : "Login"}
      </button>
      <p
        className="mt-4 text-blue-600 cursor-pointer"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? "Already have an account? Login" : "No account? Sign Up"}
      </p>
    </div>
  );
}
