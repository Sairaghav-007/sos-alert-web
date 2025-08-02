import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    facultyID: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAuth = async () => {
    try {
      if (isSignup) {
        // 1️⃣ Create Auth Account
        const res = await createUserWithEmailAndPassword(auth, form.email, form.password);

        // 2️⃣ Save Extra Admin Info in Firestore
        await setDoc(doc(db, "admins", res.user.uid), {
          name: form.name,
          mobile: form.mobile,
          email: form.email,
          facultyID: form.facultyID,
          createdAt: new Date()
        });

        alert("✅ Admin account created! Please log in.");
        setIsSignup(false);
      } else {
        // Admin Login
        await signInWithEmailAndPassword(auth, form.email, form.password);
        alert("✅ Admin logged in!");
        navigate("/admin-dashboard");
      }
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-red-600">
        {isSignup ? "Admin Sign Up" : "Admin Login"}
      </h1>

      {isSignup && (
        <>
          <input
            name="name"
            placeholder="Full Name"
            className="border p-2 mb-2 w-64 rounded"
            onChange={handleChange}
          />
          <input
            name="mobile"
            placeholder="Mobile Number"
            className="border p-2 mb-2 w-64 rounded"
            onChange={handleChange}
          />
          <input
            name="facultyID"
            placeholder="Faculty ID"
            className="border p-2 mb-2 w-64 rounded"
            onChange={handleChange}
          />
        </>
      )}

      <input
        name="email"
        placeholder="Email"
        className="border p-2 mb-2 w-64 rounded"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border p-2 mb-4 w-64 rounded"
        onChange={handleChange}
      />

      <button
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        onClick={handleAuth}
      >
        {isSignup ? "Sign Up" : "Login"}
      </button>

      <p
        className="mt-4 text-blue-600 cursor-pointer"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? "Already an admin? Login" : "New admin? Sign Up"}
      </p>
    </div>
  );
}
