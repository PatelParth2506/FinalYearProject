import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dashboardicon from '../../assets/dashboardicon.png';
import userList from '../../assets/userList.png';
import profileEdit from '../../assets/profileEdit.png';
import logout from '../../assets/logout.png';

const Sidebar = () => {
  const [admin, setAdmin] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("loggedAdmin");
    if (stored) {
      setAdmin(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedAdmin");
    navigate("/admin");
  };

  return (
    <>
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-white shadow z-50 fixed top-0 w-full">
        <h2 className="font-bold text-lg text-[#2B6EA0]">Admin Panel</h2>
        <button
          className="text-2xl text-[#2B6EA0]"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      <div className={`fixed top-0 left-0 h-full bg-white w-62 p-4 transition-transform duration-300 z-40 shadow-lg pt-5 sm:pt-3 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}>
        <div className="h-full flex flex-col justify-between">
          <div className="">
            <div className="mb-6 mt-10 md:mt-0">
              <div className="flex items-start flex-col gap-1 loginForm p-5 rounded-lg">
                <div className="w-13 h-13 rounded-full bg-[#2B6EA0] border-2 border-[#9bbbd3] flex items-center justify-center text-white font-bold text-[22px]">
                  {"ConnectMe"}
                </div>
                <div className="pl-1">
                  <p className="font-bold text-2xl text-[#2B6EA0]">Devloper Admin</p>
                  <p className="text-[13px] text-gray-700">connectMeDevloper@gmail.com</p>
                </div>
              </div>
            </div>

            <nav className="space-y-2">
              <Link to="/devadmin/dashboard" onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium text-[15px] text-[#2B6EA0] ${location.pathname === "/admin/dashboard" ? "bg-white loginForm" : "hover:bg-white/60"}`}>
                <img src={dashboardicon} alt="dashboard" className="w-5" />
                Dashboard
              </Link>

              <Link to="/devadmin/users" onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium text-[15px] text-[#2B6EA0] ${location.pathname === "/admin/users" ? "bg-white loginForm" : "hover:bg-white/60"}`}>
                <img src={userList} alt="userList" className="w-5" />
                UserList
              </Link>

              <Link onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium text-[15px] text-[#2B6EA0]`}>
                <img src={profileEdit} alt="profileEdit" className="w-5" />
                EditProfile
              </Link>
            </nav>
          </div>

          <div className="mt-10">
            <button onClick={handleLogout} className="w-full flex justify-center items-center gap-2 bg-[#2B6EA0] text-white font-semibold hover:bg-red-500 py-2 px-4 rounded-lg transition">
              <img src={logout} alt="logout" className="w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
