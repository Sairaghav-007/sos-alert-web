import { useState } from "react";
import Login from "./pages/Login";
import SOSButton from "./pages/SOSbutton";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("sos"); // Default page

  // If not logged in → Show Login
  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Navbar */}
      <div className="flex justify-center gap-6 p-4 bg-gray-200 shadow-md">
        <button
          className={`px-4 py-2 rounded ${currentPage === "sos" ? "bg-red-500 text-white" : "bg-gray-300"}`}
          onClick={() => setCurrentPage("sos")}
        >
          SOS Button
        </button>
        <button
          className={`px-4 py-2 rounded ${currentPage === "dashboard" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setCurrentPage("dashboard")}
        >
          Dashboard
        </button>
        <button
          className="px-4 py-2 rounded bg-black text-white"
          onClick={() => {
            setLoggedIn(false);
            setCurrentPage("sos");
          }}
        >
          Logout
        </button>
      </div>

      {/* ✅ Page Content */}
      <div className="p-4">
        {currentPage === "sos" ? <SOSButton /> : <Dashboard />}
      </div>
    </div>
  );
}
