import React, { useEffect, useState } from "react";
import { LogIn, ShieldOff, ShieldCheck, Eye, X, Axe } from "lucide-react";
import userList from '../../assets/userList.png';
import axios from "axios";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const usersPerPage = 6;

  const handleBlockToggle = (userId) => {
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, blocked: !user.blocked } : user
    );
    setUsers(updatedUsers);
  };

  useEffect(()=>{
   const fetchdata = async()=>{
    const res=await axios.post("/api/user/getalluser")
    const randomuser = res.data.data.sort(()=> Math.random()- 0.5)
    setUsers(randomuser)    
    console.log(res.data.data)
  } 
  fetchdata()
  },[])

  const handleLoginAsUser = (user) => {
    console.log("Logging in as:", user.username);
    alert(`Pretending to log in as @${user.username}`);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" ? true : filterStatus === "active" ? !user.blocked : user.blocked;
    return matchesSearch && matchesFilter;
  });

  const totalUsers = users.length;
  const totalBlocked = users.filter((u) => u.blocked).length;
  const totalActive = totalUsers - totalBlocked;

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <div className="p-6 md:p-10 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-[#2B6EA0] tracking-tight flex items-center gap-2">
            <img src={userList} alt="userList" />
            Manage Users
          </h2>
          <p className="text-[15px] text-gray-800 mt-3">
            Total: <span className="text-[#2B6EA0] text-xl">{totalUsers}</span> • Active: <span className="text-[#2B6EA0] text-xl">{totalActive}</span> • Blocked: <span className="text-[#2B6EA0] text-xl">{totalBlocked}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <input type="text" placeholder="Search users..." className="px-4 py-2 bg-[#fafafac8] placeholder:text-gray-500 rounded-full text-[15px] w-full sm:w-67 shadow-md focus:outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select className="px-3 py-2 rounded-full text-[15px] bg-[#fafafac8] text-gray-500 shadow-sm focus:outline-none" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option className="bg-white text-gray-500 hover:bg-indigo-100" value="all">All Users</option>
            <option className="bg-white text-gray-500 hover:bg-indigo-100" value="active">Active Users</option>
            <option className="bg-white text-gray-500 hover:bg-indigo-100" value="blocked">Blocked Users</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedUsers.map((user) => (
          <div key={user._id} className="bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition-all p-5 flex flex-col justify-between relative">
            {user.blocked && (
              <span className="absolute top-2 right-2 text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full font-medium">
                Blocked
              </span>
            )}
            <div className="flex items-center gap-4 mb-4">
              <img src={user.profilePhoto} alt={user.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#2B6EA0] p-px shadow" />
              <div>
                <h3 className="text-lg font-semibold text-[#2B6EA0]">{user.fullname}</h3>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>
            <p className="text-[14px] font-sans text-gray-600 mb-6 break-all">
              {user.email}
            </p>
            <div className="flex gap-2">
              <button onClick={() => handleLoginAsUser(user)} className="flex-1 bg-[#3477ab] hover:bg-[#3477abdc] text-white py-2 px-3 rounded-xl text-sm font-medium flex items-center justify-center gap-1">
                <LogIn size={16} /> Login
              </button>
              <button onClick={() => handleBlockToggle(user._id)} className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium flex items-center justify-center gap-1 ${user.blocked ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}`}>
                {user.blocked ? <ShieldCheck size={16} /> : <ShieldOff size={16} />}
                {user.blocked ? "Unblock" : "Block"}
              </button>
              <button onClick={() => setSelectedUser(user)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full">
                <Eye size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-1.5 rounded-full text-sm font-medium ${currentPage === i + 1 ? "bg-[#2B6EA0] text-white" : "bg-white border border-gray-300 text-gray-700" }`}>
            {i + 1}
          </button>
        ))}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-gradient-to-tr from-[#e0e7ff] via-[#fcf3f3] to-[#dbeafe] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] py-15 max-w-md p-6 rounded-2xl shadow-xl relative">
            <button onClick={() => setSelectedUser(null)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
            <div className="flex flex-col items-center">
              <img src={selectedUser.profilePhoto} alt={selectedUser.name} className="w-30 h-30 rounded-full border-2 border-[#2B6EA0] p-[2px] shadow mb-4"/>
              <h3 className="text-2xl font-semibold text-[#2B6EA0] mb-1">{selectedUser.fullname}</h3>
              <p className="text-sm text-gray-700 mb-1">@{selectedUser.username}</p>
              <p className="text-sm text-gray-600 mb-5 break-all">{selectedUser.email}</p>
              <p className="text-sm text-gray-500">User ID: <span className="text-[#2B6EA0] text-xl">{selectedUser._id}</span></p>
              <p className="text-sm text-gray-500">Status: <span className="text-[#2B6EA0] text-xl">{selectedUser.blocked ? "Blocked" : "Active"}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
