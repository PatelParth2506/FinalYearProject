import React from "react";
import { Users, Image, MessageCircle, Heart } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { icon: Users, label: "Total Users", value: 1_245, color: "bg-blue-100 text-blue-600" },
    { icon: Image, label: "Total Posts", value: 3_674, color: "bg-green-100 text-green-600" },
    { icon: MessageCircle, label: "Total Comments", value: 12_391, color: "bg-yellow-100 text-yellow-600" },
    { icon: Heart, label: "Total Likes", value: 27_843, color: "bg-pink-100 text-pink-600" },
  ];

  return (
    <div className="p-6 sm:p-10 min-h-screen">
      <h1 className="text-3xl font-bold text-[#2B6EA0] mb-6">Welcome to Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="loginForm bg-white transition rounded-2xl p-5 flex items-center gap-4">
            <div className={`p-3 rounded-full ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <h2 className="text-xl font-semibold text-[#286492]">{stat.value.toLocaleString()}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white loginForm rounded-2xl p-6 h-64 flex items-center justify-center text-[#2B6EA0] text-lg">
          📊 User Activity Chart (coming soon)
        </div>
        <div className="bg-white loginForm rounded-2xl p-6 h-64 flex items-center justify-center text-[#2B6EA0] text-lg">
          📈 Posts Growth Graph (coming soon)
        </div>
      </div>
    </div>
  );
};

export default Dashboard;