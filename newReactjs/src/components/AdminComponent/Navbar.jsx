import React, { useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="px-2 w-screen h-16 shadow-md grid">
      <div className="flex items-center justify-between ">
        <p className="text-[#2B6EA0] font-medium text-xl pl-2 font-sans">
          ConnectMe - Admin Dashboard
        </p>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-10 md:hidden " />
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-full bg-gray-800 text-white transition-all duration-200 ${
          isOpen ? "translate-x-0" : "translate-x-[-100%] md:hidden"
        }`}
      >
        <div className="p-2 flex items-center justify-between h-16 w-full shadow-md">
          <p className=" text-[#2B6EA0] font-medium text-xl pl-2 font-sans">
            ConnectMe - Admin Dashboard
          </p>
          <button onClick={() => setIsOpen(false)}>
            <LogOut className="w-10" />
          </button>
        </div>
        <ul className="w-full h-auto px-1 mt-5">
          <Link to={"/admin"} onClick={() => setIsOpen(false)}>
            <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
              Dashboard
            </li>
          </Link>
          <Link to={"/admin/Customers"} className="w-full" onClick={() => setIsOpen(false)}>
            <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
              Customers
            </li>
          </Link>
          <Link to={"/home"} className="w-full" onClick={() => setIsOpen(false)}>
            <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
              Home
            </li>
          </Link>
          <Link to={"/admin/UpdateProducts"} className="w-full" onClick={() => setIsOpen(false)}>
            <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
              Update Products
            </li>
          </Link>
          <Link to={"/admin/addProduct"} className="w-full" onClick={() => setIsOpen(false)}>
            <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
              Add Products
            </li>
          </Link>
          <Link to={"/admin/Inventory"} className="w-full" onClick={() => setIsOpen(false)}>
            <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
              Inventory
            </li>
          </Link>

          <Link to={"/admin/Orders"} className="w-full" onClick={() => setIsOpen(false)}>
            <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
              Orders
            </li>
          </Link>
          <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-semibold text-xl">
            FAQs
          </li>
          <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-semibold text-xl">
            About
          </li>
          <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-semibold text-xl">
            Contact
          </li>
        </ul>
        <footer className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer my-2 rounded-md font-sm text-sm fixed bottom-0">
          <span>All rights reserved by © 2025 ConnectMe.</span>
        </footer>
      </div>
    </nav>
  );
};

export default Navbar;
