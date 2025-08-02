import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-2 gap-10">
        
        {/* Student Card */}
        <div
          className="bg-white shadow-lg rounded-xl p-8 cursor-pointer hover:scale-105 transition"
          onClick={() => navigate("/student-login")}
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
            🎓 Student Login
          </h2>
          <p className="text-center text-gray-600">
            Login to send SOS alerts quickly.
          </p>
        </div>

        {/* Admin Card */}
        <div
          className="bg-white shadow-lg rounded-xl p-8 cursor-pointer hover:scale-105 transition"
          onClick={() => navigate("/admin-login")}
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-red-600">
            🛡 Admin Login
          </h2>
          <p className="text-center text-gray-600">
            Authorized faculty can log in to manage alerts.
          </p>
        </div>
      </div>
    </div>
  );
}
