import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");

  return (
    <div>
      <Navbar role={isAdmin ? "admin" : "student"} />
      <Outlet />
    </div>
  );
}
