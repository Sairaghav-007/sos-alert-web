import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar({ role }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // back to landing page
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-lg">
      {/* Left - App Name */}
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        SOS Alert
      </h1>

      {/* Center - Role Info */}
      <span className="text-sm bg-white text-blue-600 px-3 py-1 rounded-full">
        {role === "admin" ? "Admin" : "Student"}
      </span>

      {/* Right - Buttons */}
      <div className="flex space-x-3 items-center">
        <button
          onClick={() => navigate("/student-sos")}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-white font-semibold"
        >
          SOS
        </button>
        <button
          onClick={() => navigate(role === "admin" ? "/admin-dashboard" : "/student-dashboard")}
          className="hover:underline"
        >
          Dashboard
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-100 text-blue-600 hover:bg-gray-200 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
