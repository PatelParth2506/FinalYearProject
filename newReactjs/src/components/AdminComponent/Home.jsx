import React, { useEffect, useState } from "react";
import { CircleDollarSign, Container, ShoppingCart, User } from "lucide-react";
import Navbar from "./Navbar";
import TransactionData from "./TransactionData.json"
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import RightSideNavigation from "./RightSideNavigation";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className=" mt-5 h-[90vh] flex w-screen items-start gap-4">
        {/* Left-Section */}
        <RightSideNavigation />
        {/* Right-Section */}
        <div className="flex flex-col h-auto w-full gap-3 pl-4">
          {/* Dashboard Data */}
          <div>
            <h2 className="text-3xl font-bold pb-2">Dashboard</h2>
            <div className="w-[95%] grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4">
              <div className="bg-gray-300 text-black p-4 rounded-lg shadow-xl flex items-center justify-evenly gap-5 cursor-pointer">
                <div className="flex flex-col items-center">
                  <ShoppingCart className="w-10" />
                  <p>Orders</p>
                </div>
                <span className="text-2xl">22</span>
              </div>
              <div className="bg-gray-300 text-black p-4 rounded-lg shadow-xl flex items-center justify-evenly gap-5 cursor-pointer">
                <div className="flex flex-col items-center">
                  <Container className="w-10" />
                  <p>Inventory</p>
                </div>
                <span className="text-2xl">35</span>
              </div>
              <div className="bg-gray-300 text-black p-4 rounded-lg shadow-xl flex items-center justify-evenly gap-5 cursor-pointer">
                <div className="flex flex-col items-center">
                  <User className="w-10" />
                  <p>Customer</p>
                </div>
                <span className="text-2xl">2</span>
              </div>
              <div className="bg-gray-300 text-black p-4 rounded-lg shadow-xl flex items-center justify-evenly gap-5 cursor-pointer">
                <div className="flex flex-col items-center">
                  <CircleDollarSign className="w-10" />
                  <p>Revenue</p>
                </div>
                <span className="text-2xl">100</span>
              </div>
            </div>
          </div>
          {/* Chart - Data */}
          <div className="h-full w-[95%] lg:flex lg:flex-wrap gap-4">
            {/* Line Chart */}
            <div className="border h-[15rem] bg-white w-full lg:w-[35%] md:h-[20rem] rounded-md p-4 my-2">
              <LineChart />
            </div>

            {/* Recent Transactions */}
            <div className="border bg-white w-full lg:w-[62%] h-[30rem] lg:h-[20rem] rounded-md p-4 my-2">
              <h2 className="text-lg font-semibold mb-2">
                Recent Transactions
              </h2>
              <div className="h-[90%] overflow-y-auto space-y-3 pr-2">
                {TransactionData.map((data) => (
                  <div
                    key={data.id}
                    className="border rounded-md p-2 shadow-sm flex justify-between items-center text-sm"
                  >
                    <div>
                      <p className="font-medium">{data.user}</p>
                      <p className="text-gray-500">{data.product}</p>
                      <p className="text-xs text-gray-400">{data.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-semibold">
                        {data.price}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold
              ${
                data.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : data.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
                      >
                        {data.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pie Chart */}
            <div className="border bg-white w-full lg:w-[30%] h-[20rem] rounded-md p-4 my-2">
              <PieChart />
            </div>

            {/* Bar Chart */}
            <div className="border w-full md:w-[60%] lg:w-[35%] h-[20rem] rounded-md p-4 my-2">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
