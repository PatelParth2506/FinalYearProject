import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("loggedAdmin");
    if (admin) {
      setIsAuthenticated(true);
    } else {
      if (location.pathname !== "/admin") navigate("/admin");
    }
  }, [location.pathname, navigate]);

  if (location.pathname === "/admin") {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="overFlow flex-1 md:pt-0 pt-15 overflow-y-auto bg-gradient-to-tr from-[#e0e7ff] via-[#fcf3f3] to-[#dbeafe]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;