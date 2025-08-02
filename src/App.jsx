import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import StudentLogin from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import SOSButton from "./pages/SOSbutton";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import StudentDashboard from "./pages/Student-Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Pages with Navbar */}
        <Route element={<Layout />}>
          <Route path="/student-sos" element={<SOSButton />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
